# MoonJS - JavaScript engine in pure MoonBit

## Goal

用纯 MoonBit 实现 JavaScript 执行器，最终通过 `quickjs/tests/*.js` 与 `quickjs/test262/` 的全部（未在官方 exclude 中的）测试用例。

## User Value

- 学习 / 展示：证明 MoonBit 可以承载完整的语言运行时。
- 生态：让 MoonBit 项目具备内嵌 / 执行 JS 脚本的能力。

## Confirmed Facts

### 项目现状
- MoonBit 模块 `heyq02/moonjs`（`moon.mod:12`），`preferred_target = "wasm"`（`moon.mod:24`，M1 时会改成 `native`）。
- `moonjs.mbt` 目前是空脚手架。
- 工具链 `moon 0.1.20260904`，支持 target `wasm | wasm-gc | js | native | llvm`。

### QuickJS 参照实现（`quickjs/`）
- 核心 C 代码约 78k 行：`quickjs.c` 64896、`libregexp.c` 3522、`libunicode.c` 2074、`quickjs-libc.c` 5057、`qjs.c` 762、`run-test262.c` 2384。
- 覆盖 ES2023+（class、async/await、Promise、Proxy、Symbol、BigInt、RegExp、Intl 基础、ESM）。

### 测试基准
- `quickjs/tests/*.js`：93 个测试文件，含 `test_language.js` 1112 行、`test_builtin.js` 1355 行、`test_loop.js` 367 行、`test_closure.js` 220 行、`test_std.js` 340 行。
- `quickjs/tests.conf`：本地 runner 配置，含 exclude（`empty.js`、`microbench.js`、worker、fixture_* 等）。
- `quickjs/test262/`：submodule，QuickJS 在其 tree 中 pin 的 commit 为 **`5ef1e5723be95296f36afb0386676fed0205869c`**，MoonJS 将使用同一 commit 以保证通过率可比。当前 submodule 未 init。
- `quickjs/test262-fast.conf`：QuickJS 官方 test262 快速配置（排除慢正则、Atomics 等）。

### 决议
- **目标**：跑通 QuickJS 的全部（除官方 exclude）测试用例，接受分阶段。
- **实现约束**：纯 MoonBit，无 C FFI。
- **架构** (Q2 → A)：直接 bytecode VM 起步；字节码指令集设计参考 `quickjs-opcode.h` 作为需求清单，不要求二进制兼容。
- **主 target** (Q3 → A)：`native`，源码保持不依赖 native-only stdlib（wasm-gc / js target 也能编译）。
- **test262 版本** (Q4)：pin 到 quickjs submodule 指向的 commit `5ef1e5723be95296f36afb0386676fed0205869c`。
- **里程碑** (Q1 → A)：6 个（M1..M6），见下。
- **任务拆分** (Q5 → A)：按里程碑切 6 个 Trellis child task，每个 child 内的能力域用其 `implement.md` 的分步骤 / Trellis subtask 记录。

## Milestones

每个里程碑以"能跑通指定 quickjs 测试子集"为可验证 AC。

