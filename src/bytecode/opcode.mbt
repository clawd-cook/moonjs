// Opcode constants and human-readable names for M1's bytecode instruction set.
//
// Design constraints (see design.md §4.3):
//
// - Encoding: each instruction is a 32-bit `UInt`, laid out
//   `[opcode:8 | A:8 | B:8 | C:8]` (little-endian byte view when serialised).
// - Numbering: M1 occupies `0x00..0x7F`. Later milestones append to `0x80..`
//   and MUST NOT reuse an M1 opcode number.
// - Wide prefix (`OP_WIDE = 0xFE`): signals "the next instruction's operand A
//   is actually 24 bits, formed by concatenating THIS instruction's A/B/C
//   with the next instruction's A byte". Convention documented in
//   `chunk.mbt` where the emit helpers live.
//
// The `opcode_name` helper below drives the disassembler (see
// `disassemble.mbt`). Adding a new opcode requires:
//   1. A new `OP_*` constant here with a comment linking to design.md §4.3.
//   2. A match arm in `opcode_name`.
//   3. A case in `Chunk::disassemble`'s operand printer if the operand shape
//      differs from an existing entry.

// ---------------------------------------------------------------------------
// 0x00-0x0F: push / stack
// ---------------------------------------------------------------------------

///|
/// No-op. Handy as a padding instruction for jump patching that later needs to
/// be widened; the compiler occasionally emits `nop`s to reserve wide slots.
pub const OP_NOP : Byte = 0x00

///|
pub const OP_PUSH_UNDEF : Byte = 0x01

///|
pub const OP_PUSH_NULL : Byte = 0x02

///|
pub const OP_PUSH_TRUE : Byte = 0x03

///|
pub const OP_PUSH_FALSE : Byte = 0x04

///|
/// Push a 32-bit signed integer. Operand encoding:
///   `push_i32 hi mid lo` — a 24-bit signed value (fits in one instruction).
///   `wide W_HI W_MID W_LO; push_i32 LOW8 0 0` — 32-bit signed (two-instr).
/// See `Chunk::emit_wide_i32` / `Chunk::read_operand_i24`.
pub const OP_PUSH_I32 : Byte = 0x05

///|
/// Push a value from the chunk's constant pool. Operand = const pool index.
pub const OP_PUSH_CONST : Byte = 0x06

///|
pub const OP_DUP : Byte = 0x07

///|
pub const OP_DROP : Byte = 0x08

///|
pub const OP_SWAP : Byte = 0x09

///|
/// Alias of `drop`, kept for QuickJS-name compatibility in the disassembler.
pub const OP_POP : Byte = 0x0A

// ---------------------------------------------------------------------------
// 0x10-0x1F: variable access
// ---------------------------------------------------------------------------

///|
pub const OP_GET_LOCAL : Byte = 0x10

///|
pub const OP_SET_LOCAL : Byte = 0x11

///|
pub const OP_GET_UPVALUE : Byte = 0x12

///|
pub const OP_SET_UPVALUE : Byte = 0x13

///|
pub const OP_GET_GLOBAL : Byte = 0x14

///|
pub const OP_SET_GLOBAL : Byte = 0x15

///|
pub const OP_DECLARE_GLOBAL : Byte = 0x16

///|
/// Push the global's value if it exists, or `Undefined` if it does not.
///
/// Distinct from `OP_GET_GLOBAL`, which throws `ReferenceError` on a miss. The
/// compiler emits `OP_GET_GLOBAL_OR_UNDEF` for `typeof foo` and related
/// side-effect-free reads that must succeed with `undefined` for
/// never-declared identifiers per ES semantics (`typeof undeclared === "undefined"`
/// must not throw). Introduced in M1 Step 7; see design.md §4.3 (0x17
/// allocation) and Step 7 notes on `typeof` emission.
pub const OP_GET_GLOBAL_OR_UNDEF : Byte = 0x17

///|
/// Push the current frame's `this` value. Introduced alongside
/// `OP_GET_GLOBAL_OR_UNDEF` (M1 Step 7) so the compiler doesn't have to encode
/// `this` as a local slot — VM Step 8 stores `this` in a dedicated
/// `Frame.this_val` field per design.md §8.1.
pub const OP_GET_THIS : Byte = 0x18

///|
/// Coerce the top-of-stack value to a JS Number (per `ToNumber` in ES spec).
/// Emitted by the compiler for unary `+x` — where `x` might be any JS value
/// including a String (in which case JS `+` on strings concatenates, so we
/// cannot lower `+x` to `0 + x`; that would produce `"0" + "5" = "05"`
/// instead of `5`). Introduced in M1 Step 7 fix; see design.md §4.3.
pub const OP_TO_NUMBER : Byte = 0x19

