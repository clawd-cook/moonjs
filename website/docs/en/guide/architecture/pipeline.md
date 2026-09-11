---
description: How MoonJS turns source into behavior — the lexer/parser/compiler/VM pipeline with source locations threaded end-to-end.
---

# The compile-and-run pipeline

MoonJS follows a classic bytecode-VM layout: source → tokens → AST → bytecode → frame execution. Every layer preserves source locations so runtime exceptions can render precise `line:col` stack traces.

```
JS source
   │  (Lexer)
tokens
   │  (Parser — Pratt for expressions, recursive descent for statements, ASI)
AST                    ← every node carries a SourceSpan
   │  (Compiler — scope resolution, upvalue capture, hoisting, TDZ)
Bytecode Chunk         ← Array[UInt] + parallel Array[SourceLoc]
   │  (VM — Engine::run_chunk)
JSValue                ← Ok(...) or Err(JSException with stack trace)
```

## Lexer

- Complete ES2023+ tokens: literals, punctuators (~55), keywords, template head/middle/tail/no-sub, regex literal, private identifier.
- Context-sensitive: the parser passes `allow_regex` to disambiguate `/`. Template literal `${...}` uses an internal nesting stack.
- Line tracking honors LF / CRLF / U+2028 / U+2029. Columns are 1-based (matches human-friendly error output).
- Full-file lex-through pass verified against `quickjs/tests/test_language.js` and `test_closure.js` snippets.

## Parser

- Complete ES2023+ grammar. Wrapper struct pattern: `Expr { span, kind: ExprKind }` (same for `Stmt` and `Pattern`). `ExprKind` / `StmtKind` are `pub(all) enum` so compiler can `match` variants across packages.
- Pratt expression parser with all 18 precedence levels. Right-associative for assignment, conditional, exponent.
- Automatic Semicolon Insertion covering the three spec cases (offending token, `}` / EOF, restricted productions like `return`/`throw`).
- Runtime scope of the parser is larger than the M1 compiler subset: parser accepts class, arrow, generator, destructuring, template, spread, optional chaining, import/export. M2+ compiler will lower them; today M1 compiler emits `CompileError("<feature> requires M2")` for out-of-scope constructs.

## Compiler

M1 in-scope: `var` / `let` / `const` (identifier target), `if/else`, `while`, `do-while`, classic `for`, `return` (ASI-aware), `break`/`continue` (with labels), `throw`, `try`/`catch`/`finally` (inline), labeled statements, function declarations and expressions, complete expression lowering including `??`, prefix and postfix `++/--`, member/index access, method calls, `new`.

Cross-package emit strategies worth calling out:

- **Every local is an `Upvalue` heap cell.** M1 skips the Lua-style OnStack/Closed distinction and heap-allocates every local up front. Cost: one heap alloc per local; benefit: no close-on-return state machine. Revisit in M6 if hot.
- **Named function expression self-reference** uses a `Chunk.self_binding_slot` hint: the compiler declares the function name as a local slot within its body; the VM populates that slot with the newly-created `Function` value at `OP_NEW_CLOSURE` time.
- **`typeof <ident>`** uses a special opcode `OP_GET_GLOBAL_OR_UNDEF` (0x17) to avoid throwing `ReferenceError` on undeclared globals — `typeof foo === "undefined"` must not throw.
- **Unary `+x`** compiles to `OP_TO_NUMBER` (0x19), not `0 + x` (which would string-concat when `x` is a String).

## VM

- Single-loop dispatch on 8-bit opcodes. Wide-prefix (`OP_WIDE = 0xFE`) transparently combines two words for 32-bit operands.
- `Frame { pc, chunk, locals: Array[Upvalue], upvalues: Array[Upvalue], operand_stack, try_stack, this_val, caller }`.
- Exception propagation: `OP_THROW` walks the frame chain via `propagate_exception`; each frame's `try_stack` is consulted for a matching `TryHandler`. On miss, the stack trace grows and unwinding continues.
- `OP_INSTANCEOF` walks the receiver's proto chain using `physical_equal` against the constructor's `.prototype`. Works for both `NativeFn` (Object / Error family / String) and user `Function` (populated at closure creation).
- Full ES arithmetic and comparison semantics (`ToNumber`, `ToInt32`, `ToUint32`, `ToString`, `ToBoolean`; strict vs loose equality including the `Int32 === Number` cross-tag rule).

## Error stack traces

Compile-time errors (parse or compile) become `SyntaxError` JSExceptions with the offending `line:col`. Runtime errors are constructed via `Engine::make_error_from_native` — attach `.name`, `.message`, `.stack` populated by walking the caller chain and looking up each frame's `chunk.source_locs[pc]`.

## Public entry point

```moonbit
let engine = @moonjs.new_engine()
match engine.eval_script("1 + 2 * 3", "<inline>") {
  Ok(v) => println("result: \{v}")
  Err(exc) => println("uncaught: \{exc.value}")
}
```

See [API — Engine](/api/) for the full surface.
