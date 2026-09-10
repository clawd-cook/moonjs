// Chunk disassembler: renders a chunk's `code` array as human-readable text.
// Used for debug logging, snapshot tests, and by developers running the CLI
// with `--dump-bytecode`.
//
// Format: one instruction per (logical) line
//   `NNNN: OPNAME [operand]   ; line:col`
// Wide-encoded pairs render as one logical line whose operand shows the merged
// 32-bit value. Unknown opcodes appear as `<op:0xNN>`.

///|
/// Instructions carrying an unsigned operand (constant-pool index, local slot
/// index, etc.). Determines whether the disassembler expects an operand.
fn is_unsigned_operand_op(op : Byte) -> Bool {
  op == OP_PUSH_CONST ||
  op == OP_GET_LOCAL ||
  op == OP_SET_LOCAL ||
  op == OP_GET_UPVALUE ||
  op == OP_SET_UPVALUE ||
  op == OP_GET_GLOBAL ||
  op == OP_SET_GLOBAL ||
  op == OP_DECLARE_GLOBAL ||
  op == OP_GET_GLOBAL_OR_UNDEF ||
  op == OP_DEFINE_PROP ||
  op == OP_GET_PROP ||
  op == OP_SET_PROP ||
  op == OP_DELETE_PROP ||
  op == OP_NEW_ARRAY ||
  op == OP_NEW_CLOSURE ||
  op == OP_CALL ||
  op == OP_CALL_METHOD ||
  op == OP_CONSTRUCT ||
  op == OP_ENTER_TRY
}

///|
/// Instructions carrying a signed operand (inline i32 literal, jump offsets).
fn is_signed_operand_op(op : Byte) -> Bool {
  op == OP_PUSH_I32 ||
  op == OP_JUMP ||
  op == OP_JUMP_IF_TRUE ||
  op == OP_JUMP_IF_FALSE
}

///|
/// Pad `s` on the right with spaces up to `width` for aligned column output.
/// Used to keep opcode name + operand columns lined up in the disassembly.
fn pad_right(s : String, width : Int) -> String {
  if s.length() >= width {
    s
  } else {
    let sb = StringBuilder::StringBuilder(size_hint=width)
    sb.write_string(s)
    for _ in 0..<(width - s.length()) {
      sb.write_char(' ')
    }
    sb.to_string()
  }
}

///|
/// Left-pad `n` with zeros to width `width`. Used for the PC column so a
/// chunk of any size renders with fixed-width offsets.
fn pad_pc(n : Int, width : Int) -> String {
  let s = n.to_string()
  if s.length() >= width {
    s
  } else {
    let sb = StringBuilder::StringBuilder(size_hint=width)
    for _ in 0..<(width - s.length()) {
      sb.write_char('0')
    }
    sb.write_string(s)
    sb.to_string()
  }
}

///|
/// Human-readable disassembly of the chunk. One line per logical instruction
/// (a wide-encoded operand still renders as a single line). Trailing newline
/// is included so appending disassembler output to a growing log is clean.
///
/// This is a debug helper, not a stability contract — the exact spacing and
/// column widths may change to accommodate longer opcode names in later
/// milestones. Snapshot tests should be updated when the format shifts.
pub fn Chunk::disassemble(self : Chunk) -> String {
  let sb = StringBuilder::StringBuilder(size_hint=self.code.length() * 32)
  // First line: chunk header — name and filename for context.
  sb.write_string("== ")
  sb.write_string(self.name)
  sb.write_string(" (")
  sb.write_string(self.filename)
  sb.write_string(") ==\n")
  let mut pc = 0
  while pc < self.code.length() {
    let decoded = decode(self.code[pc])
    let display_pc = pc
    let name = opcode_name(decoded.op)
    // Compute operand + advance for opcodes that carry one; also detect wide.
    let (operand_str, advance) = if decoded.op == OP_WIDE {
      // Wide always precedes an operand-bearing opcode. Read via the same
      // helper that the VM uses so the two views stay in sync.
      if pc + 1 >= self.code.length() {
        // Malformed: dangling wide. Render it as a bare WIDE line.
        ("", 1)
      } else {
        let follow_op = decode(self.code[pc + 1]).op
        if is_signed_operand_op(follow_op) {
          let (v, adv) = self.read_operand_i24(pc)
          (v.to_string(), adv)
        } else {
          let (v, adv) = self.read_operand_u24(pc)
          (v.to_string(), adv)
        }
      }
    } else if is_signed_operand_op(decoded.op) {
      let (v, adv) = self.read_operand_i24(pc)
      (v.to_string(), adv)
    } else if is_unsigned_operand_op(decoded.op) {
      let (v, adv) = self.read_operand_u24(pc)
      (v.to_string(), adv)
    } else {
      ("", 1)
    }

    // When wide, the *logical* opcode name comes from the following op.
    let logical_name = if decoded.op == OP_WIDE && pc + 1 < self.code.length() {
      opcode_name(decode(self.code[pc + 1]).op) + " (wide)"
    } else {
      name
    }
    let loc = self.source_locs[pc]
    sb.write_string(pad_pc(display_pc, 4))
    sb.write_string(": ")
    // Opcode name column: 30 chars accommodates "JUMP_IF_FALSE (wide)" plus a
    // multi-digit operand while leaving a couple of spaces before the `; loc`.
    let op_col = if operand_str == "" {
      logical_name
    } else {
      logical_name + " " + operand_str
    }
    sb.write_string(pad_right(op_col, 30))
    sb.write_string(" ; ")
    sb.write_string(loc.line.to_int().to_string())
    sb.write_string(":")
    sb.write_string(loc.col.to_int().to_string())
    sb.write_string("\n")
    pc = pc + advance
  }
  sb.to_string()
}