// ---------------------------------------------------------------------------
// 0x20-0x2F: arithmetic & bitwise
// ---------------------------------------------------------------------------

///|
pub const OP_ADD : Byte = 0x20

///|
pub const OP_SUB : Byte = 0x21

///|
pub const OP_MUL : Byte = 0x22

///|
pub const OP_DIV : Byte = 0x23

///|
pub const OP_MOD : Byte = 0x24

///|
pub const OP_POW : Byte = 0x25

///|
pub const OP_NEG : Byte = 0x26

///|
pub const OP_BNOT : Byte = 0x27

///|
pub const OP_BAND : Byte = 0x28

///|
pub const OP_BOR : Byte = 0x29

///|
pub const OP_BXOR : Byte = 0x2A

///|
pub const OP_SHL : Byte = 0x2B

///|
pub const OP_SHR : Byte = 0x2C

///|
pub const OP_USHR : Byte = 0x2D

///|
pub const OP_EQ : Byte = 0x2E

///|
pub const OP_NE : Byte = 0x2F

// ---------------------------------------------------------------------------
// 0x30-0x3F: comparison / logical / type
// ---------------------------------------------------------------------------

///|
pub const OP_SEQ : Byte = 0x30

///|
pub const OP_SNE : Byte = 0x31

///|
pub const OP_LT : Byte = 0x32

///|
pub const OP_LE : Byte = 0x33

///|
pub const OP_GT : Byte = 0x34

///|
pub const OP_GE : Byte = 0x35

///|
pub const OP_NOT : Byte = 0x36

///|
pub const OP_TYPEOF : Byte = 0x37

///|
pub const OP_INSTANCEOF : Byte = 0x38

///|
pub const OP_IN : Byte = 0x39

// ---------------------------------------------------------------------------
// 0x40-0x4F: objects & arrays
// ---------------------------------------------------------------------------

///|
pub const OP_NEW_OBJECT : Byte = 0x40

///|
pub const OP_DEFINE_PROP : Byte = 0x41

///|
pub const OP_GET_PROP : Byte = 0x42

///|
pub const OP_SET_PROP : Byte = 0x43

///|
pub const OP_GET_ELEM : Byte = 0x44

///|
pub const OP_SET_ELEM : Byte = 0x45

///|
pub const OP_DELETE_PROP : Byte = 0x46

///|
pub const OP_DELETE_ELEM : Byte = 0x47

///|
pub const OP_NEW_ARRAY : Byte = 0x48

///|
pub const OP_ARRAY_PUSH : Byte = 0x49

// ---------------------------------------------------------------------------
// 0x50-0x5F: function / call / return
// ---------------------------------------------------------------------------

///|
pub const OP_NEW_CLOSURE : Byte = 0x50

///|
pub const OP_CALL : Byte = 0x51

///|
pub const OP_CALL_METHOD : Byte = 0x52

///|
pub const OP_CONSTRUCT : Byte = 0x53

///|
pub const OP_RETURN_VAL : Byte = 0x54

///|
pub const OP_RETURN_UNDEF : Byte = 0x55

// ---------------------------------------------------------------------------
// 0x60-0x6F: control flow
// ---------------------------------------------------------------------------

///|
pub const OP_JUMP : Byte = 0x60

///|
pub const OP_JUMP_IF_TRUE : Byte = 0x61

///|
pub const OP_JUMP_IF_FALSE : Byte = 0x62

// ---------------------------------------------------------------------------
// 0x70-0x7F: exception
// ---------------------------------------------------------------------------

///|
pub const OP_THROW : Byte = 0x70

///|
pub const OP_ENTER_TRY : Byte = 0x71

///|
pub const OP_LEAVE_TRY : Byte = 0x72

// ---------------------------------------------------------------------------
// prefix / meta
// ---------------------------------------------------------------------------

///|
/// Prefix opcode used to widen the operand of the following instruction to a
/// full 32-bit value. See `chunk.mbt` for the exact convention.
pub const OP_WIDE : Byte = 0xFE

///|
/// Reserved terminator opcode. Never emitted by the M1 compiler; useful as a
/// sentinel in tests to check "we ran past the end of the code array".
pub const OP_HALT : Byte = 0xFF