| 里程碑 | 交付 | 验收 |
|---|---|---|
| **M1 Core VM** | Lexer/Parser（表达式与语句子集）、bytecode 编译、VM 主循环、Number/String/Boolean/null/undefined、算术/逻辑/比较、`var`/`let`/`const`、`if`/`while`/`for`、function 声明与调用、闭包、异常（try/catch/throw/finally） | `test_language.js` 中 `test_op1/test_op2/test_eq/test_cvt/test_inc_dec/test_constructor/test_prototype/test_arguments/test_labels` 等算术与控制流子集 + `test_closure.js` 的 `test_closure1..3` 通过 |
| **M2 Language Complete** | class（含 static/private/extends/super）、arrow、destructuring、spread、template literal、for-of/for-in、iterator 协议、generator、`with`、optional chaining、`using`、reserved names、number literals、parse edge cases | `test_language.js` + `test_closure.js` + `test_loop.js` 100% 通过 |
| **M3 Core Builtins** | Object/Array/Function/String/Number/Boolean/Math/JSON/Date/Error 家族/Symbol/Map/Set/WeakMap/WeakSet/WeakRef/FinalizationRegistry/Proxy/Reflect | `test_builtin.js` 中除 regexp/typed_array 之外的分节 100% |
| **M4 Advanced Runtime** | Promise + microtask 队列、async/await、TypedArray/ArrayBuffer/DataView、BigInt、RegExp 引擎（对齐 libregexp 能力）、Unicode 表 | `test_bigint.js`、`test_builtin.js` 的 regexp/typed_array 分节、`test_queue_microtask.js`、`array-fromasync-*` / `for-await-normal-close.js` / `iterator-*` / `typedarray-*` / `str-pad-leak.js` 等 bug 用例通过 |
| **M5 Modules + std/os + CLI** | ES Modules（import/export/dynamic import/import.meta/import attributes）、`qjs:std` / `qjs:os` 内置模块（用 MoonBit stdlib 实现文件/进程 API）、CLI `cmd/moonjs` | `test_std.js` 100% + `destructured-export.js`、`dynamic_import_rejection_handled.js`、`import-attributes-identity.js`、`parse-error-column.js`、`reexport-error-module.js` 等模块相关用例通过；`quickjs/tests.conf` 的 exclude 之外全绿 |
| **M6 test262** | test262 驱动（对应 `run-test262.c`）、消费 `test262-fast.conf`、按分类跑 & 汇总；持续修 bug 到目标通过率 | 在 pin commit 的 test262 上（`test262-fast.conf` exclude 之外），M6a 60% → M6b 85% → M6c 95% |

Intl 与 Atomics 分类允许在 M6 阶段以最小 stub 使相关子集被跳过。

## Requirements

### 功能性
- **R1. 语言核心**：完整 ECMAScript 语言（词法/语法/AST、bytecode 编译、执行栈、闭包、原型链、类、异常、生成器、async/await、Promise）。M1..M2 交付。
- **R2. 内置对象**：完整 ECMAScript 内置（Object/Array/Function/String/Number/Boolean/Date/Math/RegExp/Symbol/Map/Set/WeakMap/WeakSet/WeakRef/Proxy/Reflect/Error 家族/TypedArray/ArrayBuffer/DataView/Promise/Iterator/AsyncIterator/JSON/BigInt）。M3..M4 交付。
- **R3. Unicode & 字符串**：surrogate pair、`\u{...}`、正则 unicode / u flag。M4 交付。
- **R4. RegExp**：对齐 `libregexp` 能力。M4 交付。
- **R5. 模块系统**：ES Modules（import/export/dynamic import/import.meta/import attributes）。M5 交付。
- **R6. CLI**：`cmd/moonjs` 支持执行 `.js` / `.mjs`。M5 交付。
- **R7. test262 驱动**：`cmd/moonjs-test262`，能解析 `test262-fast.conf`、跑用例、汇总通过率。M6 交付。

### 非功能性
- **N1. 纯 MoonBit**，无 C FFI。
- **N2. 通过率目标**：`quickjs/tests/*.js`（`tests.conf` exclude 之外）100%；`quickjs/test262/`（`test262-fast.conf` exclude 之外）≥ 95%。
- **N3. 性能**：初期以正确性为唯一目标，但整体 test262 跑完时间应可接受（不设硬指标，M6 阶段视情况优化）。

## Acceptance Criteria (整体)

- [ ] `moon run cmd/moonjs -- run <file.js>` 可执行 `quickjs/tests/*.js` 中未被 `tests.conf` exclude 的全部用例并通过。
- [ ] `moon run cmd/moonjs-test262 -- --config quickjs/test262-fast.conf` 在 pin commit 的 test262 上通过率 ≥ 95%。
- [ ] 所有代码为纯 MoonBit，无 C FFI。
- [ ] 6 个 child task 全部完成（M1..M6）。

## Out of Scope

- Intl 完整实现（M6 阶段允许最小 stub / 跳过对应 test262 分类）。
- Worker（`quickjs/tests.conf` 已 exclude）。
- 与 QuickJS 字节码格式 / 性能对齐。
- Atomics / SharedArrayBuffer 的多线程语义（可最小 stub）。

## Open Questions

（无剩余阻塞问题；剩余细节在 `design.md` 和各 child 的 PRD 中展开。）
