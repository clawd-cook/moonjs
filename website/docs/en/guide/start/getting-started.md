---
description: Clone MoonJS, run the toolchain gates, execute the M1 acceptance harness, and try the demo CLI.
---

# Getting started

## Prerequisites

- **MoonBit toolchain** — see [MoonBit installation](https://docs.moonbitlang.com/) for install steps. Baseline verified: `moon 0.1.20260904`.
- **Git** — MoonJS vendors a QuickJS checkout as a submodule for reference and testing.

## Clone

```bash
git clone https://github.com/clawd-cook/moonjs.git
cd moonjs
git submodule update --init  # brings in quickjs/ (test262 stays uninitialized until M6)
```

## Build gates

MoonJS keeps a strict gate: format, interface generation, compilation with warnings-as-errors, and the full test suite must all be clean before any step is considered done.

```bash
moon fmt
moon info
moon check --deny-warn --target native
moon test --target native
```

Expected on the current tree: **411 tests, 411 passed, 0 failed.**

## Run the demo CLI

The `cmd/moonjs` binary is a smoke test — it parses, compiles, and executes a small inline snippet:

```bash
moon run cmd/moonjs --target native
```

Output:

```
moonjs (M1 scaffold)
ok: eval_script ran without exception
```

Full CLI features (file argument, `-e code`, argv parsing) land in **M5**.

## Layout at a glance

```
src/                 - engine (util / value / ast / bytecode / lexer / parser / compiler / vm / builtins)
cmd/moonjs/          - CLI (analogue of `qjs`)
cmd/moonjs-test262/  - test262 driver (M6, skeleton only today)
quickjs/             - vendored QuickJS: reference implementation + test source
.trellis/            - task tree and per-package specs
```

## Next steps

- [Architecture — Overview](/guide/architecture/overview) — the ten packages and how they fit.
- [Architecture — Pipeline](/guide/architecture/pipeline) — how source becomes bytecode and how the VM runs it.
- [Architecture — Bytecode](/guide/architecture/bytecode) — 32-bit instruction layout, wide prefix, opcode table.
- [Milestones](/guide/milestones/overview) — where we are and what M2..M6 will add.
