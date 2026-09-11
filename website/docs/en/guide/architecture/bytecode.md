---
description: 32-bit fixed-length bytecode format, wide prefix for 32-bit operands, and the M1 opcode table.
---

# Bytecode

## Instruction layout

Each MoonJS instruction is a single 32-bit `UInt` in `Chunk.code`:

```
bits 0..7   opcode
bits 8..15  operand A
bits 16..23 operand B
bits 24..31 operand C
```

`encode(op, a, b, c) -> UInt` and `decode(word) -> DecodedInstr` round-trip losslessly.

## Wide prefix

An operand that needs more than 24 bits (large constant-pool index, deep jump offset, or `push_i32` beyond ±8_388_607) is emitted as two words:

```
[OP_WIDE | W_HI | W_MID | W_LO]
[op      | LO8  | 0     | 0    ]
```

`W_HI:W_MID:W_LO` supplies the high 24 bits; the next word's operand A gives the low 8. Result: a full 32-bit unsigned or (sign-extended for `_i24` reads) signed integer.

`Chunk::emit_wide_u32` and `Chunk::emit_wide_i32` pick the narrowest form that fits; VM readers `read_operand_u24` / `read_operand_i24` decode both cases and return `(operand, pc_advance)`.

## Constant pool

`Chunk.const_pool: Array[JSValue]` holds string constants, non-fitting number literals, and any other run-time constant referenced by `OP_PUSH_CONST idx` or friends. `Chunk::add_const(v)` dedups via `JSValue::==` (physical equality for `Object`, structural for primitives).

## Source locations

`Chunk.source_locs: Array[SourceLoc]` runs parallel to `code`; `source_locs[pc]` is the source location that produced `code[pc]`. Kept separate so a future release build can drop it with a single array reset.

## M1 opcode table

Numbering matches design.md §4.3 verbatim. New opcodes go in unused slots; renumbering existing opcodes is a breaking cross-milestone contract violation.

```
0x00-0x0A push/stack:     NOP, PUSH_UNDEF, PUSH_NULL, PUSH_TRUE, PUSH_FALSE,
                          PUSH_I32, PUSH_CONST, DUP, DROP, SWAP, POP
0x10-0x18 variables:      GET_LOCAL, SET_LOCAL, GET_UPVALUE, SET_UPVALUE,
                          GET_GLOBAL, SET_GLOBAL, DECLARE_GLOBAL,
                          GET_GLOBAL_OR_UNDEF (0x17 — for typeof),
                          GET_THIS (0x18 — reads Frame.this_val)
0x19      TO_NUMBER       (unary + coercion; distinct from 0 + x)
0x20-0x27 arithmetic:     ADD, SUB, MUL, DIV, MOD, POW, NEG, BNOT
0x28-0x2D bitwise:        BAND, BOR, BXOR, SHL, SHR, USHR
0x2E-0x35 comparison:     EQ, NE, SEQ, SNE, LT, LE, GT, GE
0x36-0x39 logical/type:   NOT, TYPEOF, INSTANCEOF, IN
0x40-0x49 object/array:   NEW_OBJECT, DEFINE_PROP, GET_PROP, SET_PROP,
                          GET_ELEM, SET_ELEM, DELETE_PROP, DELETE_ELEM,
                          NEW_ARRAY, ARRAY_PUSH
0x50-0x55 call/return:    NEW_CLOSURE, CALL, CALL_METHOD, CONSTRUCT,
                          RETURN_VAL, RETURN_UNDEF
0x60-0x62 control flow:   JUMP, JUMP_IF_TRUE, JUMP_IF_FALSE
0x70-0x72 exception:      THROW, ENTER_TRY, LEAVE_TRY
0xFE      WIDE (prefix)
0xFF      HALT (reserved)
```

Full names, semantics, and stack effects are documented in the source (`src/bytecode/opcode.mbt`) and mirrored in the `opcode_name` helper the disassembler uses.

## Disassembler

`Chunk::disassemble()` produces a human-readable listing for debugging and tests:

```
0000: PUSH_I32 1                    ; 1:1
0001: PUSH_I32 2                    ; 1:5
0002: ADD                           ; 1:3
0003: RETURN_VAL                    ; 1:1
```

Wide pairs render as one logical line labeled `(wide)`.
