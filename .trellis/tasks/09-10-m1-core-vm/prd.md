# M1 Core VM

Parent: `moonjs-js-engine`. 前置里程碑：无。Trellis 状态：in_progress（Trellis 的 `start` 同时切换焦点与状态，本 M 仍处 planning 收敛，实现在 review 后进入）。

## Goal

搭起 MoonJS 骨架：源码 → tokens → AST → bytecode → VM 执行的**端到端最小路径**，并在其上完成 primitives 的完整语义、`var`/`let`/`const`、控制流、函数与闭包、异常与精确的 stack trace。M1 完成后，M2..M5 只需在此骨架上追加节点/opcode/builtin，无需重写核心。

## Scope

### Lexer（Q4 决议：**完整**）
- 完整 ECMAScript 2023+ 词法：identifier（含 `\u{...}` / `\uXXXX` 转义）、number literal（decimal / hex / oct / bin / legacy 08 / `_` 分隔符 / BigInt `n` 后缀词法）、string literal（单双引号 + 完整转义 + line continuation）、template literal（含 `${}` 分节 token 序列）、regexp literal（配合 parser 的 divide-vs-regex 上下文歧义解析）、punctuator 全集、注释、reserved words、strict-mode reserved words。
- Token 携带精确 `(line, col_start, col_end)`。
- 关键实现约束：`s[i]` 拿 `UInt16` charcode（MoonBit `String` 本就是 UTF-16，与 JS 语义对齐）。

### Parser（Q4 决议：**完整**）
- 完整 ES2023+ 语法产生式，输出 `src/ast` 定义的 AST。
- 遇到 M1 未实现的**执行**语义（class body / arrow / generator / for-of / destructuring / spread / template / regexp literal / private / `with` / optional chaining / `using`），parser 正常生成 AST 节点；由 M1 compiler 在下沉阶段抛 `NotImplementedYet(<node kind>)`。
- 关键实现约束：JS 语法的上下文敏感部分（regexp vs divide、arrow function 参数回溯、`let[...]` vs `let[expr]`、ASI）必须正确处理。

### AST
- 覆盖完整 ES2023+ 语法所需的所有节点（parser 一次做完的对称面）。
- 每个节点带 `SourceSpan { start_line, start_col, end_line, end_col }`。

### Bytecode（Q1 决议：**定长 32-bit 指令**）
- 存储：`Array[UInt]`（32-bit unsigned int），每条指令 `[opcode:8bit][operandA:8bit][operandB:8bit][operandC:8bit]`。
- 操作数溢出策略：若某 opcode 需要 >24-bit operand（例如 large constant pool index），使用 `wide` prefix 指令（下一条 32-bit 承载完整 32-bit operand，类似 Python `EXTENDED_ARG`）—— **M1 指令集不预留 wide，需要时再引入**。
- 常量池：`Array[JSValue]`，`push_const idx` 从池中加载。字符串常量、number 大常量、function bytecode 存池中。
- **M1 opcode 集合**（约 60-80 条，具体名单在 `design.md` 中一次落定）：
  - Push：`push_undef`、`push_null`、`push_true`、`push_false`、`push_i32`（inline i32 via wide）、`push_const`（常量池索引）。
  - Stack：`dup`、`drop`、`swap`、`pop`。
  - 变量：`get_local`、`set_local`、`get_upvalue`、`set_upvalue`、`get_global`、`set_global`。
  - 算术：`add`、`sub`、`mul`、`div`、`mod`、`pow`、`neg`、`bnot`。
  - 位：`band`、`bor`、`bxor`、`shl`、`shr`、`ushr`。
  - 比较：`eq`、`ne`、`seq`、`sne`、`lt`、`le`、`gt`、`ge`。
  - 逻辑：`not`、`lnot`。
  - 类型：`typeof`、`instanceof`、`in`。
  - 对象：`new_object`、`define_prop`（用于 object literal `{a: 1}`）、`get_prop`、`set_prop`、`get_element`、`set_element`、`delete_prop`、`delete_element`。
  - 数组：`new_array`、`array_push`。
  - 函数：`new_closure`（关联 function template）、`call`、`call_method`、`construct`、`return`、`return_undef`。
  - 控制流：`jump`、`jump_if_true`、`jump_if_false`、`jump_if_undef`（optional chaining 短路预留，M1 可选）。
  - 异常：`throw`、`enter_try`（push handler）、`leave_try`、`enter_finally`、`leave_finally`。
  - 特殊：`nop`、`debug_line`（可选，若 sourcemap 用 parallel array 则不需要）。

### Compiler
- AST → Bytecode + 常量池 + 每 function 的 `LocalSlot` / `UpvalueSlot` 表。
- 静态分析：变量作用域（`var` hoist、`let`/`const` TDZ）、upvalue 捕获（Q6 决议）、function template（每个 function 有独立 `Chunk`）。
- **未实现节点**：抛 `NotImplementedYet(<node kind>)`，harness 视为 fail（这样开发中意外触发能立即定位）。

