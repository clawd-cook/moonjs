// Chunk: the compiled unit of MoonJS bytecode. One Chunk per function template
// (or the top-level script). Owns its code array, constant pool, source
// location table, and nested function templates.
//
// The wide-prefix convention is the trickiest part of this file. It lets any
// opcode with a wide-capable operand carry either a 24-bit or a full 32-bit
// value:
//
//   Single-instruction form (operand fits in 24 bits unsigned, or 24 bits
//   signed for signed variants):
//       [op | HI | MID | LO]
//
//   Two-instruction form (operand needs the full 32 bits):
//       [WIDE | W_HI | W_MID | W_LO]
//       [op   | LO8  | 0     | 0    ]
//   The wide slot supplies the high 24 bits; the following instruction's
//   operand A byte supplies the low 8 bits. Result is a 32-bit unsigned (or
//   signed for signed variants) value.
//
// Every emit helper picks the narrowest form that fits, so downstream tools
// (disassembler, VM) only need to handle both cases on the read side —
// `Chunk::read_operand_u24` and `Chunk::read_operand_i24` do that.

///|
/// A compiled bytecode chunk plus its metadata. One per function template
/// (and one for the top-level script). Mutable — the compiler builds a
/// `Chunk` incrementally via the `emit_*` helpers, then hands it to the VM.
///
/// - `code`: 32-bit instructions, encoded via `encode` from `instr.mbt`.
/// - `const_pool`: run-time constant values referenced by `push_const` and
///   friends. Deduplication (`add_const`) uses `JSValue`'s `==`, so equal
///   primitives share one slot and distinct object references never dedup.
/// - `source_locs`: parallel to `code`; `source_locs[pc]` is the source
///   location that produced `code[pc]`. Kept as a separate array (rather
///   than an interleaved encoding) so a release build can drop it with
///   `strip_debug()` (M6).
/// - `name`: the function's display name (or `"<top>"` for scripts). Used
///   by `Error.prototype.stack` and by the disassembler.
/// - `filename`: whatever `Engine::eval_script` received. Same consumers.
/// - `param_count`: number of declared parameters. VM Step 8 uses this to
///   decide arity fill / drop when a call passes too few or too many args.
/// - `local_count`: total number of local slots (params + `var` / `let` /
///   `const` bindings). Determines the size of `Frame.locals`.
/// - `upvalue_slots`: capture plan for this template. See `upvalue.mbt`.
/// - `nested_chunks`: function-template children. `new_closure` references
///   them by index; keeping them here rather than in `const_pool` matches
///   design.md §4.4 and avoids a special-case in the pool.
/// - `is_strict`: reserved for M2 strict-mode semantics; always `false` in
///   M1.
/// - `self_binding_slot`: for a named function expression, the local slot
///   that the VM should populate with the newly-created `Function` value at
///   call time so `function f() { ... f() ... }` sees `f` inside the body.
///   `-1` when the function has no self-binding (top-level scripts,
///   anonymous function expressions, `function foo` declarations — those
///   bind the name through their enclosing scope's mechanism, not a slot).
pub struct Chunk {
  code : Array[UInt]
  const_pool : Array[@value.JSValue]
  source_locs : Array[@util.SourceLoc]
  name : String
  filename : String
  param_count : Int
  mut local_count : Int
  upvalue_slots : Array[UpvalueSlotDecl]
  nested_chunks : Array[Chunk]
  mut is_strict : Bool
  mut self_binding_slot : Int
} derive(@debug.Debug)

///|
/// Type alias documenting the "reference to a Chunk" role — MoonBit struct
/// values are already reference-typed, so this is a naming aid rather than a
/// semantic wrapper (mirroring `ObjectRef` / `ShapeRef` in the value package).
pub type ChunkRef = Chunk

