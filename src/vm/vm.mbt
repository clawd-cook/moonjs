// VM: the interpreter for M1 bytecode. Step 8b2 scope — see the parent task's
// implement.md.
//
// Design references:
// - design.md §8 (Frame layout, main loop shape, unwind algorithm).
// - design.md §4.3 (opcode table).
// - `.trellis/spec/backend/quality-guidelines.md` (no functional `loop{}`,
//   no `Ref[T]`, no `not(x)`, `pub(all) enum` for cross-package match).
//
// 8b2 delivers on top of 8b1: try / catch / finally (OP_ENTER_TRY /
// OP_LEAVE_TRY) with cross-frame unwind, full `instanceof` semantics with
// prototype-chain walking, and Function `.prototype` materialisation so
// user-defined constructors participate in `instanceof`.
//
// Cross-frame unwind: OP_THROW now consults the current frame's try_stack
// (LIFO). If there is a handler, execution resumes at the recorded
// catch_pc and the operand stack is truncated to the depth at try entry.
// If not, the frame returns `Err(exc)`; the CALL / CALL_METHOD / CONSTRUCT
// arm in the caller catches that and re-runs the same unwind logic on the
// caller. Repeated all the way up. This preserves the QuickJS-style "stack
// trace captured at throw site, propagated frame by frame" model.
//
// Still deferred to later milestones:
// - Full try/finally completion tracking. M1's compiler lowers finally as
//   an inline block after catch (see compile_try in `src/compiler/stmt.mbt`)
//   which does NOT run on catch-throw. That is a documented M1 limitation
//   and does not need VM-side accommodation.

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
/// - `globals`: the global object (Step 9 populates builtin constructors
///   and prototypes via the `Builtins` object; M1 also seeds `undefined` /
///   `NaN` / `Infinity` / `globalThis`).
/// - `chunk_registry`: maps chunk_id → Chunk. Every callable JS function
///   references its underlying chunk through this table; assignment happens
///   in `register_chunk`, called from `run_chunk` and from the
///   `OP_NEW_CLOSURE` arm when it walks into a nested chunk that has not
///   been registered yet. Chunks are physically-identified in the registry
///   (`physical_equal`), which means re-registering the same Chunk twice
///   returns the existing id.
/// - `builtins`: the Step 9 builtin registry. Kept as `Option[Builtins]`
///   so downstream milestones can construct an Engine with a stripped-down
///   builtin set (e.g. for isolated unit tests) if needed; M1 always sets
///   it to `Some(...)` inside `Engine::new`.
pub struct Engine {
  globals : @value.ObjectRef
  chunk_registry : Array[@bytecode.Chunk]
  builtins : @builtins.Builtins?
}