### VM
- 主循环：`fn run(frame: Frame) -> Result[JSValue, JSException]`，解码 `Int` 指令 → pattern match on opcode。
- **Frame 布局**：
  - `pc: Int`
  - `chunk: ChunkRef`（含 code / const_pool / source_locs）
  - `locals: FixedArray[JSValue]`（编译时确定长度）
  - `upvalues: FixedArray[UpvalueRef]`（Q6 决议）
  - `operand_stack: Array[JSValue]`（growable）
  - `try_stack: Array[TryHandler]`（记录 catch pc、finally pc、operand_stack 深度）
  - `this_val: JSValue`
  - `caller: FrameRef?` —— 组装 stack trace 用
- **UpvalueRef**（Q6 决议 平铺方案）：`enum UpvalueRef { OnStack(FrameRef, LocalIdx); Closed(Ref[JSValue]) }`。当持有该 upvalue 的 frame 返回时，遍历其"被外层持有的 local slot"，把 `OnStack` 迁移为 `Closed`（cell 提升到 heap）。
- 异常传播：`throw` 弹出 operand_stack、按 `try_stack` 找到最近 handler；若无 handler，把当前 frame 追加到异常的 `stack` 属性，返回 `Err`；`call` 处捕获 `Err` 反复退栈直至 handler 或返回顶层。
- Stack trace 构造：捕获时用 `pc` 查 `chunk.source_locs[pc]` 获取 `(line, col)`，配合 `chunk.name` / `chunk.filename` 组装 `Error.prototype.stack` 字符串（格式：`    at <name> (<file>:<line>:<col>)`）。

### Value / Object
- **JSValue**（Q2 决议 sum type）：
  ```
  enum JSValue {
    Undefined
    Null
    Bool(Bool)
    Int32(Int)          // 快路径小整数（-2^31..2^31-1）
    Number(Double)      // IEEE-754
    Str(String)         // MoonBit String, UTF-16 code unit
    Object(ObjectRef)   // heap-allocated JS object
    // Sym / BigInt / etc. 由后续里程碑追加 variant
  }
  ```
- Int32 / Number 提升规则：M1 算术优先在 Int32 快路径；overflow / 非整数结果自动升 `Number`。位运算内部先 `ToInt32` → 结果一定是 Int32。
- **Object shape**（Q3 决议 Shape）：
  ```
  struct Object {
    shape: ShapeRef
    slots: Array[JSValue]      // 长度 = shape.slot_count
    proto: JSValue             // Object 或 Null
    extensible: Bool
  }
  struct Shape {
    props: HashMap[String, PropMeta]   // key -> {slot_idx, attrs}
    keys_ordered: Array[String]        // 插入顺序，for-in/keys 依赖
    parent: ShapeRef?                  // shape 转移图（M1 可先不做转移共享，直接每对象一个 shape，M6 优化时再共享）
  }
  struct PropMeta { slot_idx: Int; writable: Bool; enumerable: Bool; configurable: Bool }
  ```
- M1 只支持 data property（无 accessor —— accessor 是 M3）。所有 property 默认 `writable=true, enumerable=true, configurable=true`（可写、可枚举、可配置）。
- Prototype chain：`Object` / `Function` / `Error`（+ 子类家族）/ `String` 的 `prototype` 骨架必须存在（M1 用到 `instanceof Object` / `instanceof String` / `new Object`）；具体 method 大多在 M3 补齐，M1 只放 stub。

### Source Location（Q5 决议：parallel array）
- `chunk.source_locs: Array[SourceLoc]`，`len == chunk.code.len`。
- `SourceLoc { line: UInt16, col: UInt16 }`（若某源码 >65535 行/列，退化到 0；M1 简化）。
- Compiler emit 指令时同步 push loc。
- Release / M6 可通过 `strip_debug()` drop 此 array（不影响执行）。

### Test harness（Q7 决议：M1 用 `moon test`）
- 位置：`tests/quickjs_harness/`（新建 package），blackbox test 文件按语义分组。
- 每个 `test_<file_stem>_<function_name>` 是一个 MoonBit `test { ... }`，内容是：读取 `quickjs/tests/<file>.js`、只加载 M1 所需 harness prelude（`assert` / `assert_throws` / `gc()` no-op stub）、然后调用目标 `test_*` 函数。
- 简化实现：直接对 `quickjs/tests/test_language.js` 做一次 M1 化的**测试适配文件** `tests/quickjs_harness/fixtures/test_language_m1.js`，只含 M1 AC 覆盖的 7 个函数 + 顶层调用。这样避免整个 `test_language.js` 因 M2 特性而不能被 parse（矛盾：Q4 说 parser 要能整文件解析，但 M1 compiler 会在 M2 特性节点抛 `NotImplementedYet`，harness 需要跳过）。
- 备选：不做 fixture，直接跑整份 `test_language.js`，harness 在 top-level 遇到 `test_class()` 等未实现 call 时捕获 `NotImplementedYet` 并跳过 —— 需要 harness 层的调用点过滤。**M1 planning 阶段选前者（fixture）**，简单直接；M2 起把 fixture 换成整份原文件。
- 顶层 `assert(f(), expected)` / 顶层 `test_closure1();` 语句要能跑（`test_closure.js` 结尾有直接顶层 call 序列）—— parser & VM 支持顶层脚本，这是 M1 默认能力。