///|
/// Fresh, empty chunk. `local_count` starts at `param_count` because every
/// parameter occupies one local slot before the compiler even walks the
/// function body. Additional locals are recorded by the compiler by growing
/// `local_count` as it processes `var` / `let` / `const` declarators.
pub fn Chunk::new(name : String, filename : String, param_count : Int) -> Chunk {
  {
    code: [],
    const_pool: [],
    source_locs: [],
    name,
    filename,
    param_count,
    local_count: param_count,
    upvalue_slots: [],
    nested_chunks: [],
    is_strict: false,
    self_binding_slot: -1,
  }
}

///|
/// Bump `local_count` when the compiler introduces a new local slot beyond
/// the parameter list. Returns the newly-allocated slot index.
pub fn Chunk::alloc_local(self : Chunk) -> Int {
  let idx = self.local_count
  self.local_count = idx + 1
  idx
}

///|
/// Mark the chunk as strict-mode. M1 never calls this (the parser is not yet
/// strict-aware), but the setter is exposed so M2's strict-directive pass has
/// a place to write.
pub fn Chunk::set_strict(self : Chunk, is_strict : Bool) -> Unit {
  self.is_strict = is_strict
}

///|
/// Record which local slot the VM should populate with the newly-created
/// `Function` at call time. Emitted by the compiler for named function
/// expressions: the body's reference to its own name resolves to this local
/// slot, and the VM writes the function reference into the slot when a
/// frame for the chunk is created (see design.md §8.1 handoff notes).
///
/// Pass `-1` (the default from `Chunk::new`) to indicate no self-binding.
pub fn Chunk::set_self_binding_slot(self : Chunk, slot : Int) -> Unit {
  self.self_binding_slot = slot
}

///|
/// Add an upvalue slot to the capture plan. Returns the newly-allocated slot
/// index (used by the compiler to emit `get_upvalue` / `set_upvalue`).
pub fn Chunk::add_upvalue(self : Chunk, slot : UpvalueSlotDecl) -> Int {
  let idx = self.upvalue_slots.length()
  self.upvalue_slots.push(slot)
  idx
}

///|
/// Add a nested function template. Returns the index used by `OP_NEW_CLOSURE`.
pub fn Chunk::add_nested(self : Chunk, chunk : Chunk) -> Int {
  let idx = self.nested_chunks.length()
  self.nested_chunks.push(chunk)
  idx
}

///|
/// Deduplicating constant-pool insert. Two intern-equal `JSValue`s always
/// share one slot; two distinct `Object(_)` references never dedup because
/// `JSValue`'s `Eq` uses physical equality for objects (see `value/value.mbt`).
///
/// Returns the pool index. The dedup is `O(n)` in the pool size — acceptable
/// for M1 chunks (dozens to hundreds of entries) and easy to swap for a hash
/// index if a future compiler pushes it into the thousands.
pub fn Chunk::add_const(self : Chunk, v : @value.JSValue) -> Int {
  for i in 0..<self.const_pool.length() {
    if self.const_pool[i] == v {
      return i
    }
  }
  let idx = self.const_pool.length()
  self.const_pool.push(v)
  idx
}

///|
/// Split the low 24 bits of a UInt into (hi, mid, lo) bytes for opcode operand
/// encoding. Extracted because the same shift-and-mask triple appears at every
/// narrow/wide emit and patch site.
fn split_u24_bytes(u : UInt) -> (Byte, Byte, Byte) {
  (
    ((u >> 16) & 0xFFU).to_byte(),
    ((u >> 8) & 0xFFU).to_byte(),
    (u & 0xFFU).to_byte(),
  )
}

///|
/// Emit a raw four-byte instruction. The caller is responsible for choosing
/// wide-vs-narrow encoding; most callers use `emit_wide_u32` / `emit_wide_i32`
/// instead. `loc` is pushed to `source_locs` so the array stays parallel with
/// `code`.
pub fn Chunk::emit(
  self : Chunk,
  op : Byte,
  a : Byte,
  b : Byte,
  c : Byte,
  loc : @util.SourceLoc,
) -> Unit {
  self.code.push(encode(op, a, b, c))
  self.source_locs.push(loc)
}