///|
/// Construct a fresh engine with a minimal global object seeded via
/// `Builtins::install_into`. This wires up `Object` / `Error` / the four
/// Error subclasses / `undefined` / `NaN` / `Infinity` / `globalThis`.
pub fn Engine::new() -> Engine {
  let globals = @value.Object::new(@value.Shape::new(), @value.Null)
  let bi = @builtins.Builtins::new()
  // Link the global object's own [[Prototype]] to Object.prototype so
  // `globalThis.hasOwnProperty(...)` etc. work in later milestones.
  globals.set_proto(@value.Object(bi.object_proto()))
  bi.install_into(globals)
  { globals, chunk_registry: [], builtins: Some(bi), }
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

///|
/// Top-level entry point: parse, compile, and run a JS source string. This
/// is the primary M1 public API — `Engine::new().eval_script(src, filename)`
/// takes JS source text and returns the top-level completion value (or an
/// unhandled `JSException`).
///
/// Error handling: parse errors and compile errors are surfaced as
/// `JSException` values wrapping a `SyntaxError`-shaped plain object (with
/// `name: "SyntaxError"`, a descriptive `message`, and a single-frame stack
/// pointing at the offending source location). Runtime exceptions come from
/// `execute_frame` unchanged.
///
/// The reason parse / compile errors are shaped as `SyntaxError` rather than
/// being returned via a separate error channel is that from the JS user's
/// perspective they are indistinguishable — both come out of `eval_script`
/// as thrown Error values. `eval()` in JS behaves the same way, and this
/// keeps the M1 API surface minimal.
pub fn Engine::eval_script(
  self : Engine,
  source : String,
  filename : String,
) -> Result[@value.JSValue, @value.JSException] {
  // Parse.
  let parser = match @parser.Parser::new(source, filename) {
    Ok(p) => p
    Err(e) => {
      let @parser.ParseError(msg~, loc~) = e
      return Err(self.make_syntax_error(msg, loc, filename))
    }
  }
  let program = match parser.parse_script() {
    Ok(prog) => prog
    Err(e) => {
      let @parser.ParseError(msg~, loc~) = e
      return Err(self.make_syntax_error(msg, loc, filename))
    }
  }
  // Compile.
  let compiler = @compiler.Compiler::new()
  let chunk = match compiler.compile_script(program, filename) {
    Ok(ch) => ch
    Err(e) => {
      let @compiler.CompileError(msg~, loc~) = e
      return Err(self.make_syntax_error(msg, loc, filename))
    }
  }
  // Run.
  self.run_chunk(chunk)
}

///|
/// Build a `JSException` for a parse / compile-time syntax error. Fabricates
/// an Object with `name: "SyntaxError"`, `message: msg`, wires the proto to
/// `SyntaxError.prototype`, and packages a single-frame stack pointing at
/// the offending location.
fn Engine::make_syntax_error(
  self : Engine,
  msg : String,
  loc : @util.SourceLoc,
  filename : String,
) -> @value.JSException {
  let obj = @value.Object::new(@value.Shape::new(), @value.Null)
  obj.add_property("name", @value.Str("SyntaxError"), @value.ATTR_DEFAULT_DATA)
  obj.add_property("message", @value.Str(msg), @value.ATTR_DEFAULT_DATA)
  // Link to SyntaxError.prototype so `instanceof SyntaxError` succeeds.
  match self.builtins {
    Some(bi) => obj.set_proto(@value.Object(bi.syntax_error_proto()))
    None => ()
  }
  let stack : Array[@value.StackFrameInfo] = []
  stack.push(@value.StackFrameInfo::new("<top>", filename, loc))
  @value.JSException::new(@value.Object(obj), stack)
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
/// Convert a `NativeError` returned by a native function's implementation
/// into a JS `Error`-family object suitable for throwing. Uses the same
/// plain-object shape as `make_error_object`; Step 9's builtin machinery
/// takes care of populating the actual error prototypes so `err instanceof
/// Error` etc. behave correctly. Callers receive back a `JSValue` ready to
/// be wrapped by `throw_from_frame`.
fn Engine::make_error_from_native(
  self : Engine,
  err : @value.NativeError,
) -> @value.JSValue {
  let obj = @value.Object::new(@value.Shape::new(), @value.Null)
  obj.add_property("name", @value.Str(err.name()), @value.ATTR_DEFAULT_DATA)
  obj.add_property(
    "message",
    @value.Str(err.message()),
    @value.ATTR_DEFAULT_DATA,
  )
  // Wire the proto to the matching Error-family prototype installed by
  // Builtins so `instanceof Error` / `instanceof TypeError` succeed.
  let proto = self.error_proto_for(err.name())
  obj.set_proto(proto)
  @value.Object(obj)
}

///|
/// Look up the Error-family prototype object corresponding to a native
/// error's `name` field. Falls back to `Error.prototype` for unknown names
/// (defensive — every native error in M1 uses a name we know about).
fn Engine::error_proto_for(self : Engine, name : String) -> @value.JSValue {
  match self.builtins {
    Some(bi) =>
      match name {
        "TypeError" => @value.Object(bi.type_error_proto())
        "RangeError" => @value.Object(bi.range_error_proto())
        "SyntaxError" => @value.Object(bi.syntax_error_proto())
        "ReferenceError" => @value.Object(bi.reference_error_proto())
        _ => @value.Object(bi.error_proto())
      }
    None => @value.Null
  }
}

///|
/// Return `Object(Object.prototype)` if the engine has builtins installed,
/// else `Null`. Used by `OP_NEW_OBJECT` and by `OP_CONSTRUCT` on a
/// NativeFn that lacks an explicit `.prototype`.
fn Engine::object_proto_or_null(self : Engine) -> @value.JSValue {
  match self.builtins {
    Some(bi) => @value.Object(bi.object_proto())
    None => @value.Null
  }
}

///|
/// Return `Object(Array.prototype)` if the engine has builtins installed,
/// else `Null`. Used by `OP_NEW_ARRAY`.
fn Engine::array_proto_or_null(self : Engine) -> @value.JSValue {
  match self.builtins {
    Some(bi) => @value.Object(bi.array_proto())
    None => @value.Null
  }
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
        // Uncaught ReferenceError per JS semantics — but respect any active
        // try_stack in the current frame first.
        frame.pc = cur_pc + adv
        let err = make_error_object("ReferenceError", name + " is not defined")
        let exc = throw_from_frame(frame, cur_pc, err)
        match propagate_exception(frame, exc) {
          Some(next) => frame = next
          None => return Err(exc)
        }
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
      // JS `x instanceof C`: walk `x`'s prototype chain looking for a proto
      // that is physically-equal to `C.prototype`. Primitives always return
      // false (proto walk starts from an Object). If C is not callable or its
      // `.prototype` is not an Object, throw TypeError.
      let ctor_val = pop_stack(frame)
      let obj_val = pop_stack(frame)
      frame.pc = cur_pc + 1
      match instanceof_check(obj_val, ctor_val) {
        Ok(b) => frame.operand_stack.push(@value.Bool(b))
        Err(msg) => {
          let err = make_error_object("TypeError", msg)
          let exc = throw_from_frame(frame, cur_pc, err)
          match propagate_exception(frame, exc) {
            Some(next) => frame = next
            None => return Err(exc)
          }
        }
      }
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
          let exc = throw_from_frame(frame, cur_pc, err)
          match propagate_exception(frame, exc) {
            Some(next) => frame = next
            None => return Err(exc)
          }
        }
      }
      // ---------------- 0x40-0x49: objects & arrays ----------------
    } else if op == @bytecode.OP_NEW_OBJECT {
      // Link fresh object literals to Object.prototype so `.hasOwnProperty`
      // etc. (once M3 fleshes them out) are reachable.
      let obj = @value.Object::new(
        @value.Shape::new(),
        self.object_proto_or_null(),
      )
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
          let exc = throw_from_frame(frame, cur_pc, err)
          match propagate_exception(frame, exc) {
            Some(next) => frame = next
            None => return Err(exc)
          }
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
          let exc = throw_from_frame(frame, cur_pc, err)
          match propagate_exception(frame, exc) {
            Some(next) => {
              frame = next
              continue
            }
            None => return Err(exc)
          }
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
          let exc = throw_from_frame(frame, cur_pc, err)
          match propagate_exception(frame, exc) {
            Some(next) => frame = next
            None => return Err(exc)
          }
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
          let exc = throw_from_frame(frame, cur_pc, err)
          match propagate_exception(frame, exc) {
            Some(next) => {
              frame = next
              continue
            }
            None => return Err(exc)
          }
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
      let obj = @value.Object::new(
        @value.Shape::new(),
        self.array_proto_or_null(),
      )
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
      // Every user function gets a fresh `.prototype` Object whose own
      // `[[Prototype]]` is Object.prototype. This is required for
      // `new F(...)` (OP_CONSTRUCT reads f.prototype for the new receiver's
      // proto) and for `instance instanceof F` (OP_INSTANCEOF walks the
      // receiver's proto chain looking for identity match with f.prototype).
      let fn_proto = @value.Object::new(
        @value.Shape::new(),
        self.object_proto_or_null(),
      )
      // Wire `.constructor` back to the function value itself for JS spec
      // parity (`f.prototype.constructor === f`). This is a data property so
      // reading it does not incur additional runtime cost.
      fn_proto.add_property(
        "constructor",
        @value.Function(fn_value),
        @value.ATTR_DEFAULT_DATA,
      )
      fn_value.set_prototype(@value.Object(fn_proto))
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
        NativeFn(nf) =>
          // Native function: invoke synchronously and push the result back
          // onto the caller's operand stack.
          match nf.call(@value.Undefined, args) {
            Ok(v) => frame.operand_stack.push(v)
            Err(nerr) => {
              let err = self.make_error_from_native(nerr)
              let exc = throw_from_frame(frame, cur_pc, err)
              match propagate_exception(frame, exc) {
                Some(next) => frame = next
                None => return Err(exc)
              }
            }
          }
        _ => {
          let err = make_error_object(
            "TypeError",
            describe_call_target(callee) + " is not a function",
          )
          let exc = throw_from_frame(frame, cur_pc, err)
          match propagate_exception(frame, exc) {
            Some(next) => frame = next
            None => return Err(exc)
          }
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
        NativeFn(nf) =>
          // Method call on a native function: `this_val` is the receiver
          // (obj in `obj.f()`); the native impl reads it directly.
          match nf.call(this_val, args) {
            Ok(v) => frame.operand_stack.push(v)
            Err(nerr) => {
              let err = self.make_error_from_native(nerr)
              let exc = throw_from_frame(frame, cur_pc, err)
              match propagate_exception(frame, exc) {
                Some(next) => frame = next
                None => return Err(exc)
              }
            }
          }
        _ => {
          let err = make_error_object(
            "TypeError",
            describe_call_target(callee) + " is not a function",
          )
          let exc = throw_from_frame(frame, cur_pc, err)
          match propagate_exception(frame, exc) {
            Some(next) => frame = next
            None => return Err(exc)
          }
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
            let exc = throw_from_frame(frame, cur_pc, err)
            match propagate_exception(frame, exc) {
              Some(next) => {
                frame = next
                continue
              }
              None => return Err(exc)
            }
          }
          // Materialise a fresh receiver whose `[[Prototype]]` is the
          // function's `.prototype` object. OP_NEW_CLOSURE wires each user
          // function's prototype to a fresh Object linked to Object.prototype,
          // so this branch always has a real Object here. As a defensive
          // fallback we still allow non-Object prototypes (which shouldn't
          // happen in M1) to resolve to Object.prototype.
          let proto : @value.JSValue = match func.prototype() {
            Object(_) => func.prototype()
            _ => self.object_proto_or_null()
          }
          let new_obj = @value.Object::new(@value.Shape::new(), proto)
          let this_val : @value.JSValue = @value.Object(new_obj)
          let chunk = self.chunk_registry[func.chunk_id()]
          let new_frame = Frame::new_for_call(
            chunk, this_val, args, func, frame,
          )
          frame = new_frame
        }
        NativeFn(nf) => {
          if !nf.is_constructor() {
            let err = make_error_object(
              "TypeError",
              nf.name() + " is not a constructor",
            )
            let exc = throw_from_frame(frame, cur_pc, err)
            match propagate_exception(frame, exc) {
              Some(next) => {
                frame = next
                continue
              }
              None => return Err(exc)
            }
          }
          // Materialise a fresh receiver whose proto is nf.prototype (set
          // by builtin init) or Object.prototype as a fallback.
          let proto = match nf.prototype() {
            Object(_) => nf.prototype()
            _ => self.object_proto_or_null()
          }
          let new_obj = @value.Object::new(@value.Shape::new(), proto)
          let this_val : @value.JSValue = @value.Object(new_obj)
          match nf.call(this_val, args) {
            Ok(ret) => {
              // JS spec: constructor returns `this` unless the impl returns
              // an Object / Function / NativeFn.
              let final_ret : @value.JSValue = match ret {
                Object(_) | Function(_) | NativeFn(_) => ret
                _ => this_val
              }
              frame.operand_stack.push(final_ret)
            }
            Err(nerr) => {
              let err = self.make_error_from_native(nerr)
              let exc = throw_from_frame(frame, cur_pc, err)
              match propagate_exception(frame, exc) {
                Some(next) => frame = next
                None => return Err(exc)
              }
            }
          }
        }
        _ => {
          let err = make_error_object(
            "TypeError",
            describe_call_target(callee) + " is not a constructor",
          )
          let exc = throw_from_frame(frame, cur_pc, err)
          match propagate_exception(frame, exc) {
            Some(next) => frame = next
            None => return Err(exc)
          }
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
      // ---------------- 0x70-0x72: try / catch / throw ----------------
    } else if op == @bytecode.OP_ENTER_TRY {
      // Decode signed offset (or -1 sentinel for finally-only). Operand is
      // encoded as a wide-slot 32-bit value by `compile_try`; a value of
      // 0xFFFFFFFF (== -1 signed) means "no catch handler", any other value
      // is a signed offset from the pc AFTER the ENTER_TRY (matching the
      // convention used by OP_JUMP's patch_jump).
      let (offset, adv) = frame.chunk.read_operand_i24(cur_pc)
      frame.pc = cur_pc + adv
      let catch_pc = if offset == -1 { -1 } else { cur_pc + adv + offset }
      // Record the depth of the operand stack at try-entry so `unwind_in_frame`
      // can restore it before pushing the exception value into the catch.
      let handler = TryHandler::new(catch_pc, -1, frame.operand_stack.length())
      frame.try_stack.push(handler)
    } else if op == @bytecode.OP_LEAVE_TRY {
      // Pop the top handler. If try_stack is empty this is a compiler bug —
      // every ENTER_TRY should be paired with a LEAVE_TRY along every normal
      // (non-throwing) exit path.
      if frame.try_stack.length() == 0 {
        abort("VM: LEAVE_TRY with empty try_stack at pc=" + cur_pc.to_string())
      }
      let _ = frame.try_stack.pop()
      frame.pc = cur_pc + 1
    } else if op == @bytecode.OP_THROW {
      let v = pop_stack(frame)
      // Build the exception with the current caller chain as the stack trace,
      // then unwind across frames looking for a handler. If the throw
      // escapes every frame (including the top-level), propagate via
      // `Err(exc)` so `Engine::run_chunk`'s caller can inspect it.
      frame.pc = cur_pc + 1
      let exc = throw_from_frame(frame, cur_pc, v)
      match propagate_exception(frame, exc) {
        Some(next) => frame = next
        None => return Err(exc)
      }
    } else {
      // ---------------- Unimplemented opcode ----------------
      let err = make_error_object(
        "TypeError",
        "opcode 0x" +
        op.to_int().to_string(radix=16) +
        " (" +
        @bytecode.opcode_name(op) +
        ") not implemented",
      )
      frame.pc = cur_pc + 1
      let exc = throw_from_frame(frame, cur_pc, err)
      match propagate_exception(frame, exc) {
        Some(next) => frame = next
        None => return Err(exc)
      }
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
    NativeFn(_) => "function"
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
///
/// Primitive method dispatch for `.toString()`: M1 M3-preview: for
/// `.toString`, return a NativeFn that when called returns
/// `ToString(receiver)`. The M1 AC uses this on Number, Boolean, and String
/// (test_cvt tail `.toString()`, test_op1 assert helper's error messages).
/// This is a stub — the full Number.prototype.toString(radix) with radix
/// support and String.prototype.toString identity semantics arrives in M3.
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
      if name == "toString" || name == "valueOf" {
        return Ok(primitive_to_string_fn(v))
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
    Int32(_) | Number(_) | Bool(_) => {
      if name == "toString" || name == "valueOf" {
        return Ok(primitive_to_string_fn(v))
      }
      Ok(@value.Undefined)
    }
    Function(f) => {
      if name == "name" {
        return Ok(@value.Str(f.name()))
      }
      if name == "prototype" {
        return Ok(f.prototype())
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
    NativeFn(nf) => {
      if name == "name" {
        return Ok(@value.Str(nf.name()))
      }
      if name == "prototype" {
        return Ok(nf.prototype())
      }
      if name == "length" {
        // Same placeholder rationale as `Function`.
        return Ok(@value.Int32(0))
      }
      Ok(@value.Undefined)
    }
  }
}

///|
/// M1 stub for primitive `.toString` / `.valueOf`. Captures the receiver
/// value in a closure and returns a NativeFunction that, when called,
/// coerces it to a String / returns it unchanged. In JS the actual
/// `Number.prototype.toString` is a shared function on the Number prototype;
/// M1 doesn't have primitive-wrapping (`new Number(x)`) machinery so we
/// synthesise a fresh function per property lookup. This is enough to make
/// `(1968610...n).toString()` work as an M1 AC path.
fn primitive_to_string_fn(receiver : @value.JSValue) -> @value.JSValue {
  let captured = receiver
  let name = match receiver {
    Str(_) => "toString"
    _ => "toString"
  }
  let impl_ = fn(
    _this : @value.JSValue,
    _args : Array[@value.JSValue],
  ) -> Result[@value.JSValue, @value.NativeError] {
    match captured {
      Str(s) => Ok(@value.Str(s))
      _ => Ok(@value.Str(to_string(captured)))
    }
  }
  @value.NativeFn(@value.NativeFunction::new(name, false, impl_))
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
    NativeFn(nf) => nf.name()
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
/// Implementation of `x instanceof C` per ECMA-262 §7.3.20 (OrdinaryHasInstance).
///
/// - `C` must be callable; both `Function` and `NativeFn` variants qualify.
///   Any other RHS is a `TypeError`.
/// - `C.prototype` must be an Object; a non-Object proto (Null / Undefined /
///   primitive) yields a `TypeError`.
/// - `x` must be an Object for the check to succeed; primitives always return
///   `false` per spec (`Number instanceof Number` → false).
/// - The walk uses `physical_equal` on `ObjectRef` — matching JS "same object"
///   semantics. `Object::proto` is the parent link.
///
/// Returns `Ok(true)` if the constructor's prototype appears in `x`'s chain,
/// `Ok(false)` otherwise, `Err(msg)` on the TypeError paths.
fn instanceof_check(
  obj_val : @value.JSValue,
  ctor_val : @value.JSValue,
) -> Result[Bool, String] {
  let target_proto : @value.JSValue = match ctor_val {
    NativeFn(nf) => nf.prototype()
    Function(f) => f.prototype()
    _ => return Err("Right-hand side of instanceof is not callable")
  }
  let target_obj : @value.ObjectRef = match target_proto {
    Object(o) => o
    _ => return Err("Function has non-object prototype in instanceof check")
  }
  match obj_val {
    Object(start) => {
      let mut cur = start.proto
      let mut result = false
      let mut done = false
      while !done {
        match cur {
          Object(op_ref) =>
            if physical_equal(op_ref, target_obj) {
              result = true
              done = true
            } else {
              cur = op_ref.proto
            }
          _ => done = true
        }
      }
      Ok(result)
    }
    _ => Ok(false)
  }
}

///|
/// Propagate a JS exception through the frame stack looking for the first
/// handler that can catch it. Returns `Some(frame)` where `frame` is the
/// frame in which the catch resumes (its `pc` has been set to the catch
/// entry and the exception value has been pushed onto its operand stack),
/// or `None` if the exception escaped every active frame — in which case
/// the caller should return `Err(exc)` from `execute_frame`.
///
/// The walk begins at `frame` (the current frame), consults its try_stack
/// via `unwind_in_frame`, and — on miss — follows `caller` links upward.
/// This matches JS's semantics where a thrown exception unwinds the call
/// stack frame by frame; each frame's try_stack acts as the local catch
/// table.
fn propagate_exception(frame : Frame, exc : @value.JSException) -> Frame? {
  let mut cur : Frame? = Some(frame)
  while true {
    match cur {
      None => return None
      Some(f) =>
        match unwind_in_frame(f, exc) {
          Some(pc) => {
            f.pc = pc
            return Some(f)
          }
          None => cur = f.caller
        }
    }
  }
  // Unreachable — the `while true` returns from every arm.
  None
}

///|
/// Attempt to catch an exception in the current frame's `try_stack`.
///
/// Returns `Some(catch_pc)` if a handler was popped: the operand stack is
/// truncated to the depth recorded at `OP_ENTER_TRY` and the exception value
/// is pushed onto the stack so the catch clause's binding receives it. The
/// caller sets `frame.pc = catch_pc` and continues execution.
///
/// Returns `None` if `try_stack` is empty. The caller must propagate the
/// exception up to its own caller frame (in `OP_CALL` / `OP_CALL_METHOD` /
/// `OP_CONSTRUCT`) or return `Err(exc)` if it is already at the top-level
/// frame.
///
/// The handler entry with `catch_pc == -1` represents a `finally`-only
/// construct (compile_try emits ENTER_TRY with a sentinel when there is no
/// catch clause). In that case there is no user-supplied handler to run —
/// we still pop the handler entry so `OP_LEAVE_TRY` at the end of the
/// finally block is balanced, but return `None` (i.e. keep propagating). M1
/// does not run the finally block on catch-throw, which is a documented
/// limitation — see `src/compiler/stmt.mbt`'s `compile_try` for the
/// deliberate inline-finally lowering.
fn unwind_in_frame(frame : Frame, exc : @value.JSException) -> Int? {
  let n = frame.try_stack.length()
  if n == 0 {
    return None
  }
  let handler = frame.try_stack[n - 1]
  let _ = frame.try_stack.pop()
  // For a finally-only entry (no catch), there is nothing to catch inside
  // this handler; keep propagating.
  if handler.catch_pc < 0 {
    return None
  }
  // Truncate the operand stack to the depth recorded at ENTER_TRY.
  while frame.operand_stack.length() > handler.operand_depth {
    let _ = frame.operand_stack.pop()
  }
  // Push the exception value so the catch binding receives it.
  frame.operand_stack.push(exc.value)
  Some(handler.catch_pc)
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
      Object(_) | Function(_) | NativeFn(_) => ret
      _ => this_val
    }
  } else {
    ret
  }
}
