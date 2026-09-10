# MoonJS - Technical Design

Parent task: `moonjs-js-engine`. 本文档只描述**跨里程碑的整体架构**；每个里程碑的细节在对应 child task 的 `design.md` 中。

## 1. 顶层架构

```
   .js source
        │
   ┌────▼─────┐
   │  Lexer   │  tokens
   └────┬─────┘
   ┌────▼─────┐
   │  Parser  │  AST（ES2023+ 完整语法）
   └────┬─────┘
   ┌────▼─────────┐
   │  Compiler    │  AST → Bytecode + ConstPool + Scope info
   └────┬─────────┘
   ┌────▼─────────┐    ┌────────────────┐
   │  VM (interp) │◄──►│ Runtime Values │  (Object / String / Symbol / BigInt / …)
   └────┬─────────┘    └────────┬───────┘
        │                       │
   ┌────▼─────────────┐   ┌─────▼───────────┐
   │ Builtins & Std   │   │  GC (延迟决定)   │
   │ (Object/Array/…) │   │  依托 MoonBit GC │
   └──────────────────┘   └─────────────────┘
        │
   ┌────▼──────────┐
   │ Module Loader │  ES Modules + qjs:std / qjs:os
   └────┬──────────┘
   ┌────▼──────────┐
   │ CLI / test262 │  cmd/moonjs + cmd/moonjs-test262
   └───────────────┘
```

## 2. MoonBit 包结构

拟采用如下 package 布局（每个 dir 一个 `moon.pkg`）：

```
moonjs/
├── moon.mod                    # module heyq02/moonjs
├── moon.pkg                    # root package: 顶层 re-exports
├── moonjs.mbt                  # 顶层公共 API（Engine::new / eval_script / eval_module）
├── src/
│   ├── lexer/                  # 词法
│   ├── parser/                 # 语法 + AST
│   ├── ast/                    # AST 定义（parser 与 compiler 都用）
│   ├── bytecode/               # opcode + Chunk 定义
│   ├── compiler/               # AST → Bytecode
│   ├── vm/                     # VM 主循环 / Frame / Stack
│   ├── value/                  # JSValue、Object shape、property descriptor
│   ├── builtins/               # Object/Array/... 每个 builtin 一个子 dir
│   ├── regexp/                 # 正则引擎
│   ├── unicode/                # unicode 表 + 字符串归一
│   ├── bigint/                 # BigInt
│   ├── promise/                # microtask queue + Promise
│   ├── modules/                # ESM loader + qjs:std / qjs:os
│   └── util/                   # 共享工具（error stack, printf 等）
└── cmd/
    ├── moonjs/                 # CLI（对应 qjs）
    └── moonjs-test262/         # test262 driver（对应 run-test262）
```

**理由**：
- MoonBit 每 dir 一 pkg，语法/语义清晰的域天然分包。
- `ast` 单独一包避免 parser 与 compiler 相互 include。
- `value` 单独一包避免 builtins / vm / runtime 循环依赖。

## 3. 关键抽象

### 3.1 JSValue

跨里程碑核心 sum type（草案）：

```moonbit
enum JSValue {
  Undefined
  Null
  Bool(Bool)
  Int32(Int)             // Small integer fast path（QuickJS 也做此优化）
  Number(Double)         // IEEE-754
  Str(String)            // MoonBit String; UTF-16 view 在 value 模块内提供
  Sym(SymbolId)
  BigInt(BigInt)
  Object(ObjectRef)      // 堆分配的 JS 对象引用
}
```

`ObjectRef` 是 MoonBit 引用类型（class / struct），MoonBit GC 直接管理生命周期。JS 层的 finalizer / WeakRef 语义在 M3 阶段用 `weak` 机制或额外记账实现（M3 的 design.md 展开）。

### 3.2 Bytecode

