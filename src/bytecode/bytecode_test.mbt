// Blackbox tests for the bytecode package: encoding round-trip, chunk emit /
// read, constant-pool dedup, wide-prefix encoding, and disassembler output.
// These exercise the public API surface used by the compiler (Step 7) and the
// VM (Step 8).

///|
/// Shared trivial `SourceLoc` used by tests that don't care about the loc.
fn loc0() -> @util.SourceLoc {
  @util.SourceLoc::new(1, 0)
}

// ---------------------------------------------------------------------------
// encode / decode round trip
// ---------------------------------------------------------------------------

///|
test "encode / decode round-trip with zero bytes" {
  let word = @bytecode.encode(0x00, 0x00, 0x00, 0x00)
  let d = @bytecode.decode(word)
  @test.assert_eq(d.op, (0x00 : Byte))
  @test.assert_eq(d.a, (0x00 : Byte))
  @test.assert_eq(d.b, (0x00 : Byte))
  @test.assert_eq(d.c, (0x00 : Byte))
}

///|
test "encode / decode round-trip with distinct bytes" {
  let word = @bytecode.encode(0x11, 0x22, 0x33, 0x44)
  let d = @bytecode.decode(word)
  @test.assert_eq(d.op, (0x11 : Byte))
  @test.assert_eq(d.a, (0x22 : Byte))
  @test.assert_eq(d.b, (0x33 : Byte))
  @test.assert_eq(d.c, (0x44 : Byte))
}

///|
test "encode / decode round-trip with 0xFF payload" {
  let word = @bytecode.encode(0xFF, 0xFF, 0xFF, 0xFF)
  let d = @bytecode.decode(word)
  @test.assert_eq(d.op, (0xFF : Byte))
  @test.assert_eq(d.a, (0xFF : Byte))
  @test.assert_eq(d.b, (0xFF : Byte))
  @test.assert_eq(d.c, (0xFF : Byte))
}

///|
test "encode / decode round-trip a variety of combinations" {
  let cases : Array[(Byte, Byte, Byte, Byte)] = [
    (0x00, 0x01, 0x02, 0x03),
    (0x7F, 0x80, 0xFE, 0x01),
    (0xAA, 0x55, 0x00, 0xFF),
    (@bytecode.OP_PUSH_I32, 0x00, 0x01, 0x02),
    (@bytecode.OP_JUMP, 0xFF, 0xFF, 0xFF),
  ]
  for c in cases {
    let (op, a, b, cc) = c
    let d = @bytecode.decode(@bytecode.encode(op, a, b, cc))
    @test.assert_eq(d.op, op)
    @test.assert_eq(d.a, a)
    @test.assert_eq(d.b, b)
    @test.assert_eq(d.c, cc)
  }
}

///|
test "DecodedInstr Eq derives structural equality" {
  let d1 = @bytecode.decode(@bytecode.encode(0x10, 0x20, 0x30, 0x40))
  let d2 = @bytecode.decode(@bytecode.encode(0x10, 0x20, 0x30, 0x40))
  let d3 = @bytecode.decode(@bytecode.encode(0x10, 0x20, 0x30, 0x41))
  @test.assert_eq(d1, d2)
  assert_true(d1 != d3)
}

// ---------------------------------------------------------------------------
// Chunk construction & basic bookkeeping
// ---------------------------------------------------------------------------

///|
test "Chunk::new starts empty with the expected metadata" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  @test.assert_eq(ch.code.length(), 0)
  @test.assert_eq(ch.const_pool.length(), 0)
  @test.assert_eq(ch.source_locs.length(), 0)
  @test.assert_eq(ch.name, "<top>")
  @test.assert_eq(ch.filename, "eval.js")
  @test.assert_eq(ch.param_count, 0)
  // local_count begins at param_count.
  @test.assert_eq(ch.local_count, 0)
  @test.assert_eq(ch.upvalue_slots.length(), 0)
  @test.assert_eq(ch.nested_chunks.length(), 0)
  assert_true(!ch.is_strict)
}

///|
test "Chunk::new with params seeds local_count to param_count" {
  let ch = @bytecode.Chunk::new("f", "test.js", 3)
  @test.assert_eq(ch.param_count, 3)
  @test.assert_eq(ch.local_count, 3)
}

///|
test "Chunk::alloc_local hands out sequential slot indices" {
  let ch = @bytecode.Chunk::new("f", "test.js", 2)
  @test.assert_eq(ch.alloc_local(), 2)
  @test.assert_eq(ch.alloc_local(), 3)
  @test.assert_eq(ch.alloc_local(), 4)
  @test.assert_eq(ch.local_count, 5)
}

