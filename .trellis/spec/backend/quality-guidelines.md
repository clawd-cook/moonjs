# Quality Guidelines

> Code quality standards for MoonJS (pure-MoonBit JavaScript engine).

---

## Overview

Standards accumulated from actual implementation friction in this project. Each entry states **what**, **why**, and cites the concrete situation it came from so future readers can judge whether the rule still applies.

Toolchain baseline: `moon 0.1.20260904` (as of 2026-09-10). Standard: run `moon fmt && moon info && moon check --deny-warn --target native && moon test --target native` before declaring a milestone step done.

---

## Forbidden Patterns

### Don't: `derive(Show)` on any type

**Problem**:
```moonbit
pub struct SourceLoc {
  line : UInt16
  col : UInt16
} derive(Show, Eq)
```

**Why it's bad**: `derive(Show)` is deprecated in the current MoonBit toolchain and emits diagnostic `[0027]` ("`derive(Show)` is deprecated. Use `derive(Debug)` or manually implement the `Show` trait instead."). Under `moon check --deny-warn` (our project-wide gate) this becomes an error and blocks the build.

**Instead**:
```moonbit
pub struct SourceLoc {
  line : UInt16
  col : UInt16
} derive(Eq, @debug.Debug)
```

`derive(@debug.Debug)` renders a stable structural form suitable for snapshot tests via `debug_inspect(value)` (from `moonbitlang/core/debug`). This matches how `moonbitlang/core` itself does structural debug output (see `moonbitlang/core/argparse`, `moonbitlang/core/json`).

**Notes**:
- Add `moonbitlang/core/debug` to `moon.pkg` imports when using `@debug.Debug`.
- When `Show`-like human formatting is genuinely needed (e.g. for `println` output visible to users), implement the `Show` trait manually rather than deriving it.
- `derive(@debug.Debug)` output uses `{ field: value, ... }` (with spaces after `:` and `,`); test snapshot strings must match this.

**Source**: M1 Step 1 (`src/util`) hit this. Recorded 2026-09-10.

---

## Required Patterns

### MoonBit block style

Every top-level definition begins with `///|` and (usually) a doc comment. Blocks are independently reorderable — this is the convention `AGENTS.md` mandates and `moon fmt` enforces. Do not put multiple `pub fn` declarations back-to-back without the `///|` block separator.

### `.mbti` review is part of "done"

`moon info` regenerates `pkg.generated.mbti` from public declarations. Before marking a package's work complete:
1. Run `moon info`.
2. Read the resulting `.mbti`.
3. Confirm every exported symbol was intentional. Anything unintentionally public gets `priv` (fields) or `#doc(hidden)` (top-level).
4. If `.mbti` did not change since the previous package version, the change is a pure internal refactor.

### Prefer blackbox tests (`*_test.mbt`) unless internals are required

Blackbox tests import the package with `@<pkg>` and exercise the public API. Use whitebox tests (`*_wbtest.mbt`) only when the invariant under test is genuinely internal (e.g. asserting that two private caches stay in sync).

### Package-owned interners, not globals

Wherever string interning is used (compiler symbol table, `Chunk` constant pool, `Shape` keys), each consumer owns its own `@util.Interner`. No project-wide singleton. Rationale: milestone boundaries stay clean and there is no cross-context aliasing when a `Chunk` is serialized / disassembled in isolation.

---

## Testing Requirements

- Every package under `src/` ships a blackbox test file at minimum.
- Structural debug output goes through `debug_inspect(value)` snapshots. Do not paste raw `Show`-style strings.
- Toolchain gate for "step complete":
  ```bash
  moon fmt
  moon info
  moon check --deny-warn --target native
  moon test --target native
  ```
  All four must succeed with zero diff / zero warnings / zero failures.

---

## Code Review Checklist

- [ ] `moon check --deny-warn --target native` clean?
- [ ] `moon test --target native` clean?
- [ ] `.mbti` diff reviewed — no unintentional public symbols?
- [ ] `moon fmt` idempotent — no post-commit reformatting drift?
- [ ] Any new `derive(Show)` occurrences? (Reject — see forbidden patterns.)
- [ ] Any new dependencies on non-`moonbitlang/core` external packages? (Flag for discussion — pure-MoonBit constraint applies.)
- [ ] Test file uses `assert_eq` / `debug_inspect`, not ad-hoc `println` debugging?
