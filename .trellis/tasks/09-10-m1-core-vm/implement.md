# M1 - Implementation Plan

Task: `m1-core-vm`. 承接 `prd.md` + `design.md`。

## 1. 执行顺序

M1 内部按依赖分层，从下往上：

```
Step 1  util           — SourceLoc / InternedString / 基础工具
Step 2  value          — JSValue / Object / Shape 骨架 + 单测
Step 3  ast            — 完整 AST 节点定义 + Debug snapshot 单测
Step 4  bytecode       — Chunk / Opcode 编码 helper + wide 前缀 + 单测
Step 5  lexer          — Tokens + 上下文敏感（regex/template/asi）+ 大批 fixture 单测
Step 6  parser         — 完整语法 → AST + parser error 位置 + fixture 单测
Step 7  compiler       — AST → Bytecode（M1 支持子集）+ 未实现节点 NotImplementedYet
Step 8  vm             — Frame / 主循环 / upvalue / 异常传播
Step 9  builtins       — Object/Function/Error/String stubs
Step 10 顶层 API       — Engine::new / eval_script
Step 11 harness        — tests/quickjs_harness/ 与 fixture
Step 12 M1 AC 验证     — 跑通全部 AC 用例
Step 13 mbti 审查      — moon info & 手动检查每个包公开面
```

每一步完成后再进入下一步 —— 依赖清晰，回退代价小。

## 2. 每步 subtask 与验证

### Step 1: util
- 实现 `SourceLoc`、`SourceSpan`、`InternedString`。
- **验证**：`moon check --deny-warn --target native` + `moon test` 对 util 单测通过。

### Step 2: value
- `JSValue` sum type、`Object` / `Shape` / `PropMeta` / `JSException` / `StackFrameInfo`。
- `Object::new(shape, proto)`, `Object::add_property(obj, key, val, attrs)`, `Object::get_property(obj, key) -> JSValue`（含原型链），`Object::has_property`。
- **验证**：单测覆盖 add/get/has、原型链、shape 顺序。

### Step 3: ast
- 完整 `Expr` / `Stmt` / 其它辅助 enum 定义，带 `SourceSpan`。
- derive `Show`（用于 debug snapshot） / `Debug`。
- **验证**：mock AST 构造 + `debug_inspect` snapshot 单测。

### Step 4: bytecode
- `Chunk` / `Instr` 编码解码 helper。
- `Chunk::emit(op, a, b, c, loc)`、`Chunk::emit_wide(op, operand, loc)`、`Chunk::add_const(v) -> Int`（去重）、`Chunk::patch_jump(pc, offset)`。
- Disassembler：`Chunk::disassemble() -> String` 用于 debug 输出。
- **验证**：单测 encode/decode round-trip、disassembler 输出 snapshot。

### Step 5: lexer
- Tokens 全集 + lexer 主循环。
- 上下文接口 `lex_next(allow_regex: Bool) -> Token`。
- Template literal 嵌套 stack。
- **验证**：一系列 fixture（几十条）：数字字面量、字符串转义、`\u{...}` identifier、regexp vs divide、template `${a + b}`、ASI 关键分界。跑 `quickjs/tests/*.js` 中 M1 覆盖的 4 个文件 lex 到 Eof 无错。

### Step 6: parser
- Pratt 表达式解析 + statement 解析。
- 上下文敏感回溯（arrow / `let[...]` / arrow 参数默认值）。
- 错误定位 `ParseError { msg, loc }`。
- **验证**：
  1. 用完整 `test_language.js` + `test_closure.js` parse 到底（AST 不 verify，只保 lex+parse 无 unexpected panic）。
  2. 对 M1 subset fixture 做 AST snapshot。
  3. 对 `parse-error-column.js` 的 SyntaxError case 验证 col 精确。

### Step 7: compiler
- Scope 分析（locals + upvalues + `is_captured`）。
- AST → Bytecode 逐节点：Expr（Push / Load / Binary / Unary / Call / New / Member）→ Stmt（If / While / DoWhile / For / Return / Throw / Try/Catch/Finally / Break/Continue with label / VarDecl / FunctionDecl / Block / ExprStmt / Empty）。
- 未实现节点抛 `NotImplementedYet`。
- **验证**：对 fixture 编译输出 disassembly snapshot。

### Step 8: vm
- Frame / operand stack / try stack / upvalue lifecycle。
- 主循环所有 M1 opcode arm。
- Call / Return / Throw。
- `capture_stack` 生成 `stack` 字段。
- **验证**：单测组：算术、比较、闭包、递归、try/catch/finally、`throw` 时 stack 内容。

