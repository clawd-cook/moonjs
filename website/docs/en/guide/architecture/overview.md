---
description: MoonJS package layout — ten `src/` packages and how the compile / runtime pipeline flows through them.
---

# Architecture overview

MoonJS is organised into ten MoonBit packages under `src/`, each with a narrow responsibility. Every package has its own `moon.pkg` and blackbox tests.

## Package map

| Package | Owner | Depends on |
|---|---|---|
| `src/util` | `SourceLoc`, `SourceSpan`, `Interner` | — |
| `src/value` | `JSValue`, `Object`, `Shape`, `PropMeta`, `Function`, `NativeFunction`, exceptions | `util` |
| `src/ast` | Complete ES2023+ AST nodes | `util` |
| `src/bytecode` | `Chunk`, opcode set, 32-bit encoding, wide prefix, disassembler | `util`, `value` |
| `src/lexer` | `Token`, ES2023+ tokenizer with context-sensitive regex/template | `util` |
| `src/parser` | Pratt expression + statement parser → AST | `util`, `ast`, `lexer` |
| `src/compiler` | AST → Bytecode, scope + upvalue analysis, hoisting | `util`, `ast`, `bytecode`, `value` |
| `src/vm` | Main loop, `Frame`, primitive semantics, exception unwind, call/return | `util`, `value`, `bytecode`, `parser`, `compiler`, `builtins` |
| `src/builtins` | `Object` / `Error` family / `String` skeleton + prototypes | `value` |
| root `moonjs.mbt` | Public re-exports (`Engine`, `eval_script`, `JSValue`, `JSException`) | `value`, `vm` |

## Boundaries and contracts

Between milestones, the following invariants are compiler-enforced:

- **`JSValue` variants are additive only.** `pub(all) enum JSValue` means adding a variant is a breaking change; the type system prompts every `match` site to be updated in the same commit.
- **Bytecode encoding is fixed.** `[op:8][A:8][B:8][C:8]`, opcode numbers frozen. New opcodes go in unused slots (0x17 / 0x18 / 0x19 were added in Step 7).
- **`SourceLoc` shape is stable** at `{ line: UInt16, col: UInt16 }` (both 1-based).
- **`Chunk` fields are not renamed.** Additive fields (`self_binding_slot` for named function expressions) are permitted.
- **`PropMeta.attrs` reserves bit 3 for accessor properties** (M3 hook).

## Test infrastructure

Every package ships a blackbox test file (`*_test.mbt`). The M1 acceptance harness lives in `src/vm/harness_test.mbt`, embedding QuickJS fixture source verbatim as raw MoonBit strings — MoonBit `moonbitlang/core` has no `fs`, and MoonJS is pure MoonBit (no C FFI), so fixture contents are baked into the test file rather than read from disk.

## Where things live outside `src/`

- `cmd/moonjs/` — CLI wrapping `Engine::eval_script`. Currently a smoke-test; feature-complete in M5.
- `cmd/moonjs-test262/` — test262 driver skeleton. Comes alive in M6.
- `quickjs/` — vendored QuickJS reference. Consulted for opcode design and test source; no code copied.
- `.trellis/` — task tree, PRDs, design docs, cross-package spec / quality-guidelines.
