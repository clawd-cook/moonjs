// VM: the interpreter for M1 bytecode. Step 8a scope — see the parent task's
// implement.md.
//
// Design references:
// - design.md §8 (Frame layout, main loop shape, unwind algorithm).
// - design.md §4.3 (opcode table).
// - `.trellis/spec/backend/quality-guidelines.md` (no functional `loop{}`,
//   no `Ref[T]`, no `not(x)`, `pub(all) enum` for cross-package match).
//
// Deliberate 8a limitations documented for the 8b handoff:
// - No call / return / new_closure / upvalue support. Nested chunks compile
//   but calling them raises TypeError.
// - `throw`, `enter_try`, `leave_try` are recognised but a `throw` unwinds
//   only within the current frame; 8b will wire cross-frame unwind and
//   handler installation.
// - `instanceof` / `in` return `TypeError` (Object prototype-chain checks
//   need Step 9's builtin wire-up).
// - No object / array / property opcodes in 8a — those arrive in 8b.

// ---------------------------------------------------------------------------
// Frame layout
// ---------------------------------------------------------------------------

///|
/// One activation record. Corresponds to design.md §8.1's Frame.
///
/// Field notes:
/// - `pc` is the instruction word index into `chunk.code`, not a byte
///   offset. The main loop advances it in variable increments (1 for narrow
///   ops, 2 for wide-prefixed ops).
/// - `locals` is preallocated to `chunk.local_count` and starts filled with
///   `Undefined`. Slots corresponding to parameters get overwritten by the
///   caller before the frame starts running (Step 8b).
/// - `operand_stack` is a growable value stack. Everything the VM manipulates
///   goes through here — no register file.
/// - `try_stack`, `upvalues`, `caller`, `open_upvalues` are declared to
///   match the design; only `try_stack` is written by 8a arms (empty by
///   default; 8b's `enter_try` / `leave_try` push/pop).
/// - `this_val` is stored per design.md §8.1 outside of the locals table.
pub struct Frame {
  mut pc : Int
  chunk : @bytecode.Chunk
  locals : Array[@value.JSValue]
  upvalues : Array[UpvalueRef]
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
  let locals : Array[@value.JSValue] = []
  for _ in 0..<chunk.local_count {
    locals.push(@value.Undefined)
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
/// Upvalue reference. `OnStack` points into a specific frame's `locals`
/// array; `Closed` wraps a heap cell that survives the frame's return.
/// 8a defines the type but never constructs it (upvalue lifecycle is 8b).
pub(all) enum UpvalueRef {
  OnStack(Frame, Int)
  Closed(ClosedUpvalue)
}

///|
/// Heap cell holding a closed-over value. `mut` so writes through
/// `set_upvalue` mutate the shared storage.
pub struct ClosedUpvalue {
  mut value : @value.JSValue
}

///|
/// 8b hook: allocate a heap cell for closing over a local. 8a never calls
/// this — declared here so `ClosedUpvalue` has a real constructor and the
/// type checker doesn't flag the struct as unused. Step 8b's `close_upvalue`
/// path will use this at frame return time.
pub fn ClosedUpvalue::new(v : @value.JSValue) -> ClosedUpvalue {
  { value: v, }
}

///|
/// 8b hook: read the closed cell. Same rationale as `ClosedUpvalue::new`.
pub fn ClosedUpvalue::get(self : ClosedUpvalue) -> @value.JSValue {
  self.value
}

///|
/// 8b hook: write the closed cell.
pub fn ClosedUpvalue::set(self : ClosedUpvalue, v : @value.JSValue) -> Unit {
  self.value = v
}

///|
/// Try-handler entry. Recorded by `OP_ENTER_TRY`, consumed by `throw` /
/// `leave_try`. `operand_depth` remembers the operand-stack depth at the
/// time the handler was installed so `throw` can unwind the stack back to
/// that point before landing in the catch handler.
pub struct TryHandler {
  catch_pc : Int
  finally_pc : Int
  operand_depth : Int
}

///|
/// 8b hook: construct a try handler. Not used by 8a; declared so the type
/// checker doesn't warn about an unconstructed struct. Step 8b's
/// `OP_ENTER_TRY` arm will call this.
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
/// Top-level engine. Holds the global object; Step 9 populates it with
/// builtin constructors and prototypes.
pub struct Engine {
  globals : @value.ObjectRef
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
  { globals, }
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
/// Build a `JSException` with a single-frame stack trace pointing at the
/// throwing instruction. Callers pass `cur_pc` — the pc value at the time
/// the instruction was decoded, BEFORE the arm advanced `frame.pc`. This is
/// the index into `source_locs` that identifies the offending instruction;
/// using `frame.pc` after the arm's advance would point one instruction
/// past the throw, giving an off-by-one location.
fn throw_from_frame(
  frame : Frame,
  cur_pc : Int,
  value : @value.JSValue,
) -> @value.JSException {
  let loc = if cur_pc >= 0 && cur_pc < frame.chunk.source_locs.length() {
    frame.chunk.source_locs[cur_pc]
  } else if frame.chunk.source_locs.length() > 0 {
    frame.chunk.source_locs[frame.chunk.source_locs.length() - 1]
  } else {
    @util.SourceLoc::new(1, 1)
  }
  let info = @value.StackFrameInfo::new(
    frame.chunk.name,
    frame.chunk.filename,
    loc,
  )
  @value.JSException::new(value, [info])
}

///|
/// Manufacture a plain-object exception with a `message` string property.
/// Step 9 will replace this with real `TypeError` / `ReferenceError`
/// constructors that produce properly-linked Error objects. For 8a we just
/// need something callers can pattern-match on the message of.
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
/// Return semantics: `Ok(v)` when the frame terminates via `OP_RETURN_VAL`
/// (with `v` the top-of-stack), `Ok(Undefined)` on `OP_RETURN_UNDEF` or
/// fallthrough at end of code, and `Err(exc)` for uncaught exceptions.
///
/// Implementation note: MoonBit's `for {}` infinite-loop form does not
/// carry a break-value type in the way `loop {}` did. Rather than fight
/// that, `execute_frame` uses `return` directly to exit — the outer
/// function type is our result type, so `return Ok(v)` / `return Err(exc)`
/// works cleanly and the loop body itself has `Unit` type.
fn Engine::execute_frame(
  self : Engine,
  frame : Frame,
) -> Result[@value.JSValue, @value.JSException] {
  while true {
    if frame.pc >= frame.chunk.code.length() {
      // Fell off the end without a RETURN_*. Treat as return undefined.
      return Ok(@value.Undefined)
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
      frame.operand_stack.push(frame.locals[i])
      frame.pc = cur_pc + adv
    } else if op == @bytecode.OP_SET_LOCAL {
      let (idx, adv) = frame.chunk.read_operand_u24(cur_pc)
      let i = idx.reinterpret_as_int()
      // SET_LOCAL peeks (leaves TOS in place per compiler's convention that
      // an assignment expression yields the assigned value). Callers that
      // don't need the value emit an explicit DROP after.
      let v = peek_stack(frame)
      frame.locals[i] = v
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
      // which needs Function objects (Step 8b) and builtin prototype linking
      // (Step 9). For 8a we throw TypeError so any accidental exercise
      // surfaces cleanly.
      let _ = pop_stack(frame)
      let _ = pop_stack(frame)
      frame.pc = cur_pc + 1
      let err = make_error_object(
        "TypeError", "instanceof requires Step 8b (call/return + prototype linking)",
      )
      return Err(throw_from_frame(frame, cur_pc, err))
    } else if op == @bytecode.OP_IN {
      let _ = pop_stack(frame)
      let _ = pop_stack(frame)
      frame.pc = cur_pc + 1
      let err = make_error_object(
        "TypeError", "'in' requires Step 8b (Object operand support)",
      )
      return Err(throw_from_frame(frame, cur_pc, err))
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
      // ---------------- 0x54-0x55: return (partial for 8a) ----------------
    } else if op == @bytecode.OP_RETURN_UNDEF {
      return Ok(@value.Undefined)
    } else if op == @bytecode.OP_RETURN_VAL {
      let v = pop_stack(frame)
      return Ok(v)
      // ---------------- 0x70: throw ----------------
    } else if op == @bytecode.OP_THROW {
      let v = pop_stack(frame)
      // 8a: no try_stack unwinding (that's 8b). Just build an exception with
      // a single-frame trace pointing at the throw location and return.
      frame.pc = cur_pc + 1
      return Err(throw_from_frame(frame, cur_pc, v))
    } else {
      // ---------------- Not implemented in 8a ----------------
      let err = make_error_object(
        "TypeError",
        "opcode 0x" +
        op.to_int().to_string(radix=16) +
        " (" +
        @bytecode.opcode_name(op) +
        ") not implemented in Step 8a",
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
  }
}
