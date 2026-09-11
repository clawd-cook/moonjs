---
description: MoonJS 的六个里程碑 —— 范围、覆盖目标、当前状态。
---

# 里程碑

MoonJS 规划为六个里程碑，从最简字节码 VM（M1）走到 TC39 `test262` ≥ 95% 通过率（M6）。每个里程碑都有对应 QuickJS 测试语料的具体验收标准。

| # | 名称 | 范围 | 覆盖目标 | 状态 |
|---|------|------|----------|------|
| **M1** | Core VM | 词法 / 语法 / 字节码 / VM / 基本类型 / 控制流 / 闭包 / try-catch | `test_language.js` 算术 + 控制流子集，`test_closure1..3` | **完成 —— 13/13 AC 通过，411 tests 绿** |
| M2 | Language Complete | class / arrow / destructuring / spread / template / for-of / iterator / generator / `with` / `?.` / `??` / `using` | `test_language.js` + `test_closure.js` + `test_loop.js` 100% | 规划中 |
| M3 | Core Builtins | Object / Array / Function / String / Number / Boolean / Math / JSON / Date / Error / Symbol / Map / Set / Weak* / Proxy / Reflect | `test_builtin.js` 非 regexp / 非 typedarray 分节 100% | 规划中 |
| M4 | Advanced Runtime | Promise + microtask / async-await / TypedArray / BigInt / RegExp / Unicode | `test_bigint.js`、`test_builtin.js` regexp / typedarray 分节、`test_queue_microtask.js`、相关 bug 用例 | 规划中 |
| M5 | Modules + CLI | ES Modules / `qjs:std` / `qjs:os` / `cmd/moonjs` 完整 argv | `test_std.js` 100% + `quickjs/tests/*.js` 在 `tests.conf` exclude 之外的全部用例 | 规划中 |
| M6 | test262 | `cmd/moonjs-test262` + 通过率冲刺 | 在 `test262-fast.conf` @ commit `5ef1e572` 上 ≥ 95% | 规划中 |

## M1 "完成" 的定义

M1 验收以下 7 个 QuickJS 测试函数能通过 `Engine::eval_script` 端到端运行：

- `test_op1` —— 算术、位运算、比较、幂（`**`）、字符串比较。
- `test_op2` —— `new`、`in`、`instanceof`、`typeof`、保留字属性键。
- `test_cvt` —— `|0`、`>>>0`、字符串的 `ToNumber`、大数字 `toString`。
- `test_inc_dec` —— 前后缀 `++/--` 应用于标识符、成员访问、索引访问。
- `test_closure1` —— 嵌套 set/get 返回带 getter/setter 的对象。
- `test_closure2` —— 命名函数表达式自递归（`function fact(n) { ... fact(n-1) ... }`）。
- `test_closure3` —— 递归 `fib`，含 function-declaration 与命名 FnExpr 两种形式。

加上顶层 `test_closure1(); test_closure2(); test_closure3();` 序列、parser `SyntaxError` 与运行时 `ReferenceError` 的精确 `line:col`，构成 13 项验收清单。当前 tree 全部通过。

## 跨里程碑契约

以下由类型系统冻结，后续里程碑扩展时不得违反：

- `JSValue` variant —— 仅增不减（由 `pub(all) enum` 强制）。
- 字节码编码 —— `[op:8][A:8][B:8][C:8]`。
- Opcode 编号 —— 新增使用未占用编号。
- `SourceLoc` 形状 —— `{ line: UInt16, col: UInt16 }`，1-based。
- `Chunk` —— 允许追加字段，禁止重命名。
- `PropMeta.attrs` —— bit 3 为 M3 accessor property 保留。