### Builtin stub（M1 最小）
- `Object` / `Function` / `Error` / `TypeError` / `RangeError` / `SyntaxError` / `ReferenceError` / `String` 的 constructor 骨架和 `.prototype` 骨架必须存在。
- `Object.prototype.toString`、`Object.prototype.hasOwnProperty`（`test_op2` 里的 `"x" in a` 会走 property lookup，不严格要 toString，但 `"..." === toString(a)` 场景可能用）。
- 顶层 `undefined` / `NaN` / `Infinity` / `globalThis` / `parseInt` / `parseFloat`（`test_cvt` 用 `"12345" | 0`，走 ToNumber；不直接调 parseInt）。
- `throw` 时 `Error` 需要能被 `instanceof` 识别、要有 `.message` / `.name` / `.stack` 三个属性。
- Harness 需要注入的：`assert(actual, expected?, message?)`、`assert_throws(err_class, func, message?)`、`gc()` no-op —— 这些不是 JS 内建，是 test 文件顶部定义的函数，MoonJS 只要能执行普通 function 声明即可（不需要 host 注入）。

### 不做（M1 out of scope）
- Class body 编译、arrow function、destructuring、spread、template literal 编译、regexp literal 编译、generator、async/await、iterator 协议、for-of / for-in、`with`、`using`、optional chaining、`eval`、strict mode 语义。
- Property accessor（getter/setter）—— M3。
- 完整 builtin 方法（Array/String/Number 等的 prototype method 群）—— M3。
- Promise / TypedArray / BigInt / RegExp / Unicode 表 —— M4。
- 模块系统、CLI harness —— M5。
- test262 driver —— M6。

## Acceptance Criteria（Q8 决议修正）

覆盖用例（每个用例内不含 M2+ 特性）：

- [ ] `quickjs/tests/test_language.js` 中 **`test_op1`** 通过。
- [ ] `test_op2` 通过。
- [ ] `test_cvt` 通过。
- [ ] `test_inc_dec` 通过。
- [ ] `quickjs/tests/test_closure.js` 中 **`test_closure1`** 通过。
- [ ] `test_closure2` 通过。
- [ ] `test_closure3` 通过。
- [ ] `test_closure.js` 顶层的 3 条 test_closure* 直接调用序列 pass（`test_closure1(); test_closure2(); test_closure3();`）。
- [ ] `parse-error-column.js` 中不依赖 M2+ 特性的错误路径的 line/col 精确报出（具体条目在 M1 implement.md 里逐条列，若整文件依赖 M2+ 则 M1 只保证 harness 可以自定义脚本触发同类错误并检验 loc）。
- [ ] `global-reference-column.js` 中的全局未定义变量引用位置精确（M1 可行）。
- [ ] `moon check --deny-warn --target native` 无 warning、无 error。
- [ ] `moon test --target native` 全部通过（包括 M1 harness 与内部单元测试）。
- [ ] `moon info` 生成的 `.mbti` 无非预期公开变更（每个 M1 涉及的包重新审视 `.mbti`）。

Non-AC（M1 结束时不强制通过，但不能引入回归）：
- `test_eq`（依赖 `new Number(1)`，M3 补齐后自然通过）
- `test_delete`（`super.a` 依赖 M2 class；method shorthand 依赖 M2）
- `test_object_literal`（getter 依赖 M3 accessor）
- `test_function_length`（arrow 依赖 M2）
- `test_reserved_names` / `test_syntax` / `test_number_literals` / `test_parse_semicolon`（依赖 `eval` / M2 特性）

## Cross-milestone Contracts

M1 建立的以下契约供 M2..M6 消费，M1 结束后不做 breaking change：

- `JSValue` sum type：新 variant 只能追加，不能改动语义或删除已有。
- `Chunk` / `Frame` 结构字段：M2 起可**追加**字段（generator suspend / async state），不能重命名或修改已有字段语义。
- Bytecode 指令编码：`[opcode:8bit][A:8bit][B:8bit][C:8bit]`，M2..M6 追加新 opcode 时选未占用 opcode 编号，不复用已定义编号。
- Shape / Object：M3 accessor property 通过在 `PropMeta` 里加 `kind: Data | Accessor` 区分（M1 定义时预留字段类型，仅 `Data` 一种）。
- Source location：`SourceLoc { line: UInt16, col: UInt16 }` 字段稳定。

## Notes

- 本 M 复杂：需要 `design.md`（细化 Chunk / Frame / Object / Shape / Upvalue 数据结构、M1 opcode 表、异常传播算法、精确 stack trace 构造流程）与 `implement.md`（按 lexer → parser → ast → bytecode → compiler → vm → builtin-stub → harness 顺序展开）在下一步落地。
- 全部决策依据（Q1..Q8）已收敛，见本节标注。
