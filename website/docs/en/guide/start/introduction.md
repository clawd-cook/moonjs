---
description: MoonJS overview — what it is, why pure MoonBit, and how it targets QuickJS test parity as its correctness spec.
---

# Introduction

**MoonJS** is a JavaScript engine written entirely in [MoonBit](https://docs.moonbitlang.com). Its correctness bar is set by the vendored [`quickjs/`](https://github.com/clawd-cook/moonjs/tree/master/quickjs) tree: `quickjs/tests/*.js` first, then the TC39 [`test262`](https://github.com/tc39/test262) suite at the exact commit QuickJS pins.

## What makes MoonJS different

- **Pure MoonBit.** No C FFI. The engine, its VM, its garbage-collection contract, and every built-in are MoonBit code. Standard-library dependencies stop at `moonbitlang/core`.
- **Multi-target source.** The primary compile target is `native`, but the source stays compileable on `wasm-gc` and `js` so MoonJS can be embedded in any MoonBit host.
- **Bytecode VM.** 32-bit fixed-length instructions dispatched through a single main loop. Not tree-walking. Reference opcode set aligned to `quickjs-opcode.h` — MoonJS does not require binary compatibility with QuickJS bytecode.
- **QuickJS parity as the north star.** MoonJS uses QuickJS purely as a specification source (opcode list, tests, behavior). No QuickJS code is copied.

## Current status

- **M1 Core VM — done.** 411/411 MoonBit tests green; 13/13 M1 acceptance criteria pass (arithmetic, bitwise, comparison, closures, constructors, method calls, exception unwinding, `instanceof`, `typeof`, and cross-frame stack traces).
- **M2 → M6** — planned. See [Milestones](/guide/milestones/overview).

## Try MoonJS

Head to [Getting started](/guide/start/getting-started) for build and run instructions.
