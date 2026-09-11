---
description: MoonJS 的 package 布局 —— `src/` 下的十个 package 及编译/运行时管道如何贯穿它们。
---

# 架构概览

MoonJS 组织为 `src/` 下的十个 MoonBit package，每个职责单一。每个 package 都有独立 `moon.pkg` 与 blackbox 测试。

## Package 一览

| Package | 负责 | 依赖 |
|---|---|---|
| `src/util` | `SourceLoc`、`SourceSpan`、`Interner` | — |
| `src/value` | `JSValue`、`Object`、`Shape`、`PropMeta`、`Function`、`NativeFunction`、异常类型 | `util` |
| `src/ast` | 完整 ES2023+ AST 节点 | `util` |
| `src/bytecode` | `Chunk`、opcode 集、32-bit 编码、wide 前缀、disassembler | `util`、`value` |
| `src/lexer` | `Token`、上下文相关的 ES2023+ tokenizer（regex / template） | `util` |
| `src/parser` | Pratt 表达式 + 语句 parser → AST | `util`、`ast`、`lexer` |
| `src/compiler` | AST → Bytecode、scope 与 upvalue 分析、hoisting | `util`、`ast`、`bytecode`、`value` |
| `src/vm` | 主循环、`Frame`、基本类型语义、异常展开、call/return | `util`、`value`、`bytecode`、`parser`、`compiler`、`builtins` |
| `src/builtins` | `Object` / `Error` 家族 / `String` 骨架 + 原型链 | `value` |
| 顶层 `moonjs.mbt` | 公共 re-export（`Engine`、`eval_script`、`JSValue`、`JSException`） | `value`、`vm` |

## 边界与契约

跨里程碑必须遵守的不变量（由类型系统强制）：

- **`JSValue` variant 仅增不减。** `pub(all) enum JSValue` 意味着新增 variant 是 breaking change；类型系统会提示所有 `match` 站点在同一次提交里更新。
- **字节码编码固定：** `[op:8][A:8][B:8][C:8]`，opcode 编号锁定。新增 opcode 使用未占用编号（Step 7 加了 0x17 / 0x18 / 0x19）。
- **`SourceLoc` 形状稳定** 为 `{ line: UInt16, col: UInt16 }`（都 1-based）。
- **`Chunk` 字段不可重命名。** 增加字段（如给命名函数表达式用的 `self_binding_slot`）允许。
- **`PropMeta.attrs` 保留 bit 3 用于 accessor property**（M3 钩子）。

## 测试基础设施

每个 package 都有一个 blackbox 测试文件（`*_test.mbt`）。M1 验收 harness 在 `src/vm/harness_test.mbt`，把 QuickJS fixture 源码作为 MoonBit raw string 内嵌 —— MoonBit `moonbitlang/core` 没有 `fs`，而 MoonJS 是纯 MoonBit（无 C FFI），所以 fixture 内容烘焙到测试文件里而非从磁盘读取。

## `src/` 之外

- `cmd/moonjs/` —— 包装 `Engine::eval_script` 的 CLI。目前是 smoke test；M5 交付完整能力。
- `cmd/moonjs-test262/` —— test262 驱动骨架。M6 开始实现。
- `quickjs/` —— vendored QuickJS 参考。用于 opcode 设计与测试源；不复制代码。
- `.trellis/` —— 任务树、PRD、设计文档、跨包 spec / quality-guidelines。
