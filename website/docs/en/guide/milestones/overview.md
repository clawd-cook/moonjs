---
description: The six MoonJS milestones — scope, coverage target, and current status.
---

# Milestones

MoonJS is planned as six milestones from a bare bytecode VM (M1) to a ≥ 95% pass rate on TC39 `test262` (M6). Each milestone has a concrete acceptance criterion tied to a specific QuickJS test corpus.

| # | Name | Scope | Coverage target | Status |
|---|------|-------|-----------------|--------|
| **M1** | Core VM | Lexer / parser / bytecode / VM / primitives / control flow / closures / try-catch | `test_language.js` arithmetic + control-flow subset, `test_closure1..3` | **done — 13/13 AC pass, 411 tests green** |
| M2 | Language Complete | class / arrow / destructuring / spread / template / for-of / iterator / generator / `with` / `?.` / `??` / `using` | `test_language.js` + `test_closure.js` + `test_loop.js` 100% | planning |
| M3 | Core Builtins | Object / Array / Function / String / Number / Boolean / Math / JSON / Date / Error / Symbol / Map / Set / Weak* / Proxy / Reflect | `test_builtin.js` non-regexp / non-typedarray sections 100% | planning |
| M4 | Advanced Runtime | Promise + microtask / async-await / TypedArray / BigInt / RegExp / Unicode | `test_bigint.js`, regexp / typedarray sections of `test_builtin.js`, `test_queue_microtask.js`, related bug tests | planning |
| M5 | Modules + CLI | ES Modules / `qjs:std` / `qjs:os` / `cmd/moonjs` full argv | `test_std.js` 100% + all of `quickjs/tests/*.js` outside `tests.conf` exclude | planning |
| M6 | test262 | `cmd/moonjs-test262` + pass-rate sprint | ≥ 95% on `test262-fast.conf` @ commit `5ef1e572` | planning |

## What "done" means at M1

M1 acceptance is measured by whether the following seven QuickJS test functions run end-to-end via `Engine::eval_script`:

- `test_op1` — arithmetic, bitwise, comparison, exponent (`**`), string comparison.
- `test_op2` — `new`, `in`, `instanceof`, `typeof`, reserved-word property keys.
- `test_cvt` — `|0`, `>>>0`, `ToNumber` on strings, big number `toString`.
- `test_inc_dec` — prefix and postfix `++/--` on identifiers, member access, index access.
- `test_closure1` — nested set/get returning object with getters and setters.
- `test_closure2` — named function expression self-recursion (`function fact(n) { ... fact(n-1) ... }`).
- `test_closure3` — recursive `fib` in both function-declaration and named-FnExpr forms.

Combined with a top-level `test_closure1(); test_closure2(); test_closure3();` sequence, and precise `line:col` locations for both parser `SyntaxError` and runtime `ReferenceError`, that's the 13-item acceptance checklist. All pass on the current tree.

## Cross-milestone contracts

The following are frozen so later milestones can extend without breaking earlier ones:

- `JSValue` variants — additive only (`pub(all) enum` enforced).
- Bytecode encoding — `[op:8][A:8][B:8][C:8]`.
- Opcode numbering — new opcodes go in unused slots.
- `SourceLoc` shape — `{ line: UInt16, col: UInt16 }`, 1-based.
- `Chunk` — additive fields OK, renames forbidden.
- `PropMeta.attrs` — bit 3 reserved for accessor properties in M3.
