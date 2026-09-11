# moonjs

一个用纯 MoonBit 实现的 JavaScript 引擎。

目标：跑通 vendored 的 [`quickjs/`](./quickjs/) 目录下的全部测试用例——包括 `quickjs/tests/*.js` 以及 QuickJS 所固定 (pin) 的 TC39 `test262` 测试套件。

> English version: [README.md](./README.md) (rendered from `README.mbt.md`)

## 状态

由 Trellis 任务 `moonjs-js-engine` 管理。各里程碑进度：

| 里程碑 | 范围 | 状态 | 覆盖目标 |
|---|---|---|---|
| M1 Core VM | 词法 / 语法 / 字节码 / VM / 基本类型 / 控制流 / 闭包 / try-catch | **已完成 (411 tests)** | `test_language.js` 算术+控制流子集，`test_closure1..3` —— 13/13 AC pass |
| M2 Language Complete | class / arrow / destructuring / spread / template / for-of / iterator / generator / with / `?.` / `??` / `using` | 规划中 | `test_language.js` + `test_closure.js` + `test_loop.js` 100% |
| M3 Core Builtins | Object / Array / Function / String / Number / Boolean / Math / JSON / Date / Error / Symbol / Map / Set / Weak* / Proxy / Reflect | 规划中 | `test_builtin.js` 非 regexp / 非 typedarray 分节 100% |
| M4 Advanced Runtime | Promise + microtask / async-await / TypedArray / BigInt / RegExp / Unicode | 规划中 | `test_bigint.js`、`test_builtin.js` 的 regexp / typedarray 分节、`test_queue_microtask.js`、相关 bug 用例 |
| M5 Modules + CLI | ES Modules / `qjs:std` / `qjs:os` / `cmd/moonjs` | 规划中 | `test_std.js` 100% + `quickjs/tests/*.js` 在 `tests.conf` exclude 之外的全部用例 |
| M6 test262 | `cmd/moonjs-test262` + 通过率冲刺 | 规划中 | 在 `test262-fast.conf` @ commit `5ef1e572` 上 ≥ 95% |

## 目录布局

```
src/                 - 引擎 (lexer / parser / ast / bytecode / compiler / vm / value / builtins / regexp / unicode / bigint / promise / modules / util)
cmd/moonjs/          - CLI (对标 `qjs`)
cmd/moonjs-test262/  - test262 驱动 (对标 `run-test262`)
quickjs/             - vendored QuickJS，作为参考实现与测试来源
.trellis/            - Trellis 任务树；见 .trellis/tasks/09-10-moonjs-js-engine
```

## 构建与运行

```
moon check --deny-warn --target native
moon test --target native
moon run cmd/moonjs --target native
moon run cmd/moonjs-test262 --target native
```

## 约束

- 纯 MoonBit；无 C FFI。
- 源码保持在 `native | wasm-gc | js` target 下均可编译（`preferred_target = "native"`）。
- QuickJS 仅作参考：其 opcode 表、测试用例、行为语义作为 spec 使用；不复制其代码。

## 已知偏差 (spec / QuickJS)

_暂无。在 M6 稳定并对 test262 某些分类进行永久性 exclude 时补充记录。_
