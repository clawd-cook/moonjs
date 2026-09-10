// VM: the interpreter for M1 bytecode. Step 8b1 scope — see the parent task's
// implement.md.
//
// Design references:
// - design.md §8 (Frame layout, main loop shape, unwind algorithm).
// - design.md §4.3 (opcode table).
// - `.trellis/spec/backend/quality-guidelines.md` (no functional `loop{}`,
//   no `Ref[T]`, no `not(x)`, `pub(all) enum` for cross-package match).
//
// 8b1 delivers: object literals, property access (`.` and `[]`), array
// literals, function calls / method calls / constructor, return, closure
// creation with captured upvalues, `typeof` for functions.
//
// Deliberate limitations for the 8b2 handoff:
// - Cross-frame exception unwind is not yet implemented; a `throw` still
//   returns immediately from the current frame. Combined with 8b1 CALL
//   support that means a throw inside a callee still propagates via
//   `Err(...)` at the CALL arm and unwinds the caller. `try` / `catch` /
//   `finally` handling is 8b2.
// - `INSTANCEOF` / `IN` still error out because they need constructor
//   prototype linking (Step 9 builtins).
// - Builtin constructors / prototypes are still stubs. `new Object()` etc.
//   produce a plain object (proto=Null); `String.prototype.length` etc.
//   inline-work via the primitive-wrap fast path where possible.

// ---------------------------------------------------------------------------
// Frame layout
// ---------------------------------------------------------------------------

///|
/// One activation record. Corresponds to design.md §8.1's Frame with the
/// M1 simplifications documented in this file's header:
///
/// - `pc` is the instruction word index into `chunk.code`.
/// - `locals` is preallocated to `chunk.local_count`. Every slot is a
///   `@value.Upvalue` heap cell (uniform for M1 — see design deviations in
///   `src/value/function.mbt`). `OP_GET_LOCAL` / `OP_SET_LOCAL` read/write
///   the cell contents; local-slot capture across a closure boundary
///   reuses the cell directly.
/// - `upvalues` holds shared cells captured from the enclosing scope. One
///   entry per `chunk.upvalue_slots` decl.
/// - `operand_stack` is a growable value stack.
/// - `try_stack` is reserved for 8b2 (handler installation). 8b1 never
///   writes to it — declared here so we don't reshape `Frame` for 8b2.
/// - `this_val` is stored per design.md §8.1 outside of the locals table.
/// - `caller` links to the calling frame for stack-trace capture.
pub struct Frame {
  mut pc : Int
  chunk : @bytecode.Chunk
  locals : Array[@value.Upvalue]
  upvalues : Array[@value.Upvalue]
  operand_stack : Array[@value.JSValue]
  try_stack : Array[TryHandler]
  this_val : @value.JSValue
  caller : Frame?
}

///|
/// Construct a fresh top-level frame. Parameters:
///
/// - `chunk`: the compiled unit to run. Its `local_count` determines how
///   many slots the frame preallocates.
/// - `this_val`: the initial `this` for the frame. Scripts get `Undefined`.
pub fn Frame::new(chunk : @bytecode.Chunk, this_val : @value.JSValue) -> Frame {
  let locals : Array[@value.Upvalue] = []
  for _ in 0..<chunk.local_count {
    locals.push(@value.Upvalue::new(@value.Undefined))
  }
  {
    pc: 0,
    chunk,
    locals,
    upvalues: [],
    operand_stack: [],
    try_stack: [],
    this_val,
    caller: None,
  }
}

///|
/// Construct a new frame for a function call. Args are the caller-side
/// argument values; `caller` links back to the invoking frame; `func`
/// supplies the captured upvalues and (if any) the self-binding slot.
///
/// Slot layout matches the compiler's convention: parameters occupy
/// slots `0..param_count`, other locals follow. Missing params are filled
/// with `Undefined`; extra arguments are dropped.
///
/// If the chunk has a `self_binding_slot >= 0`, the newly-created frame's
/// local at that slot is initialised to `Function(func)` so the function
/// body sees itself by name (e.g. named function expressions like
/// `var fact = function myfact(n){ ... myfact(n-1) ... }`).
fn Frame::new_for_call(
  chunk : @bytecode.Chunk,
  this_val : @value.JSValue,
  args : Array[@value.JSValue],
  func : @value.Function,
  caller : Frame,
) -> Frame {
  let locals : Array[@value.Upvalue] = []
  for _ in 0..<chunk.local_count {
    locals.push(@value.Upvalue::new(@value.Undefined))
  }
  // Fill parameter slots from args. Slot i corresponds to parameter i.
  let filled = if args.length() < chunk.param_count {
    args.length()
  } else {
    chunk.param_count
  }
  for i in 0..<filled {
    locals[i].set(args[i])
  }
  // If the chunk is a named function expression, populate its self-binding
  // slot with the function reference so internal recursive calls work.
  if chunk.self_binding_slot >= 0 && chunk.self_binding_slot < locals.length() {
    locals[chunk.self_binding_slot].set(@value.Function(func))
  }
  {
    pc: 0,
    chunk,
    locals,
    upvalues: func.upvalues(),
    operand_stack: [],
    try_stack: [],
    this_val,
    caller: Some(caller),
  }
}

///|
/// Try-handler entry. Reserved for 8b2. `operand_depth` remembers the
/// operand-stack depth at the time the handler was installed so `throw`
/// can unwind the stack back to that point before landing in the catch
/// handler.
pub struct TryHandler {
  catch_pc : Int
  finally_pc : Int
  operand_depth : Int
}