设计为定长 header + 变长 operand 的紧凑字节流，指令集**参考** `quickjs/quickjs-opcode.h`（约 250+ 条），但按 MoonJS 实际需要裁剪 / 重组。指令分类：
- 栈操作：push_const / push_undef / dup / drop / swap …
- 变量：get_var / put_var / get_local / put_local / get_arg …
- 算术/逻辑/比较：add / sub / mul / … / eq / strict_eq …
- 控制流：if_true / if_false / goto / call / return / throw / try / catch / finally …
- 对象/数组：new_object / define_field / get_field / put_field / get_array_el …
- 迭代/生成器/await：iterator_next / yield / await / async_yield …

M1 只实现子集；M2..M4 逐里程碑扩展。

### 3.3 VM Frame

栈式 VM，Frame 存：pc、bytecode 引用、local slots、upvalue slots、operand stack、try-catch 栈。挂起（generator/async）通过复制或引用 Frame 实现。

### 3.4 Error 与 stack trace

`quickjs/tests/*.js` 大量依赖精确的 stack trace / column / filename（如 `parse-error-column.js`、`global-reference-column.js`、`callsite-native-position.js`）。VM Frame 必须保留 SourceLocation 表（bytecode PC → 源码 line/col），Error.stack 由 VM 现场组装。

### 3.5 GC & 弱引用

MoonBit 自带 GC，MoonJS 不实现自己的分代 GC。但 JS 层有专门语义：
- `WeakRef` / `WeakMap` / `WeakSet` / `FinalizationRegistry` — 需要 MoonBit 的弱引用能力（M3 在 child design 里评估现有 MoonBit stdlib 是否够用；不够则用"弱表 + 定期扫描"回退方案）。
- 循环引用天然由 MoonBit GC 回收。
- `suspended-*-gc.js` 类测试要求挂起帧的对象可被 GC —— Frame 中不持有额外强引用即可。

## 4. Test 基础设施

### 4.1 quickjs/tests/ 驱动

`cmd/moonjs` 需能被脚本以 `moon run cmd/moonjs -- run <file.js>` 方式调用。写一个 harness（`tests/run_quickjs_tests.mbt` 或独立脚本）遍历 `quickjs/tests.conf` 允许的用例，逐个执行、比较退出码。

### 4.2 test262 驱动

`cmd/moonjs-test262` 对应 `quickjs/run-test262.c`：
- 解析 `test262-fast.conf`（section: `[exclude]` / `[features]`）。
- 遍历 `quickjs/test262/test/` 下 `.js`，解析 metadata（`/*---...---*/`），按 `negative`/`flags`/`features` 决策。
- 支持并行执行（M6 视需求）。
- 输出统计（pass / fail / skip / ratio）与 diff 报告。

## 5. 已知设计风险

- **精确 stack trace**：QuickJS 的 stack trace 精细到 column；bytecode 层要为每条指令记录源码位置，可能显著增大 debug 信息，但正确性必需。
- **Number 语义**：JS Number 是双精度浮点 + NaN payload 语义细节，`test_op1/test_op2` 有大量边界值检查（`-0`、`Infinity`、shift 边界）。MoonBit `Double` 与 JS `Number` 语义应一致，但 `>>>`、`| 0` 等 32-bit 强转要用 `Int32` 快路径。
- **String 表示**：JS 字符串是 UTF-16 code unit 序列；MoonBit `String` 内部表示需要在 `value` 层封装出 code-unit 视图。QuickJS 用 rope + 8/16-bit dual repr 优化，MoonJS 初期用 UTF-16 数组即可（M4 视性能再改）。
- **RegExp**：正则要支持 unicode / sticky / dotAll / property escapes；`libregexp` 是完整 NFA 引擎，M4 需要独立设计（child design.md 展开）。
- **纯 MoonBit 下的 I/O**：`qjs:std` / `qjs:os` 提供文件、进程、时间等 API；native target 用 MoonBit stdlib 或最小 sys 绑定。是否有 stdlib 阻塞在 M5 child planning 时验证。

## 6. 里程碑间的一致性契约

- **Value 表示**：`JSValue` 一旦在 M1 定型，后续里程碑扩展时不做 breaking change；新增 variant 而非重构。
- **Bytecode**：每个里程碑允许追加 opcode，不允许改动已有 opcode 语义（除非发现 bug）。
- **Test 一致性**：每个里程碑完成后，之前里程碑覆盖的测试必须继续 pass（回归门）。