///|
/// Emit an opcode carrying an unsigned integer operand up to 32 bits. Picks
/// the narrowest form:
///
/// - If `operand <= 0xFFFFFF`: single instruction `[op | HI | MID | LO]`.
/// - Otherwise: `[WIDE | W_HI | W_MID | W_LO] [op | LOW8 | 0 | 0]`, where the
///   wide slot supplies the high 24 bits.
///
/// The wide encoding is symmetric with `read_operand_u24`. Both entries in the
/// pair share `loc` — the disassembler treats a wide pair as one logical line.
pub fn Chunk::emit_wide_u32(
  self : Chunk,
  op : Byte,
  operand : UInt,
  loc : @util.SourceLoc,
) -> Unit {
  if operand <= 0xFFFFFFU {
    let (hi, mid, lo) = split_u24_bytes(operand)
    self.emit(op, hi, mid, lo, loc)
  } else {
    let (w_hi, w_mid, w_lo) = split_u24_bytes(operand >> 8)
    let low8 = (operand & 0xFFU).to_byte()
    self.emit(OP_WIDE, w_hi, w_mid, w_lo, loc)
    self.emit(op, low8, 0, 0, loc)
  }
}

///|
/// Emit an opcode carrying a signed 32-bit operand. Chooses the narrowest form
/// that fits — 24-bit signed range is `-8_388_608 ..= 8_388_607`; outside that,
/// falls back to the wide two-instruction form (high 24 bits + low 8 bits).
///
/// The reader side sign-extends the 24-bit narrow form; the 32-bit wide form
/// carries a full signed integer so no extension is needed. See
/// `read_operand_i24`.
pub fn Chunk::emit_wide_i32(
  self : Chunk,
  op : Byte,
  operand : Int,
  loc : @util.SourceLoc,
) -> Unit {
  // Narrow form: operand fits in signed 24 bits.
  if operand >= -8388608 && operand <= 8388607 {
    // Preserve the low 24 bits regardless of sign (reader sign-extends).
    let u = operand.reinterpret_as_uint() & 0xFFFFFFU
    let (hi, mid, lo) = split_u24_bytes(u)
    self.emit(op, hi, mid, lo, loc)
  } else {
    // Wide form. Reinterpret as UInt to get the full 32-bit pattern.
    let u = operand.reinterpret_as_uint()
    let (w_hi, w_mid, w_lo) = split_u24_bytes(u >> 8)
    let low8 = (u & 0xFFU).to_byte()
    self.emit(OP_WIDE, w_hi, w_mid, w_lo, loc)
    self.emit(op, low8, 0, 0, loc)
  }
}

///|
/// Decode the operand of an opcode expecting an unsigned integer. Handles both
/// the narrow (24-bit) and wide (32-bit) forms transparently.
///
/// Returns `(operand, pc_advance)` where `pc_advance` is `1` for the narrow
/// form and `2` for the wide form. The VM's `pc` should be advanced by that
/// amount to skip past both instructions in the wide case.
///
/// Precondition: `pc` must point at an instruction whose opcode carries an
/// unsigned operand (or at an `OP_WIDE` followed by such an instruction).
/// Reading past the end of `code` aborts.
pub fn Chunk::read_operand_u24(self : Chunk, pc : Int) -> (UInt, Int) {
  if pc < 0 || pc >= self.code.length() {
    abort("Chunk::read_operand_u24: pc out of range: " + pc.to_string())
  }
  let first = decode(self.code[pc])
  if first.op == OP_WIDE {
    if pc + 1 >= self.code.length() {
      abort(
        "Chunk::read_operand_u24: wide prefix at end of chunk (pc=" +
        pc.to_string() +
        ")",
      )
    }
    let second = decode(self.code[pc + 1])
    // Wide contributes high 24 bits; second contributes the low 8 bits from A.
    let high24 = (first.a.to_uint() << 16) |
      (first.b.to_uint() << 8) |
      first.c.to_uint()
    let low8 = second.a.to_uint()
    ((high24 << 8) | low8, 2)
  } else {
    let hi = first.a.to_uint()
    let mid = first.b.to_uint()
    let lo = first.c.to_uint()
    ((hi << 16) | (mid << 8) | lo, 1)
  }
}