///|
test "Chunk::set_strict flips the flag" {
  let ch = @bytecode.Chunk::new("f", "test.js", 0)
  assert_true(!ch.is_strict)
  ch.set_strict(true)
  assert_true(ch.is_strict)
}

///|
test "Chunk::add_upvalue and add_nested return the fresh index" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  let uv0 = @bytecode.UpvalueSlotDecl::new(Local, 3)
  let uv1 = @bytecode.UpvalueSlotDecl::new(ParentUpvalue, 0)
  @test.assert_eq(ch.add_upvalue(uv0), 0)
  @test.assert_eq(ch.add_upvalue(uv1), 1)
  @test.assert_eq(ch.upvalue_slots.length(), 2)
  let inner = @bytecode.Chunk::new("inner", "eval.js", 0)
  @test.assert_eq(ch.add_nested(inner), 0)
  @test.assert_eq(ch.nested_chunks.length(), 1)
}

// ---------------------------------------------------------------------------
// Constant pool dedup
// ---------------------------------------------------------------------------

///|
test "Chunk::add_const dedups equal primitives" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  let a = ch.add_const(Number(3.14))
  let b = ch.add_const(Number(3.14))
  @test.assert_eq(a, b)
  @test.assert_eq(ch.const_pool.length(), 1)
  // Distinct values get distinct indices.
  let c = ch.add_const(Number(2.71))
  assert_true(c != a)
  @test.assert_eq(ch.const_pool.length(), 2)
}

///|
test "Chunk::add_const dedups equal strings" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  @test.assert_eq(ch.add_const(Str("foo")), 0)
  @test.assert_eq(ch.add_const(Str("bar")), 1)
  @test.assert_eq(ch.add_const(Str("foo")), 0)
  @test.assert_eq(ch.const_pool.length(), 2)
}

///|
test "Chunk::add_const dedups Int32 vs Number as distinct" {
  // JSValue::Eq treats Int32(1) and Number(1.0) as different variants; the
  // pool respects that.
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  let i = ch.add_const(Int32(1))
  let n = ch.add_const(Number(1.0))
  assert_true(i != n)
  @test.assert_eq(ch.const_pool.length(), 2)
}

///|
test "Chunk::add_const treats distinct Objects as distinct pool entries" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  let o1 = @value.Object::new(@value.Shape::new(), Null)
  let o2 = @value.Object::new(@value.Shape::new(), Null)
  let ia = ch.add_const(Object(o1))
  let ib = ch.add_const(Object(o2))
  let ic = ch.add_const(Object(o1))
  assert_true(ia != ib)
  @test.assert_eq(ic, ia)
  @test.assert_eq(ch.const_pool.length(), 2)
}

// ---------------------------------------------------------------------------
// Emit / read parallel array alignment
// ---------------------------------------------------------------------------

///|
test "Chunk::emit keeps code and source_locs parallel" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit(@bytecode.OP_PUSH_UNDEF, 0, 0, 0, @util.SourceLoc::new(1, 0))
  ch.emit(@bytecode.OP_PUSH_TRUE, 0, 0, 0, @util.SourceLoc::new(1, 10))
  ch.emit(@bytecode.OP_RETURN_VAL, 0, 0, 0, @util.SourceLoc::new(2, 5))
  @test.assert_eq(ch.code.length(), 3)
  @test.assert_eq(ch.source_locs.length(), 3)
  @test.assert_eq(ch.source_locs[0], @util.SourceLoc::new(1, 0))
  @test.assert_eq(ch.source_locs[2], @util.SourceLoc::new(2, 5))
}

// ---------------------------------------------------------------------------
// Wide-prefix encoding for unsigned operands
// ---------------------------------------------------------------------------

///|
test "emit_wide_u32 uses narrow form when operand fits in 24 bits" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_u32(@bytecode.OP_PUSH_CONST, 42U, loc0())
  @test.assert_eq(ch.code.length(), 1)
  let (operand, advance) = ch.read_operand_u24(0)
  @test.assert_eq(operand, 42U)
  @test.assert_eq(advance, 1)
}

///|
test "emit_wide_u32 uses narrow form for exactly 0xFFFFFF" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_u32(@bytecode.OP_PUSH_CONST, 0xFFFFFFU, loc0())
  @test.assert_eq(ch.code.length(), 1)
  let (operand, advance) = ch.read_operand_u24(0)
  @test.assert_eq(operand, 0xFFFFFFU)
  @test.assert_eq(advance, 1)
}