### Step 9: builtins
- `Engine` 类型 + `Engine::init_globals()` 挂 Object/Function/Error/TypeError/RangeError/SyntaxError/ReferenceError/String/globalThis/undefined/NaN/Infinity。
- Object.prototype.hasOwnProperty / toString / valueOf stub。
- **验证**：单测：`new Object`、`obj instanceof Object`、`typeof f === 'function'`。

### Step 10: Engine API
- 顶层 `pub struct Engine`、`pub fn Engine::new() -> Engine`、`pub fn Engine::eval_script(source, filename) -> Result[JSValue, JSException]`。
- Re-export 从 root package `heyq02/moonjs`。
- **验证**：从 `cmd/moonjs/main.mbt` 调用一次 `eval_script("1 + 2", "<inline>")` 打印结果。

### Step 11: Test harness
- 建 `tests/quickjs_harness/` 包（新增 `moon.pkg`）。
- 生成两个 fixture（.js 文件）：`test_language_m1.js` / `test_closure_m1.js`。
- Blackbox test `quickjs_harness_test.mbt` 加载 fixture 并 `eval_script`。
- **验证**：`moon test --target native` 全绿。

### Step 12: M1 AC 验证
- 逐条对照 `prd.md` §Acceptance Criteria。
- 如有失败：判断是"实现 bug"还是"AC 项应该移出 M1"，前者修复，后者更新 PRD。

### Step 13: mbti 审查
- `moon info` 生成 `.mbti`。
- 逐个包对照 `design.md` 中的公开面：
  - `util`：只 export `SourceLoc` / `SourceSpan`。
  - `value`：`JSValue`、`Object`、`Shape`、`JSException`、`StackFrameInfo` 及其 constructor / accessor。
  - `ast`：Expr / Stmt enum 与辅助类型。
  - `bytecode`：`Chunk`、`Instr` 编解码 helper。
  - `lexer`：`Token`、`Lexer`、`ParseError` 位置类型。
  - `parser`：`Parser::parse_script`。
  - `compiler`：`compile_script(ast) -> Chunk`。
  - `vm`：`Frame`、`Engine::run`。
  - `builtins`：`init_globals(engine)`。
  - Root: `Engine`、`Engine::new`、`Engine::eval_script`。
- 任何 unexpected 公开的 symbol 加 `#doc(hidden)` 或改成 `priv`.

## 3. Validation commands

```bash
moon check --deny-warn --target native      # 每步完成后运行
moon test --target native                   # 每步完成后运行
moon info                                   # step 13 前运行
moon fmt                                    # step 13 前运行
```

## 4. Risky files / rollback points

- **`src/value/`**：`JSValue` 定型 + Shape 结构一旦对下游 lock，回滚代价高。这是 §12.1 提到的 spike 位置。
  - Rollback：Step 2 完成时若 spike 显示劣化，回退到 tagged union struct（`{tag: Int, ...}`）方案；重跑 Step 2..8。
- **`src/bytecode/`**：opcode 编号一旦被 compiler emit，重编号成本大。
  - Rollback：Step 4 完成时逐条 review opcode 编号后 freeze。
- **`src/vm/` upvalue 实现**：Q6 决议的平铺 upvalue 若实现出 bug（比如 close 时机错），会导致所有闭包测试失败。
  - Rollback：Step 8 完成前不引入 M2 特性；若 upvalue 结构性问题，回退到简单的 "closure 一律 clone locals" 语义（不共享 cell）先跑通剩下用例，标记 KNOWN ISSUE，M2 修复。

## 5. Pre-start checklist

- [x] `prd.md` 收敛完毕（Q1..Q8 决议）。
- [x] `design.md` 落地。
- [x] `implement.md` 落地（本文件）。
- [ ] `implement.jsonl` / `check.jsonl` 至少各一条真实 spec/research 条目。
- [ ] 用户 review 本 PRD/design/implement。
- [ ] Optional: 先做 Step 2 的 spike（JSValue 性能与内存实测），若明显问题回到 PRD Q2 重议。

## 6. Post-M1 handoff

M1 完成后写入：
- `README.md` 的进度矩阵：M1 → "done"，列出实际支持的 JS 子集与已 pass 的 quickjs 用例。
- Parent `moonjs-js-engine` 的 `implement.md` §2 验收门：勾选 M1 完成，回归 gate 生效（M2 起每次 check 必跑 M1 fixture）。
- `.trellis/spec/backend/` 若积累了值得复用的经验（例如"MoonBit sum type 与 GC 交互的 gotcha"），trellis-update-spec 落档。

## 7. 时间估算（不作 AC 用）

粗估：util → value → ast → bytecode → lexer → parser → compiler → vm → builtins → engine api → harness → AC → mbti，各步 1–5 天不等，总量 3–5 周。此估算不进入 AC；无时间盒。