///|
/// Human-readable name of an opcode, used by the disassembler. Unknown /
/// reserved opcodes render as `<op:0xNN>`.
///
/// New opcodes must be added here manually — an if-chain has no compile-time
/// exhaustiveness check, so the disassembler tests in `bytecode_test.mbt`
/// double as a coverage tripwire when adding a new constant.
pub fn opcode_name(op : Byte) -> String {
  if op == OP_NOP {
    "NOP"
  } else if op == OP_PUSH_UNDEF {
    "PUSH_UNDEF"
  } else if op == OP_PUSH_NULL {
    "PUSH_NULL"
  } else if op == OP_PUSH_TRUE {
    "PUSH_TRUE"
  } else if op == OP_PUSH_FALSE {
    "PUSH_FALSE"
  } else if op == OP_PUSH_I32 {
    "PUSH_I32"
  } else if op == OP_PUSH_CONST {
    "PUSH_CONST"
  } else if op == OP_DUP {
    "DUP"
  } else if op == OP_DROP {
    "DROP"
  } else if op == OP_SWAP {
    "SWAP"
  } else if op == OP_POP {
    "POP"
  } else if op == OP_GET_LOCAL {
    "GET_LOCAL"
  } else if op == OP_SET_LOCAL {
    "SET_LOCAL"
  } else if op == OP_GET_UPVALUE {
    "GET_UPVALUE"
  } else if op == OP_SET_UPVALUE {
    "SET_UPVALUE"
  } else if op == OP_GET_GLOBAL {
    "GET_GLOBAL"
  } else if op == OP_SET_GLOBAL {
    "SET_GLOBAL"
  } else if op == OP_DECLARE_GLOBAL {
    "DECLARE_GLOBAL"
  } else if op == OP_GET_GLOBAL_OR_UNDEF {
    "GET_GLOBAL_OR_UNDEF"
  } else if op == OP_GET_THIS {
    "GET_THIS"
  } else if op == OP_TO_NUMBER {
    "TO_NUMBER"
  } else if op == OP_ADD {
    "ADD"
  } else if op == OP_SUB {
    "SUB"
  } else if op == OP_MUL {
    "MUL"
  } else if op == OP_DIV {
    "DIV"
  } else if op == OP_MOD {
    "MOD"
  } else if op == OP_POW {
    "POW"
  } else if op == OP_NEG {
    "NEG"
  } else if op == OP_BNOT {
    "BNOT"
  } else if op == OP_BAND {
    "BAND"
  } else if op == OP_BOR {
    "BOR"
  } else if op == OP_BXOR {
    "BXOR"
  } else if op == OP_SHL {
    "SHL"
  } else if op == OP_SHR {
    "SHR"
  } else if op == OP_USHR {
    "USHR"
  } else if op == OP_EQ {
    "EQ"
  } else if op == OP_NE {
    "NE"
  } else if op == OP_SEQ {
    "SEQ"
  } else if op == OP_SNE {
    "SNE"
  } else if op == OP_LT {
    "LT"
  } else if op == OP_LE {
    "LE"
  } else if op == OP_GT {
    "GT"
  } else if op == OP_GE {
    "GE"
  } else if op == OP_NOT {
    "NOT"
  } else if op == OP_TYPEOF {
    "TYPEOF"
  } else if op == OP_INSTANCEOF {
    "INSTANCEOF"
  } else if op == OP_IN {
    "IN"
  } else if op == OP_NEW_OBJECT {
    "NEW_OBJECT"
  } else if op == OP_DEFINE_PROP {
    "DEFINE_PROP"
  } else if op == OP_GET_PROP {
    "GET_PROP"
  } else if op == OP_SET_PROP {
    "SET_PROP"
  } else if op == OP_GET_ELEM {
    "GET_ELEM"
  } else if op == OP_SET_ELEM {
    "SET_ELEM"
  } else if op == OP_DELETE_PROP {
    "DELETE_PROP"
  } else if op == OP_DELETE_ELEM {
    "DELETE_ELEM"
  } else if op == OP_NEW_ARRAY {
    "NEW_ARRAY"
  } else if op == OP_ARRAY_PUSH {
    "ARRAY_PUSH"
  } else if op == OP_NEW_CLOSURE {
    "NEW_CLOSURE"
  } else if op == OP_CALL {
    "CALL"
  } else if op == OP_CALL_METHOD {
    "CALL_METHOD"
  } else if op == OP_CONSTRUCT {
    "CONSTRUCT"
  } else if op == OP_RETURN_VAL {
    "RETURN_VAL"
  } else if op == OP_RETURN_UNDEF {
    "RETURN_UNDEF"
  } else if op == OP_JUMP {
    "JUMP"
  } else if op == OP_JUMP_IF_TRUE {
    "JUMP_IF_TRUE"
  } else if op == OP_JUMP_IF_FALSE {
    "JUMP_IF_FALSE"
  } else if op == OP_THROW {
    "THROW"
  } else if op == OP_ENTER_TRY {
    "ENTER_TRY"
  } else if op == OP_LEAVE_TRY {
    "LEAVE_TRY"
  } else if op == OP_WIDE {
    "WIDE"
  } else if op == OP_HALT {
    "HALT"
  } else {
    "<op:0x" + op.to_hex() + ">"
  }
}
