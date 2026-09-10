// Instruction encoding: pack / unpack a 32-bit instruction word.
//
// M1 uses a single-width instruction format: every instruction is a `UInt`
// with four byte-sized fields:
//
//   bits  0..7   opcode
//   bits  8..15  operand A
//   bits 16..23  operand B
//   bits 24..31  operand C
//
// Callers should treat the layout as opaque and go through `encode` / `decode`.
// The wide-prefix convention that spans two instruction words is handled
// higher up in `chunk.mbt`; this file deals only with a single word.

///|
/// Decoded view of a single instruction word. Field names match the encoding
/// documented at the top of this file.
pub struct DecodedInstr {
  op : Byte
  a : Byte
  b : Byte
  c : Byte
} derive(Eq, @debug.Debug)

///|
/// Pack four bytes into an instruction word. Round-trips with `decode`.
pub fn encode(op : Byte, a : Byte, b : Byte, c : Byte) -> UInt {
  let op_u = op.to_uint()
  let a_u = a.to_uint() << 8
  let b_u = b.to_uint() << 16
  let c_u = c.to_uint() << 24
  op_u | a_u | b_u | c_u
}

///|
/// Unpack an instruction word into `(op, a, b, c)`.
pub fn decode(word : UInt) -> DecodedInstr {
  {
    op: (word & 0xFFU).to_byte(),
    a: ((word >> 8) & 0xFFU).to_byte(),
    b: ((word >> 16) & 0xFFU).to_byte(),
    c: ((word >> 24) & 0xFFU).to_byte(),
  }
}