///|
test "emit_wide_u32 promotes to wide for 0x1000000" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_u32(@bytecode.OP_PUSH_CONST, 0x01000000U, loc0())
  @test.assert_eq(ch.code.length(), 2)
  // First word: wide prefix.
  let d0 = @bytecode.decode(ch.code[0])
  @test.assert_eq(d0.op, @bytecode.OP_WIDE)
  // Second word: the actual push_const op.
  let d1 = @bytecode.decode(ch.code[1])
  @test.assert_eq(d1.op, @bytecode.OP_PUSH_CONST)
  let (operand, advance) = ch.read_operand_u24(0)
  @test.assert_eq(operand, 0x01000000U)
  @test.assert_eq(advance, 2)
}

///|
test "emit_wide_u32 round-trips a large operand near u32 max" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  let val : UInt = 0xFFFFFF00U
  ch.emit_wide_u32(@bytecode.OP_PUSH_CONST, val, loc0())
  @test.assert_eq(ch.code.length(), 2)
  let (operand, advance) = ch.read_operand_u24(0)
  @test.assert_eq(operand, val)
  @test.assert_eq(advance, 2)
}

// ---------------------------------------------------------------------------
// Wide-prefix encoding for signed operands
// ---------------------------------------------------------------------------

///|
test "emit_wide_i32 round-trips a small positive value in narrow form" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, 42, loc0())
  @test.assert_eq(ch.code.length(), 1)
  let (operand, advance) = ch.read_operand_i24(0)
  @test.assert_eq(operand, 42)
  @test.assert_eq(advance, 1)
}

///|
test "emit_wide_i32 round-trips -1 with sign extension" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, -1, loc0())
  @test.assert_eq(ch.code.length(), 1)
  let (operand, advance) = ch.read_operand_i24(0)
  @test.assert_eq(operand, -1)
  @test.assert_eq(advance, 1)
}

///|
test "emit_wide_i32 round-trips Int24 min in narrow form" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, -8388608, loc0())
  @test.assert_eq(ch.code.length(), 1)
  let (operand, advance) = ch.read_operand_i24(0)
  @test.assert_eq(operand, -8388608)
  @test.assert_eq(advance, 1)
}

///|
test "emit_wide_i32 round-trips Int24 max in narrow form" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, 8388607, loc0())
  @test.assert_eq(ch.code.length(), 1)
  let (operand, advance) = ch.read_operand_i24(0)
  @test.assert_eq(operand, 8388607)
  @test.assert_eq(advance, 1)
}

///|
test "emit_wide_i32 promotes to wide for Int24 min - 1" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, -8388609, loc0())
  @test.assert_eq(ch.code.length(), 2)
  let (operand, advance) = ch.read_operand_i24(0)
  @test.assert_eq(operand, -8388609)
  @test.assert_eq(advance, 2)
}

///|
test "emit_wide_i32 promotes to wide for Int24 max + 1" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, 8388608, loc0())
  @test.assert_eq(ch.code.length(), 2)
  let (operand, advance) = ch.read_operand_i24(0)
  @test.assert_eq(operand, 8388608)
  @test.assert_eq(advance, 2)
}

///|
test "emit_wide_i32 round-trips Int.min_value (wide)" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, -2147483648, loc0())
  @test.assert_eq(ch.code.length(), 2)
  let (operand, advance) = ch.read_operand_i24(0)
  @test.assert_eq(operand, -2147483648)
  @test.assert_eq(advance, 2)
}

///|
test "emit_wide_i32 round-trips Int.max_value (wide)" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, 2147483647, loc0())
  @test.assert_eq(ch.code.length(), 2)
  let (operand, advance) = ch.read_operand_i24(0)
  @test.assert_eq(operand, 2147483647)
  @test.assert_eq(advance, 2)
}

// ---------------------------------------------------------------------------
// UpvalueSlotDecl
// ---------------------------------------------------------------------------

///|
test "UpvalueSlotDecl construction and equality" {
  let a = @bytecode.UpvalueSlotDecl::new(Local, 3)
  let b = @bytecode.UpvalueSlotDecl::new(Local, 3)
  let c = @bytecode.UpvalueSlotDecl::new(ParentUpvalue, 3)
  let d = @bytecode.UpvalueSlotDecl::new(Local, 4)
  @test.assert_eq(a, b)
  assert_true(a != c)
  assert_true(a != d)
  @test.assert_eq(a.from_idx, 3)
  match a.from_kind {
    Local => ()
    ParentUpvalue => fail("expected Local")
  }
}

// ---------------------------------------------------------------------------
// patch_jump
// ---------------------------------------------------------------------------

///|
test "patch_jump narrow form rewrites the offset" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  // Emit a narrow-form jump with an initial 0 offset.
  ch.emit_wide_i32(@bytecode.OP_JUMP, 0, loc0())
  // Emit two more instructions to give us a target further ahead.
  ch.emit(@bytecode.OP_NOP, 0, 0, 0, loc0())
  ch.emit(@bytecode.OP_NOP, 0, 0, 0, loc0())
  // Now patch the jump to land on pc=2 (i.e. immediately after itself, +1).
  ch.patch_jump(0, 2)
  let (offset, advance) = ch.read_operand_i24(0)
  @test.assert_eq(advance, 1)
  // offset = target - (at_pc + advance) = 2 - (0 + 1) = 1.
  @test.assert_eq(offset, 1)
}

