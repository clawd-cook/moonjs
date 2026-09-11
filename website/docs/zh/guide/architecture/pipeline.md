---
description: MoonJS 如何把源码转成行为 —— lexer / parser / compiler / VM 管道，源码位置贯穿到底。
---

# 编译与执行管道

MoonJS 采用经典字节码 VM 结构：源码 → tokens → AST → 字节码 → frame 执行。每层都保留源码位置，运行时异常能输出精确的 `line:col` 栈追踪。

```
JS 源码
   │  (Lexer)
tokens
   │  (Parser —— 表达式用 Pratt、语句用递归下降、ASI)
AST                    ← 每个节点带 SourceSpan
   │  (Compiler —— scope 解析、upvalue 捕获、hoisting、TDZ)
字节码 Chunk           ← Array[UInt] + 并行的 Array[SourceLoc]
   │  (VM —— Engine::run_chunk)
JSValue                ← Ok(...) 或 Err(JSException 含 stack trace)
```

## Lexer

- 完整 ES2023+ token：字面量、约 55 个 punctuator、关键字、template head/middle/tail/no-sub、regex 字面量、private identifier。
- 上下文相关：parser 传 `allow_regex` 用来消歧 `/`。Template `${...}` 用内部嵌套栈。
- 行号跟踪支持 LF / CRLF / U+2028 / U+2029。列号 1-based（对齐人类可读的错误输出）。
- 全文件 lex-through 已在 `quickjs/tests/test_language.js` 与 `test_closure.js` 片段上验证。

## Parser

- 完整 ES2023+ 语法。Wrapper 结构：`Expr { span, kind: ExprKind }`（`Stmt`、`Pattern` 相同）。`ExprKind` / `StmtKind` 是 `pub(all) enum`，方便 compiler 跨包 `match` variant。
- Pratt 表达式解析器覆盖全部 18 个优先级层。右结合：赋值、条件、幂。
- ASI 覆盖 spec 的三种情况（unexpected token、`}` / EOF、restricted production 如 `return` / `throw`）。
- Parser 的作用范围大于 M1 compiler 的子集：parser 接受 class、arrow、generator、destructuring、template、spread、optional chaining、import/export。M2+ compiler 会 lower 它们；M1 compiler 遇到 out-of-scope 语法抛 `CompileError("<feature> requires M2")`。

## Compiler

M1 覆盖：`var` / `let` / `const`（标识符 target）、`if/else`、`while`、`do-while`、经典 `for`、`return`（ASI-aware）、`break` / `continue`（含 label）、`throw`、`try` / `catch` / `finally`（内联）、labeled 语句、函数声明与函数表达式、完整表达式 lowering 含 `??` / 前后缀 `++/--` / 成员访问 / 方法调用 / `new`。

值得点名的跨包 emit 策略：

- **每个 local 都是 `Upvalue` heap cell。** M1 跳过 Lua 风格 OnStack/Closed 区分，所有 local 一开始就 heap alloc。成本：每个 local 一次堆分配；收益：无 close-on-return 状态机。若性能敏感，M6 再评估。
- **命名函数表达式自引用** 通过 `Chunk.self_binding_slot` 提示：compiler 在函数体内声明与函数同名的 local slot；VM 在 `OP_NEW_CLOSURE` 时把刚创建的 `Function` 值写入此 slot。
- **`typeof <ident>`** 用专用 opcode `OP_GET_GLOBAL_OR_UNDEF`（0x17）—— 未声明的全局不应抛 `ReferenceError`，因为 `typeof foo === "undefined"` 不应 throw。
- **一元 `+x`** 编译为 `OP_TO_NUMBER`（0x19），而非 `0 + x`（`x` 是 String 时会字符串拼接）。

## VM

- 8-bit opcode 单循环 dispatch。Wide 前缀（`OP_WIDE = 0xFE`）透明地组合两条 word 承载 32-bit operand。
- `Frame { pc, chunk, locals: Array[Upvalue], upvalues: Array[Upvalue], operand_stack, try_stack, this_val, caller }`。
- 异常传播：`OP_THROW` 通过 `propagate_exception` 走 frame 链；每个 frame 的 `try_stack` 查匹配的 `TryHandler`。查不到时，栈追踪继续追加、展开继续。
- `OP_INSTANCEOF` 用 `physical_equal` 沿 receiver 的 proto 链走，对比 constructor 的 `.prototype`。对 `NativeFn`（Object / Error 家族 / String）和用户 `Function`（closure 创建时填 `.prototype`）都能工作。
- 完整 ES 算术与比较语义（`ToNumber`、`ToInt32`、`ToUint32`、`ToString`、`ToBoolean`；strict 与 loose 相等，含 `Int32 === Number` 跨 tag 规则）。

## 错误栈追踪

编译期错误（parse 或 compile）转成 `SyntaxError` JSException，带 `line:col`。运行时错误通过 `Engine::make_error_from_native` 构造 —— 挂上 `.name`、`.message`、`.stack`，其中 `.stack` 由走 caller 链、查每帧的 `chunk.source_locs[pc]` 组装。

## 顶层入口

```moonbit
let engine = @moonjs.new_engine()
match engine.eval_script("1 + 2 * 3", "<inline>") {
  Ok(v) => println("result: \{v}")
  Err(exc) => println("uncaught: \{exc.value}")
}
```

完整 API 见 [API — Engine](/zh/api/)。
