# moonjs

A JavaScript engine implemented in pure MoonBit.

Goal: pass all test cases in the vendored [`quickjs/`](./quickjs/) tree — both `quickjs/tests/*.js` and the TC39 `test262` suite pinned by QuickJS.

## Status

Managed under Trellis task `moonjs-js-engine`. Progress by milestone:

| Milestone | Scope | Status | Coverage target |
|---|---|---|---|
| M1 Core VM | Lexer / parser / bytecode / VM / primitives / control flow / closures / try-catch | planning | `test_language.js` arithmetic + control-flow subset, `test_closure1..3` |
| M2 Language Complete | class / arrow / destructuring / spread / template / for-of / iterator / generator / with / `?.` / `??` / `using` | planning | `test_language.js` + `test_closure.js` + `test_loop.js` 100% |
| M3 Core Builtins | Object / Array / Function / String / Number / Boolean / Math / JSON / Date / Error / Symbol / Map / Set / Weak* / Proxy / Reflect | planning | `test_builtin.js` non-regexp / non-typedarray sections 100% |
| M4 Advanced Runtime | Promise + microtask / async-await / TypedArray / BigInt / RegExp / Unicode | planning | `test_bigint.js`, regexp / typedarray sections of `test_builtin.js`, `test_queue_microtask.js`, related bug tests |
| M5 Modules + CLI | ES Modules / `qjs:std` / `qjs:os` / `cmd/moonjs` | planning | `test_std.js` 100% + all of `quickjs/tests/*.js` outside `tests.conf` exclude |
| M6 test262 | `cmd/moonjs-test262` + pass-rate sprint | planning | >= 95% on `test262-fast.conf` @ commit `5ef1e572` |

## Layout

```
src/                 - engine (lexer / parser / ast / bytecode / compiler / vm / value / builtins / regexp / unicode / bigint / promise / modules / util)
cmd/moonjs/          - CLI (analogue of `qjs`)
cmd/moonjs-test262/  - test262 driver (analogue of `run-test262`)
quickjs/             - vendored QuickJS as reference implementation + test source
.trellis/            - Trellis task tree; see .trellis/tasks/09-10-moonjs-js-engine
```

## Building & running

```
moon check --deny-warn --target native
moon test --target native
moon run cmd/moonjs --target native
moon run cmd/moonjs-test262 --target native
```

## Constraints

- Pure MoonBit; no C FFI.
- Source stays compileable on `native | wasm-gc | js` targets (`preferred_target = "native"`).
- Reference-only usage of QuickJS: its opcode list, tests, and behavior serve as specs; no code is copied.

## Known deviations from spec / QuickJS

_None yet. Populated as M6 stabilizes and any test262 categories are permanently excluded._
