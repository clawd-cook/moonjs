---
description: 32-bit 定长字节码格式、wide 前缀承载 32-bit operand、M1 opcode 表。
---

# 字节码

## 指令布局

MoonJS 每条指令是 `Chunk.code` 中的一条 32-bit `UInt`：

```
bits 0..7   opcode
bits 8..15  operand A
bits 16..23 operand B
bits 24..31 operand C
```

`encode(op, a, b, c) -> UInt` 与 `decode(word) -> DecodedInstr` 无损 round-trip。

## Wide 前缀

需要 >24 bit 的 operand（大的 constant-pool 索引、跨越很远的 jump、`push_i32` 超出 ±8_388_607）用两条 word 发射：

```
[OP_WIDE | W_HI | W_MID | W_LO]
[op      | LO8  | 0     | 0    ]
```

`W_HI:W_MID:W_LO` 提供高 24 位；下一条 word 的 operand A 提供低 8 位。合起来：完整 32-bit unsigned（或者 `_i24` 读取时 sign-extended 的 signed）整数。

`Chunk::emit_wide_u32` / `emit_wide_i32` 挑选可容纳的最窄形式；VM reader `read_operand_u24` / `read_operand_i24` 解两种情况，返回 `(operand, pc_advance)`。

## 常量池

`Chunk.const_pool: Array[JSValue]` 存字符串常量、不能内联的数字、以及被 `OP_PUSH_CONST idx` 引用的任意运行时常量。`Chunk::add_const(v)` 通过 `JSValue::==` 去重（`Object` 走 physical equality，基本类型走 structural）。

## 源码位置

`Chunk.source_locs: Array[SourceLoc]` 与 `code` 并行；`source_locs[pc]` 是产生 `code[pc]` 的源码位置。分开存储便于 release 构建后 drop 掉整个 debug 表。

## M1 opcode 表

编号与 design.md §4.3 逐字对应。新增 opcode 使用未占用编号；重编号已有 opcode 违反跨里程碑契约。

```
0x00-0x0A push/stack:     NOP, PUSH_UNDEF, PUSH_NULL, PUSH_TRUE, PUSH_FALSE,
                          PUSH_I32, PUSH_CONST, DUP, DROP, SWAP, POP
0x10-0x18 variables:      GET_LOCAL, SET_LOCAL, GET_UPVALUE, SET_UPVALUE,
                          GET_GLOBAL, SET_GLOBAL, DECLARE_GLOBAL,
                          GET_GLOBAL_OR_UNDEF (0x17 — typeof 用),
                          GET_THIS (0x18 — 读 Frame.this_val)
0x19      TO_NUMBER       (一元 + 强转；与 0 + x 不同)
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

完整名字、语义、栈效应见源码（`src/bytecode/opcode.mbt`），disassembler 用到的 `opcode_name` helper 一一对应。

## Disassembler

`Chunk::disassemble()` 输出可读的反汇编，用于调试与测试：

```
0000: PUSH_I32 1                    ; 1:1
0001: PUSH_I32 2                    ; 1:5
0002: ADD                           ; 1:3
0003: RETURN_VAL                    ; 1:1
```

Wide pair 输出为一行，带 `(wide)` 标签。