///|
/// 8b2 hook: construct a try handler. Not used by 8b1; declared so the type
/// checker doesn't warn about an unconstructed struct.
pub fn TryHandler::new(
  catch_pc : Int,
  finally_pc : Int,
  operand_depth : Int,
) -> TryHandler {
  { catch_pc, finally_pc, operand_depth, }
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

///|
/// Top-level engine. Holds:
///
/// - `globals`: the global object (Step 9 will populate builtin
///   constructors and prototypes; 8b1 only seeds `undefined` / `NaN` /
///   `Infinity`).
/// - `chunk_registry`: maps chunk_id → Chunk. Every callable JS function
///   references its underlying chunk through this table; assignment happens
///   in `register_chunk`, called from `run_chunk` and from the
///   `OP_NEW_CLOSURE` arm when it walks into a nested chunk that has not
///   been registered yet. Chunks are physically-identified in the registry
///   (`physical_equal`), which means re-registering the same Chunk twice
///   returns the existing id.
pub struct Engine {
  globals : @value.ObjectRef
  chunk_registry : Array[@bytecode.Chunk]
}

///|
/// Construct a fresh engine with a minimal global object seeded with the
/// three "value" globals (`undefined`, `NaN`, `Infinity`) that lexer /
/// parser / compiler treat as normal identifier reads. Full builtin
/// initialisation (Object / Function / Error family / String constructors)
/// lands in Step 9.
pub fn Engine::new() -> Engine {
  let globals = @value.Object::new(@value.Shape::new(), @value.Null)
  globals.add_property("undefined", @value.Undefined, @value.ATTR_DEFAULT_DATA)
  globals.add_property(
    "NaN",
    @value.Number(@double.not_a_number),
    @value.ATTR_DEFAULT_DATA,
  )
  globals.add_property(
    "Infinity",
    @value.Number(@double.infinity),
    @value.ATTR_DEFAULT_DATA,
  )
  { globals, chunk_registry: [], }
}

///|
/// Register a chunk (and its nested chunks, recursively) in the engine's
/// chunk registry. Idempotent: if the chunk is already present (identity),
/// returns the existing id.
fn Engine::register_chunk(self : Engine, chunk : @bytecode.Chunk) -> Int {
  for i in 0..<self.chunk_registry.length() {
    if physical_equal(self.chunk_registry[i], chunk) {
      return i
    }
  }
  let idx = self.chunk_registry.length()
  self.chunk_registry.push(chunk)
  // Recursively register nested chunks so `OP_NEW_CLOSURE`'s lookup path
  // finds them without having to register on demand.
  for i in 0..<chunk.nested_chunks.length() {
    let _ = self.register_chunk(chunk.nested_chunks[i])
  }
  idx
}

///|
/// Compile-independent entry point: given a fully-compiled chunk, run it in
/// a fresh top-level frame. Returns the value left on the operand stack
/// when the chunk terminates (via fallthrough, `OP_RETURN_UNDEF`, etc.), or
/// the unwound `JSException` on an uncaught throw.
///
/// The value returned on success is the operand-stack top at halt time, if
/// any. If the stack is empty (which is the common case for a script that
/// ended with `OP_RETURN_UNDEF`), we return `Undefined`. This differs from
/// `run_chunk` in a hypothetical future release which might return the
/// script's implicit completion value; M1 keeps it simple.
pub fn Engine::run_chunk(
  self : Engine,
  chunk : @bytecode.Chunk,
) -> Result[@value.JSValue, @value.JSException] {
  let _ = self.register_chunk(chunk)
  let frame = Frame::new(chunk, @value.Undefined)
  self.execute_frame(frame)
}

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------

///|
/// Peek the "effective op" at `frame.pc`. When the current instruction is
/// `OP_WIDE`, the effective op is the one at `pc + 1` (the WIDE prefix
/// itself is transparent to dispatch); otherwise it is the op at `pc`.
///
/// Callers that need to read an operand should use
/// `chunk.read_operand_u24(pc)` / `read_operand_i24(pc)` which return the
/// merged operand and the `pc_advance` (1 for narrow, 2 for wide) — the arm
/// then sets `frame.pc = pc + advance`.
fn effective_op(frame : Frame) -> Byte {
  let pc = frame.pc
  let word = frame.chunk.code[pc]
  let decoded = @bytecode.decode(word)
  if decoded.op == @bytecode.OP_WIDE {
    let next = @bytecode.decode(frame.chunk.code[pc + 1])
    next.op
  } else {
    decoded.op
  }
}

///|
/// Pop the top-of-stack value. Aborts on underflow — that is a compiler bug,
/// not a runtime error. Frame operand-stack invariants are the compiler's
/// contract; a failure here means we should regenerate the bytecode, not
/// convert to a JS-level exception.
fn pop_stack(frame : Frame) -> @value.JSValue {
  match frame.operand_stack.pop() {
    Some(v) => v
    None =>
      abort(
        "VM: operand stack underflow at pc=" +
        frame.pc.to_string() +
        " in " +
        frame.chunk.name,
      )
  }
}

///|
/// Peek at the top-of-stack value without removing it. Aborts on empty.
fn peek_stack(frame : Frame) -> @value.JSValue {
  let n = frame.operand_stack.length()
  if n == 0 {
    abort(
      "VM: operand stack empty on peek at pc=" +
      frame.pc.to_string() +
      " in " +
      frame.chunk.name,
    )
  }
  frame.operand_stack[n - 1]
}

///|
/// Build a `JSException` capturing the current frame chain. `cur_pc` is the
/// pc value at the time the throwing instruction was decoded, BEFORE the
/// arm advanced `frame.pc`. Walking `frame.caller` gives one
/// `StackFrameInfo` entry per active frame, with the innermost frame at
/// index 0 — matching V8/QuickJS convention for `Error.prototype.stack`
/// (top-of-trace first).
fn throw_from_frame(
  frame : Frame,
  cur_pc : Int,
  value : @value.JSValue,
) -> @value.JSException {
  let stack : Array[@value.StackFrameInfo] = []
  // First entry is the throw site itself.
  let loc = frame_loc_at(frame, cur_pc)
  stack.push(
    @value.StackFrameInfo::new(frame.chunk.name, frame.chunk.filename, loc),
  )
  // Walk caller chain; each caller's `pc` was incremented past the CALL,
  // so we back off by 1 to point at the CALL instruction itself. (Wide
  // CALL is 2 words; the loc table is parallel to `code`, and both entries
  // for a wide instruction share the same loc, so a simple `-1` is safe.)
  let mut cur = frame.caller
  while true {
    match cur {
      Some(f) => {
        let caller_pc = if f.pc > 0 { f.pc - 1 } else { 0 }
        let caller_loc = frame_loc_at(f, caller_pc)
        stack.push(
          @value.StackFrameInfo::new(f.chunk.name, f.chunk.filename, caller_loc),
        )
        cur = f.caller
      }
      None => break
    }
  }
  @value.JSException::new(value, stack)
}

///|
/// Fetch the source location associated with a `pc` in a frame's chunk,
/// with graceful degradation if the pc is out-of-range (empty chunk, or
/// an off-by-one).
fn frame_loc_at(frame : Frame, pc : Int) -> @util.SourceLoc {
  if pc >= 0 && pc < frame.chunk.source_locs.length() {
    frame.chunk.source_locs[pc]
  } else if frame.chunk.source_locs.length() > 0 {
    frame.chunk.source_locs[frame.chunk.source_locs.length() - 1]
  } else {
    @util.SourceLoc::new(1, 1)
  }
}

///|
/// Manufacture a plain-object exception with a `message` string property.
/// Step 9 will replace this with real `TypeError` / `ReferenceError`
/// constructors that produce properly-linked Error objects. For 8b1 we
/// just need something callers can pattern-match on the message of.
fn make_error_object(name : String, message : String) -> @value.JSValue {
  let obj = @value.Object::new(@value.Shape::new(), @value.Null)
  obj.add_property("name", @value.Str(name), @value.ATTR_DEFAULT_DATA)
  obj.add_property("message", @value.Str(message), @value.ATTR_DEFAULT_DATA)
  @value.Object(obj)
}

///|
/// Central execution loop. Each iteration decodes one instruction (peeling
/// the `OP_WIDE` prefix if present via `effective_op` + `read_operand_*`),
/// advances `pc` by the correct amount, and executes the arm.
///
/// Frame handling: `execute_frame` runs a single frame to its `RETURN_*`
/// or to fallthrough. Calls / returns swap the mutable `frame` binding —
/// no recursion, so a deeply recursive JS function does not blow up the
/// MoonBit stack.
///
/// Return semantics: `Ok(v)` when the top-level frame terminates via
/// `OP_RETURN_VAL` (with `v` the top-of-stack), `Ok(Undefined)` on
/// `OP_RETURN_UNDEF` or fallthrough at end of code, and `Err(exc)` for
/// uncaught exceptions.
fn Engine::execute_frame(
  self : Engine,
  initial : Frame,
) -> Result[@value.JSValue, @value.JSException] {
  let mut frame = initial
  while true {
    if frame.pc >= frame.chunk.code.length() {
      // Fell off the end without a RETURN_*. Treat as return undefined.
      // If we're in a nested frame, propagate to caller; else terminate.
      match frame.caller {
        Some(caller) => {
          caller.operand_stack.push(@value.Undefined)
          frame = caller
          continue
        }
        None => return Ok(@value.Undefined)
      }
    }
    let op = effective_op(frame)
    let cur_pc = frame.pc
    // ---------------- 0x00-0x0A: push / stack ----------------
    if op == @bytecode.OP_NOP {
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_PUSH_UNDEF {
      frame.operand_stack.push(@value.Undefined)
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_PUSH_NULL {
      frame.operand_stack.push(@value.Null)
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_PUSH_TRUE {
      frame.operand_stack.push(@value.Bool(true))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_PUSH_FALSE {
      frame.operand_stack.push(@value.Bool(false))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_PUSH_I32 {
      let (i, adv) = frame.chunk.read_operand_i24(cur_pc)
      frame.operand_stack.push(@value.Int32(i))
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_PUSH_CONST {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let i = idx.reinterpret_as_int()
      frame.operand_stack.push(frame.chunk.const_pool[i])
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_DUP {
      let v = peek_stack(frame)
      frame.operand_stack.push(v)
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_DROP || op == @bytecode.OP_POP {
      let _ = pop_stack(frame)
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_SWAP {
      let n = frame.operand_stack.length()
      if n < 2 {
        abort("VM: SWAP with fewer than 2 stack values")
      }
      let a = frame.operand_stack[n - 2]
      let b = frame.operand_stack[n - 1]
      frame.operand_stack[n - 2] = b
      frame.operand_stack[n - 1] = a
      frame.pc = cur_pc + 1
      // ---------------- 0x10-0x19: variables ----------------
    } else if op == @bytecode.OP_GET_LOCAL {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let i = idx.reinterpret_as_int()
      frame.operand_stack.push(frame.locals[i].get())
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_SET_LOCAL {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let i = idx.reinterpret_as_int()
      // SET_LOCAL peeks (leaves TOS in place per compiler's convention that
      // an assignment expression yields the assigned value). Callers that
      // don't need the value emit an explicit DROP after.
      let v = peek_stack(frame)
      frame.locals[i].set(v)
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_GET_UPVALUE {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let i = idx.reinterpret_as_int()
      frame.operand_stack.push(frame.upvalues[i].get())
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_SET_UPVALUE {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let i = idx.reinterpret_as_int()
      let v = peek_stack(frame)
      frame.upvalues[i].set(v)
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_GET_GLOBAL {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let name = string_const(frame, idx.reinterpret_as_int())
      if self.globals.has_own(name) {
        frame.operand_stack.push(self.globals.get_property(name))
        frame.pc = cur_pc + adv
      } else {
        // Uncaught ReferenceError per JS semantics.
        frame.pc = cur_pc + adv
        let err = make_error_object("ReferenceError", name + " is not defined")
        return Err(throw_from_frame(frame, cur_pc, err))
      }
    } else if op == @bytecode.OP_SET_GLOBAL {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let name = string_const(frame, idx.reinterpret_as_int())
      let v = peek_stack(frame)
      // Fully-loose semantics: assigning to an undeclared global implicitly
      // declares it. `set_own` handles both cases (existing + new).
      let _ = self.globals.set_own(name, v)
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_DECLARE_GLOBAL {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let name = string_const(frame, idx.reinterpret_as_int())
      if !self.globals.has_own(name) {
        self.globals.add_property(
          name,
          @value.Undefined,
          @value.ATTR_DEFAULT_DATA,
        )
      }
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_GET_GLOBAL_OR_UNDEF {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let name = string_const(frame, idx.reinterpret_as_int())
      let v = if self.globals.has_own(name) {
        self.globals.get_property(name)
      } else {
        @value.Undefined
      }
      frame.operand_stack.push(v)
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_GET_THIS {
      frame.operand_stack.push(frame.this_val)
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_TO_NUMBER {
      let v = pop_stack(frame)
      // If the source was already an Int32 that we didn't need to touch,
      // preserve it; otherwise emit Number. This matches the Int32 fast path
      // used elsewhere.
      match v {
        Int32(_) => frame.operand_stack.push(v)
        _ => frame.operand_stack.push(@value.Number(to_number(v)))
      }
      frame.pc = cur_pc + 1
      // ---------------- 0x20-0x2D: arithmetic / bitwise ----------------
    } else if op == @bytecode.OP_ADD {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_add(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_SUB {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_sub(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_MUL {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_mul(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_DIV {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_div(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_MOD {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_mod(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_POW {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_pow(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_NEG {
      let a = pop_stack(frame)
      frame.operand_stack.push(js_neg(a))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_BNOT {
      let a = pop_stack(frame)
      frame.operand_stack.push(js_bnot(a))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_BAND {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_band(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_BOR {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_bor(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_BXOR {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_bxor(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_SHL {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_shl(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_SHR {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_shr(a, b))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_USHR {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(js_ushr(a, b))
      frame.pc = cur_pc + 1
      // ---------------- 0x2E-0x35: comparison ----------------
    } else if op == @bytecode.OP_EQ {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Bool(js_loose_eq(a, b)))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_NE {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Bool(!js_loose_eq(a, b)))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_SEQ {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Bool(js_strict_eq(a, b)))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_SNE {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Bool(!js_strict_eq(a, b)))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_LT {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Bool(js_lt(a, b)))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_LE {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Bool(js_le(a, b)))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_GT {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Bool(js_gt(a, b)))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_GE {
      let b = pop_stack(frame)
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Bool(js_ge(a, b)))
      frame.pc = cur_pc + 1
      // ---------------- 0x36-0x39: logical / type ----------------
    } else if op == @bytecode.OP_NOT {
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Bool(!to_boolean(a)))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_TYPEOF {
      let a = pop_stack(frame)
      frame.operand_stack.push(@value.Str(typeof_string(a)))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_INSTANCEOF {
      // Full instanceof requires walking a constructor's `prototype` chain,
      // which needs builtin prototype linking (Step 9 / 8b2). For 8b1 we
      // throw TypeError so any accidental exercise surfaces cleanly.
      let _ = pop_stack(frame)
      let _ = pop_stack(frame)
      frame.pc = cur_pc + 1
      let err = make_error_object(
        "TypeError", "instanceof requires Step 8b2 / Step 9 prototype linking",
      )
      return Err(throw_from_frame(frame, cur_pc, err))
    } else if op == @bytecode.OP_IN {
      // `key in obj` needs the RHS to be an Object; walks the prototype
      // chain via `Object::has_property`. 8b1 supports Object RHS; a
      // non-Object RHS is a JS TypeError.
      let obj_val = pop_stack(frame)
      let key_val = pop_stack(frame)
      frame.pc = cur_pc + 1
      match obj_val {
        Object(obj) => {
          let key = to_string(key_val)
          frame.operand_stack.push(@value.Bool(obj.has_property(key)))
        }
        _ => {
          let err = make_error_object(
            "TypeError", "Cannot use 'in' operator to search in non-object",
          )
          return Err(throw_from_frame(frame, cur_pc, err))
        }
      }
      // ---------------- 0x40-0x49: objects & arrays ----------------
    } else if op == @bytecode.OP_NEW_OBJECT {
      let obj = @value.Object::new(@value.Shape::new(), @value.Null)
      frame.operand_stack.push(@value.Object(obj))
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_DEFINE_PROP {
      // stack: [obj, val] -> [obj]. `name` from constant pool.
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let name = string_const(frame, idx.reinterpret_as_int())
      let val = pop_stack(frame)
      let obj_v = peek_stack(frame)
      match obj_v {
        Object(obj) =>
          if obj.has_own(name) {
            // Overwrite an existing own property (object literal with
            // duplicate key is legal in sloppy mode; last write wins).
            let _ = obj.set_own(name, val)
          } else {
            obj.add_property(name, val, @value.ATTR_DEFAULT_DATA)
          }
        _ => abort("VM: DEFINE_PROP on non-Object at pc=" + cur_pc.to_string())
      }
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_GET_PROP {
      // stack: [obj] -> [val]. `name` from constant pool.
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let name = string_const(frame, idx.reinterpret_as_int())
      let obj_v = pop_stack(frame)
      frame.pc = cur_pc + adv
      match get_property_value(obj_v, name) {
        Ok(v) => frame.operand_stack.push(v)
        Err(msg) => {
          let err = make_error_object("TypeError", msg)
          return Err(throw_from_frame(frame, cur_pc, err))
        }
      }
    } else if op == @bytecode.OP_SET_PROP {
      // stack: [obj, val] -> [val]. `name` from constant pool.
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let name = string_const(frame, idx.reinterpret_as_int())
      let val = pop_stack(frame)
      let obj_v = pop_stack(frame)
      frame.pc = cur_pc + adv
      match obj_v {
        Object(obj) => {
          let _ = obj.set_own(name, val)
        }
        Null | Undefined => {
          let err = make_error_object(
            "TypeError",
            "Cannot set property '" +
            name +
            "' of " +
            (match obj_v {
              Null => "null"
              _ => "undefined"
            }),
          )
          return Err(throw_from_frame(frame, cur_pc, err))
        }
        // Primitives silently ignore in sloppy mode.
        _ => ()
      }
      frame.operand_stack.push(val)
    } else if op == @bytecode.OP_GET_ELEM {
      // stack: [obj, key] -> [val].
      let key = pop_stack(frame)
      let obj_v = pop_stack(frame)
      frame.pc = cur_pc + 1
      let key_str = to_string(key)
      match get_element_value(obj_v, key, key_str) {
        Ok(v) => frame.operand_stack.push(v)
        Err(msg) => {
          let err = make_error_object("TypeError", msg)
          return Err(throw_from_frame(frame, cur_pc, err))
        }
      }
    } else if op == @bytecode.OP_SET_ELEM {
      // stack: [obj, key, val] -> [val].
      let val = pop_stack(frame)
      let key = pop_stack(frame)
      let obj_v = pop_stack(frame)
      frame.pc = cur_pc + 1
      match obj_v {
        Object(obj) => {
          let key_str = to_string(key)
          // If this looks like an integer array index, extend length as
          // JS spec §OrdinarySetLength does (we don't have full Array
          // semantics in M1, but ARRAY_PUSH keeps `length` in sync so we
          // just do a set_own here).
          let _ = obj.set_own(key_str, val)
        }
        Null | Undefined => {
          let err = make_error_object(
            "TypeError", "Cannot set property of null / undefined",
          )
          return Err(throw_from_frame(frame, cur_pc, err))
        }
        _ => ()
      }
      frame.operand_stack.push(val)
    } else if op == @bytecode.OP_DELETE_PROP {
      // stack: [obj] -> [Bool]. M1 all data properties are configurable
      // so delete always succeeds (or is a no-op if the prop doesn't
      // exist). Full JS delete semantics (strict-mode throw on
      // non-configurable, prototype-chain walk) is M6.
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let name = string_const(frame, idx.reinterpret_as_int())
      let obj_v = pop_stack(frame)
      frame.pc = cur_pc + adv
      match obj_v {
        Object(obj) => {
          delete_own(obj, name)
          frame.operand_stack.push(@value.Bool(true))
        }
        _ => frame.operand_stack.push(@value.Bool(true))
      }
    } else if op == @bytecode.OP_DELETE_ELEM {
      let key = pop_stack(frame)
      let obj_v = pop_stack(frame)
      frame.pc = cur_pc + 1
      match obj_v {
        Object(obj) => {
          delete_own(obj, to_string(key))
          frame.operand_stack.push(@value.Bool(true))
        }
        _ => frame.operand_stack.push(@value.Bool(true))
      }
    } else if op == @bytecode.OP_NEW_ARRAY {
      // Operand: hint length. M1 arrays are regular objects with a
      // `length` numeric property that ARRAY_PUSH keeps in sync.
      let (_hint, adv) = frame.chunk.read_operand_u24(cur_pc)
      let obj = @value.Object::new(@value.Shape::new(), @value.Null)
      obj.add_property("length", @value.Int32(0), @value.ATTR_DEFAULT_DATA)
      frame.operand_stack.push(@value.Object(obj))
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_ARRAY_PUSH {
      // stack: [arr, val] -> [arr]. Write to arr[length]; increment length.
      let val = pop_stack(frame)
      let arr_v = peek_stack(frame)
      frame.pc = cur_pc + 1
      match arr_v {
        Object(arr) => {
          let len_v = arr.get_property("length")
          let len = match len_v {
            Int32(i) => i
            Number(d) => d.to_int()
            _ => 0
          }
          let _ = arr.set_own(len.to_string(), val)
          let _ = arr.set_own("length", @value.Int32(len + 1))
        }
        _ => abort("VM: ARRAY_PUSH on non-Object at pc=" + cur_pc.to_string())
      }
      // ---------------- 0x50-0x55: function / call / return ----------------
    } else if op == @bytecode.OP_NEW_CLOSURE {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let i = idx.reinterpret_as_int()
      if i < 0 || i >= frame.chunk.nested_chunks.length() {
        abort(
          "VM: NEW_CLOSURE nested index " +
          i.to_string() +
          " out of range in " +
          frame.chunk.name,
        )
      }
      let nested = frame.chunk.nested_chunks[i]
      // Ensure the nested chunk (and its sub-chunks) are registered so
      // future OP_NEW_CLOSURE dispatches inside them find their chunks.
      let child_id = self.register_chunk(nested)
      // Resolve each upvalue slot to a shared `Upvalue` cell.
      let upvalues : Array[@value.Upvalue] = []
      for slot_i in 0..<nested.upvalue_slots.length() {
        let decl = nested.upvalue_slots[slot_i]
        match decl.from_kind {
          Local => upvalues.push(frame.locals[decl.from_idx])
          ParentUpvalue => upvalues.push(frame.upvalues[decl.from_idx])
        }
      }
      let fn_value = @value.Function::new(child_id, upvalues, nested.name, true)
      frame.operand_stack.push(@value.Function(fn_value))
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_CALL {
      let (argc_u, adv) = frame.chunk.read_operand_u24(cur_pc)
      let argc = argc_u.reinterpret_as_int()
      // stack layout: [..., fn, arg0, arg1, ..., argN-1]
      let n = frame.operand_stack.length()
      if n < argc + 1 {
        abort(
          "VM: CALL insufficient operands at pc=" +
          cur_pc.to_string() +
          " (argc=" +
          argc.to_string() +
          ", stack=" +
          n.to_string() +
          ")",
        )
      }
      let args : Array[@value.JSValue] = []
      for ai in 0..<argc {
        args.push(frame.operand_stack[n - argc + ai])
      }
      // Pop args.
      for _ in 0..<argc {
        let _ = frame.operand_stack.pop()
      }
      let callee = pop_stack(frame)
      // Advance the caller's pc past this CALL so the return path resumes
      // on the next instruction.
      frame.pc = cur_pc + adv
      match callee {
        Function(func) => {
          let chunk = self.chunk_registry[func.chunk_id()]
          let new_frame = Frame::new_for_call(
            chunk,
            @value.Undefined,
            args,
            func,
            frame,
          )
          frame = new_frame
        }
        _ => {
          let err = make_error_object(
            "TypeError",
            describe_call_target(callee) + " is not a function",
          )
          return Err(throw_from_frame(frame, cur_pc, err))
        }
      }
    } else if op == @bytecode.OP_CALL_METHOD {
      let (argc_u, adv) = frame.chunk.read_operand_u24(cur_pc)
      let argc = argc_u.reinterpret_as_int()
      // stack: [..., this, fn, arg0, ..., argN-1]
      let n = frame.operand_stack.length()
      if n < argc + 2 {
        abort(
          "VM: CALL_METHOD insufficient operands at pc=" + cur_pc.to_string(),
        )
      }
      let args : Array[@value.JSValue] = []
      for ai in 0..<argc {
        args.push(frame.operand_stack[n - argc + ai])
      }
      for _ in 0..<argc {
        let _ = frame.operand_stack.pop()
      }
      let callee = pop_stack(frame)
      let this_val = pop_stack(frame)
      frame.pc = cur_pc + adv
      match callee {
        Function(func) => {
          let chunk = self.chunk_registry[func.chunk_id()]
          let new_frame = Frame::new_for_call(
            chunk, this_val, args, func, frame,
          )
          frame = new_frame
        }
        _ => {
          let err = make_error_object(
            "TypeError",
            describe_call_target(callee) + " is not a function",
          )
          return Err(throw_from_frame(frame, cur_pc, err))
        }
      }
    } else if op == @bytecode.OP_CONSTRUCT {
      let (argc_u, adv) = frame.chunk.read_operand_u24(cur_pc)
      let argc = argc_u.reinterpret_as_int()
      let n = frame.operand_stack.length()
      if n < argc + 1 {
        abort("VM: CONSTRUCT insufficient operands at pc=" + cur_pc.to_string())
      }
      let args : Array[@value.JSValue] = []
      for ai in 0..<argc {
        args.push(frame.operand_stack[n - argc + ai])
      }
      for _ in 0..<argc {
        let _ = frame.operand_stack.pop()
      }
      let callee = pop_stack(frame)
      frame.pc = cur_pc + adv
      match callee {
        Function(func) => {
          if !func.is_constructor() {
            let err = make_error_object(
              "TypeError",
              func.name() + " is not a constructor",
            )
            return Err(throw_from_frame(frame, cur_pc, err))
          }
          // Create the new object. Step 9 will wire `func.prototype` as
          // its proto; for 8b1 we use Null (matches "no builtin prototype
          // chain yet").
          let new_obj = @value.Object::new(@value.Shape::new(), @value.Null)
          let this_val : @value.JSValue = @value.Object(new_obj)
          let chunk = self.chunk_registry[func.chunk_id()]
          let new_frame = Frame::new_for_call(
            chunk, this_val, args, func, frame,
          )
          frame = new_frame
        }
        _ => {
          let err = make_error_object(
            "TypeError",
            describe_call_target(callee) + " is not a constructor",
          )
          return Err(throw_from_frame(frame, cur_pc, err))
        }
      }
    } else if op == @bytecode.OP_RETURN_VAL {
      let v = pop_stack(frame)
      // For a constructor call, if the returned value isn't an Object,
      // return `this` instead. Detect by peeking at the caller's pc — one
      // instruction back is the CONSTRUCT / CALL / CALL_METHOD opcode.
      match frame.caller {
        Some(caller) => {
          let return_val = adjust_ctor_return(caller, v, frame.this_val)
          caller.operand_stack.push(return_val)
          frame = caller
        }
        None => return Ok(v)
      }
    } else if op == @bytecode.OP_RETURN_UNDEF {
      match frame.caller {
        Some(caller) => {
          let return_val = adjust_ctor_return(
            caller,
            @value.Undefined,
            frame.this_val,
          )
          caller.operand_stack.push(return_val)
          frame = caller
        }
        None => return Ok(@value.Undefined)
      }
      // ---------------- 0x60-0x62: control flow ----------------
    } else if op == @bytecode.OP_JUMP {
      let (offset, adv) = frame.chunk.read_operand_i24(cur_pc)
      // Offset is measured from the instruction AFTER the jump (see
      // Chunk::patch_jump); adv accounts for wide (2) vs narrow (1).
      frame.pc = cur_pc + adv + offset
    } else if op == @bytecode.OP_JUMP_IF_TRUE {
      let (offset, adv) = frame.chunk.read_operand_i24(cur_pc)
      let v = pop_stack(frame)
      if to_boolean(v) {
        frame.pc = cur_pc + adv + offset
      } else {
        frame.pc = cur_pc + adv
      }
    } else if op == @bytecode.OP_JUMP_IF_FALSE {
      let (offset, adv) = frame.chunk.read_operand_i24(cur_pc)
      let v = pop_stack(frame)
      if !to_boolean(v) {
        frame.pc = cur_pc + adv + offset
      } else {
        frame.pc = cur_pc + adv
      }
      // ---------------- 0x70: throw ----------------
    } else if op == @bytecode.OP_THROW {
      let v = pop_stack(frame)
      // 8b1: no try_stack unwinding (that's 8b2). Build an exception with
      // the current caller chain as the stack trace and return.
      frame.pc = cur_pc + 1
      return Err(throw_from_frame(frame, cur_pc, v))
    } else {
      // ---------------- Not implemented in 8b1 ----------------
      let err = make_error_object(
        "TypeError",
        "opcode 0x" +
        op.to_int().to_string(radix=16) +
        " (" +
        @bytecode.opcode_name(op) +
        ") not implemented in Step 8b1",
      )
      frame.pc = cur_pc + 1
      return Err(throw_from_frame(frame, cur_pc, err))
    }
  }
  // Unreachable: `while true { ... }` never falls through — the loop body
  // either updates state and continues or returns. MoonBit's flow analysis
  // still needs a final expression matching the return type.
  Ok(@value.Undefined)
}

///|
/// Look up a `String` value from the constant pool. Aborts on a
/// non-String entry (compiler bug — every name operand should refer to a
/// `JSValue::Str`).
fn string_const(frame : Frame, idx : Int) -> String {
  match frame.chunk.const_pool[idx] {
    Str(s) => s
    _ =>
      abort(
        "VM: expected String constant at pool index " +
        idx.to_string() +
        " in " +
        frame.chunk.name,
      )
  }
}

///|
/// JS `typeof` operator's string result. Matches ECMA-262 12.5.5 — with the
/// caveat that Object-wrapped functions (Step 8b+) will return "function",
/// but M1's plain Objects always yield "object". Null special case is
/// respected (JS's ancient bug: `typeof null === "object"`).
fn typeof_string(v : @value.JSValue) -> String {
  match v {
    Undefined => "undefined"
    Null => "object"
    Bool(_) => "boolean"
    Int32(_) | Number(_) => "number"
    Str(_) => "string"
    Object(_) => "object"
    Function(_) => "function"
  }
}

///|
/// Fetch a named property from a JSValue. Handles:
///
/// - `null` / `undefined` → `TypeError` (returned as `Err`).
/// - `Object` → `Object::get_property` with prototype-chain walk.
/// - `Str` → the primitive fast path for `.length` (returns Int32 code-unit
///   count). Other properties currently return `Undefined` (Step 9 will add
///   String.prototype method dispatch).
/// - `Function` → treated like an object; own properties (empty in 8b1)
///   plus a `.length` and `.name` primitive fast path.
/// - Other primitives → Undefined for now. Real primitive wrapping is
///   Step 9's Object.prototype linking work.
fn get_property_value(
  v : @value.JSValue,
  name : String,
) -> Result[@value.JSValue, String] {
  match v {
    Null => Err("Cannot read properties of null (reading '" + name + "')")
    Undefined =>
      Err("Cannot read properties of undefined (reading '" + name + "')")
    Object(obj) => Ok(obj.get_property(name))
    Str(s) => {
      if name == "length" {
        return Ok(@value.Int32(s.length()))
      }
      // Try numeric index into the string.
      match parse_array_index(name) {
        Some(i) =>
          if i >= 0 && i < s.length() {
            Ok(@value.Str(s[i:i + 1].to_owned()))
          } else {
            Ok(@value.Undefined)
          }
        None => Ok(@value.Undefined)
      }
    }
    Function(f) => {
      if name == "name" {
        return Ok(@value.Str(f.name()))
      }
      if name == "length" {
        // Functions have a `.length` of their declared parameter count.
        // We don't have direct access to param_count from Function — that
        // lives in the Chunk. Step 9 will wire this properly; for 8b1
        // return 0 as a placeholder.
        return Ok(@value.Int32(0))
      }
      Ok(@value.Undefined)
    }
    _ => Ok(@value.Undefined)
  }
}

///|
/// Fetch an element by key (JS `obj[key]`). Delegates to the string-keyed
/// `get_property_value` after coercing `key` to a String. The `key_str`
/// argument is the pre-computed `to_string(key)` — passed in so the caller
/// can reuse it if it also needs the raw string form.
fn get_element_value(
  v : @value.JSValue,
  _key : @value.JSValue,
  key_str : String,
) -> Result[@value.JSValue, String] {
  get_property_value(v, key_str)
}

///|
/// Parse a JS canonical array-index string. Only non-negative integer
/// strings with no leading zeros (except "0" itself) are accepted, matching
/// JS's `IsArrayIndex(name)`.
fn parse_array_index(s : String) -> Int? {
  if s.length() == 0 {
    return None
  }
  if s == "0" {
    return Some(0)
  }
  let zero_code = '0'.to_int()
  let nine_code = '9'.to_int()
  // First char must be 1-9 (no leading zero on multi-digit indices).
  let first = s.at(0).to_uint().reinterpret_as_int()
  if first < zero_code + 1 || first > nine_code {
    return None
  }
  let mut acc = first - zero_code
  for i in 1..<s.length() {
    let c = s.at(i).to_uint().reinterpret_as_int()
    if c < zero_code || c > nine_code {
      return None
    }
    acc = acc * 10 + (c - zero_code)
    if acc < 0 {
      // Integer overflow guard — bail out to non-index treatment.
      return None
    }
  }
  Some(acc)
}

///|
/// Best-effort description of a non-function value for error messages.
/// JS's actual formatting is more elaborate (e.g. `#<Object>`), but for
/// 8b1's minimal error surface this is enough.
fn describe_call_target(v : @value.JSValue) -> String {
  match v {
    Undefined => "undefined"
    Null => "null"
    Bool(b) => b.to_string()
    Int32(i) => i.to_string()
    Number(d) => d.to_string()
    Str(s) => "\"" + s + "\""
    Object(_) => "[object Object]"
    Function(f) => f.name()
  }
}

///|
/// Remove a named own property from an object. M1 all data properties are
/// configurable, so the delete always succeeds. Full spec behaviour
/// (respecting the configurable bit, and the more subtle keys_ordered /
/// slots rewrite) lands in a later milestone once accessor properties and
/// preventExtensions edge cases are exercised.
fn delete_own(obj : @value.ObjectRef, name : String) -> Unit {
  match obj.shape.props.get(name) {
    None => ()
    Some(_) => {
      // Rebuild a new shape without `name`, keeping insertion order of the
      // other keys. Also rebuild `slots` in the same order.
      let old_keys = obj.shape.keys_ordered
      let new_shape = @value.Shape::new()
      let new_slots : Array[@value.JSValue] = []
      let mut new_slot_idx = 0
      for k in old_keys {
        if k == name {
          continue
        }
        let meta = match obj.shape.props.get(k) {
          Some(m) => m
          None => continue
        }
        let v = obj.slots[meta.slot_idx]
        new_shape.props.set(k, @value.PropMeta::new(new_slot_idx, meta.attrs))
        new_shape.keys_ordered.push(k)
        new_slots.push(v)
        new_slot_idx = new_slot_idx + 1
      }
      // Overwrite object's shape / slots in place. Slots.clear + push isn't
      // available; use assignment.
      obj.set_shape(new_shape)
      // Object.slots is not `mut` at the array level (the array reference
      // itself is stored as a field), but Array is mutable so we can
      // shrink/rebuild it in-place.
      // Use `.clear()` if MoonBit provides it; else pop until empty.
      while obj.slots.length() > 0 {
        let _ = obj.slots.pop()
      }
      for v in new_slots {
        obj.slots.push(v)
      }
    }
  }
}

///|
/// For a return from a constructor frame, JS spec says: if the body's
/// return value is an object, use that; otherwise return `this`. We detect
/// "constructor call" by inspecting the caller's most recent dispatched
/// instruction (should be `OP_CONSTRUCT` +/- a preceding `OP_WIDE`
/// prefix). This avoids adding an `is_constructor_call` flag to `Frame` at
/// the cost of one bytecode-array read per return.
///
/// For non-constructor calls, return the raw return value unchanged.
fn adjust_ctor_return(
  caller : Frame,
  ret : @value.JSValue,
  this_val : @value.JSValue,
) -> @value.JSValue {
  // caller.pc was advanced past the CALL / CALL_METHOD / CONSTRUCT before
  // we entered the callee frame. Decode the opcode word right before
  // caller.pc; that's either the narrow call op, or the target op of a
  // wide-prefixed call. We only care about identifying CONSTRUCT so
  // reading the target op is sufficient in either case.
  let pc = caller.pc
  if pc <= 0 {
    return ret
  }
  let call_op = @bytecode.decode(caller.chunk.code[pc - 1]).op
  if call_op == @bytecode.OP_CONSTRUCT {
    match ret {
      Object(_) | Function(_) => ret
      _ => this_val
    }
  } else {
    ret
  }
}