///|
/// Decode the operand of an opcode expecting a signed integer. Narrow form:
/// sign-extends a 24-bit value; wide form: reinterprets the 32-bit UInt as a
/// signed Int (which is what MoonBit's `to_int` does bit-for-bit).
pub fn Chunk::read_operand_i24(self : Chunk, pc : Int) -> (Int, Int) {
  let (u, advance) = self.read_operand_u24(pc)
  if advance == 1 {
    // Narrow: sign-extend the 24-bit value.
    let signed = if u >= 0x800000U {
      // Set the top 8 bits to 0xFF (all ones) for negative values.
      (u | 0xFF000000U).reinterpret_as_int()
    } else {
      u.reinterpret_as_int()
    }
    (signed, 1)
  } else {
    (u.reinterpret_as_int(), 2)
  }
}

///|
/// Rewrite the operand of the jump instruction at `at_pc` so that it targets
/// `target_pc` (both are word indices into `code`). The offset stored is
/// signed, relative to the instruction *following* `at_pc` — i.e.
/// `target_pc - (at_pc + narrow_advance)`.
///
/// **Constraint**: this M1 helper only supports patching within whatever
/// encoding form the emit call originally chose. Because the compiler cannot
/// know the eventual distance to a forward target when it emits the jump, it
/// should always emit forward jumps via `emit_wide_u32` / `emit_wide_i32` with
/// a placeholder that already reserves the wide two-instruction form (i.e.
/// pass a placeholder operand `>= 0x1000000` so the emit picks wide). Backward
/// jumps have a known distance and can be emitted narrow directly.
///
/// If the wide slot is present but the new offset happens to fit in 24 bits,
/// this function still writes the wide encoding (keeping the code array shape
/// unchanged); if the wide slot is absent but the offset needs it, this
/// function aborts with a clear message.
pub fn Chunk::patch_jump(self : Chunk, at_pc : Int, target_pc : Int) -> Unit {
  if at_pc < 0 || at_pc >= self.code.length() {
    abort("Chunk::patch_jump: at_pc out of range: " + at_pc.to_string())
  }
  let first = decode(self.code[at_pc])
  let is_wide = first.op == OP_WIDE
  // Offset is signed, measured from the instruction after the whole jump
  // (i.e. after the wide+op pair when wide, or after the single instr).
  let advance = if is_wide { 2 } else { 1 }
  let offset = target_pc - (at_pc + advance)
  if is_wide {
    // Wide form: rewrite both instruction words.
    if at_pc + 1 >= self.code.length() {
      abort(
        "Chunk::patch_jump: wide slot has no following op at pc=" +
        at_pc.to_string(),
      )
    }
    let jump_op = decode(self.code[at_pc + 1]).op
    let u = offset.reinterpret_as_uint()
    let (w_hi, w_mid, w_lo) = split_u24_bytes(u >> 8)
    let low8 = (u & 0xFFU).to_byte()
    self.code[at_pc] = encode(OP_WIDE, w_hi, w_mid, w_lo)
    self.code[at_pc + 1] = encode(jump_op, low8, 0, 0)
  } else {
    // Narrow form: must fit in signed 24 bits.
    if offset < -8388608 || offset > 8388607 {
      abort(
        "Chunk::patch_jump: offset " +
        offset.to_string() +
        " doesn't fit in narrow 24-bit slot at pc=" +
        at_pc.to_string() +
        "; caller must emit the jump via emit_wide_* to reserve a wide slot",
      )
    }
    let u = offset.reinterpret_as_uint() & 0xFFFFFFU
    let (hi, mid, lo) = split_u24_bytes(u)
    self.code[at_pc] = encode(first.op, hi, mid, lo)
  }
}