///|
test "patch_jump narrow form supports negative offsets" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  ch.emit(@bytecode.OP_NOP, 0, 0, 0, loc0())
  ch.emit(@bytecode.OP_NOP, 0, 0, 0, loc0())
  ch.emit_wide_i32(@bytecode.OP_JUMP, 0, loc0())
  // Jump backwards to pc=0.
  ch.patch_jump(2, 0)
  let (offset, advance) = ch.read_operand_i24(2)
  @test.assert_eq(advance, 1)
  // offset = 0 - (2 + 1) = -3.
  @test.assert_eq(offset, -3)
}

///|
test "patch_jump wide form rewrites both instruction words" {
  let ch = @bytecode.Chunk::new("<top>", "eval.js", 0)
  // Force wide by emitting with an operand out of narrow range.
  ch.emit_wide_i32(@bytecode.OP_JUMP, 100000000, loc0())
  @test.assert_eq(ch.code.length(), 2)
  // Patch to a small forward target — even though the offset fits in narrow,
  // we keep the wide slot to preserve the shape of `code`.
  ch.patch_jump(0, 2)
  @test.assert_eq(ch.code.length(), 2)
  let (offset, advance) = ch.read_operand_i24(0)
  @test.assert_eq(advance, 2)
  // offset = 2 - (0 + 2) = 0.
  @test.assert_eq(offset, 0)
}

// ---------------------------------------------------------------------------
// Disassembler
// ---------------------------------------------------------------------------

///|
test "disassemble a small program produces one line per instruction" {
  let ch = @bytecode.Chunk::new("<top>", "test.js", 0)
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, 1, @util.SourceLoc::new(1, 0))
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, 2, @util.SourceLoc::new(1, 4))
  ch.emit(@bytecode.OP_ADD, 0, 0, 0, @util.SourceLoc::new(1, 2))
  ch.emit(@bytecode.OP_RETURN_VAL, 0, 0, 0, @util.SourceLoc::new(1, 0))
  inspect(
    ch.disassemble(),
    content=(
      #|== <top> (test.js) ==
      #|0000: PUSH_I32 1                     ; 1:0
      #|0001: PUSH_I32 2                     ; 1:4
      #|0002: ADD                            ; 1:2
      #|0003: RETURN_VAL                     ; 1:0
      #|
    ),
  )
}

///|
test "disassemble renders a wide-encoded operand as one line" {
  let ch = @bytecode.Chunk::new("<top>", "wide.js", 0)
  // Force wide by giving push_i32 a value too large for narrow.
  ch.emit_wide_i32(@bytecode.OP_PUSH_I32, 100000000, @util.SourceLoc::new(1, 0))
  inspect(
    ch.disassemble(),
    content=(
      #|== <top> (wide.js) ==
      #|0000: PUSH_I32 (wide) 100000000      ; 1:0
      #|
    ),
  )
}

///|
test "disassemble renders unknown opcodes as <op:0xNN>" {
  let ch = @bytecode.Chunk::new("<top>", "unk.js", 0)
  // 0x7B is not assigned in M1; ensure the fallback renders it hex-ish.
  ch.emit(0x7B, 0, 0, 0, loc0())
  let s = ch.disassemble()
  // We don't lock in the exact hex casing, just presence of the fallback.
  assert_true(s.contains("<op:0x"))
}

// ---------------------------------------------------------------------------
// Opcode name coverage sample
// ---------------------------------------------------------------------------

///|
test "opcode_name maps known opcodes to their string form" {
  @test.assert_eq(@bytecode.opcode_name(@bytecode.OP_NOP), "NOP")
  @test.assert_eq(@bytecode.opcode_name(@bytecode.OP_PUSH_UNDEF), "PUSH_UNDEF")
  @test.assert_eq(@bytecode.opcode_name(@bytecode.OP_INSTANCEOF), "INSTANCEOF")
  @test.assert_eq(@bytecode.opcode_name(@bytecode.OP_RETURN_VAL), "RETURN_VAL")
  @test.assert_eq(@bytecode.opcode_name(@bytecode.OP_WIDE), "WIDE")
}

///|
test "opcode_name falls back for unknown opcodes" {
  // 0x80 is reserved for post-M1 milestones.
  let name = @bytecode.opcode_name((0x80 : Byte))
  assert_true(name.contains("<op:0x"))
}
