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

### Don't: functional `loop { ... }` construct

**Problem**:
```moonbit
loop init {
  state => if done { break result } else { continue next }
}
```

**Why it's bad**: The functional `loop { pattern => ... }` construct is deprecated in the current MoonBit toolchain (emits `[0027]` deprecation, fails under `--deny-warn`). It has been superseded by the more general `for state = init { ... }` form which supports the same shape more explicitly.

**Instead**:
```moonbit
for state = init {
  if done {
    break result
  }
  continue next_state
}
```

**Source**: M1 Step 2 (`src/value` prototype-chain walk in `Object::get_property` / `has_property`). Recorded 2026-09-10.

---

### Don't: prefix function `not(x)` — use `!x`

**Problem**:
```moonbit
if not(cond) { ... }
```

**Why it's bad**: The prefix `not(...)` function is deprecated under `--deny-warn`; MoonBit steers users to the `!` unary operator.

**Instead**:
```moonbit
if !cond { ... }
```

**Source**: M1 Step 7 (`src/compiler`). Recorded 2026-09-10.

---

### Don't: use MoonBit reserved keywords as variant field names / enum variant names

**Hard-reserved words** (parser rejects with `unexpected token`; must rename):

`test`, `local`, `method`, `if`, `else`, `catch`, `try`, `while`, `for`, `return`, `break`, `continue`, `type`, `fn`.

**Soft-reserved / warns under `--deny-warn`** (compile succeeds but `--deny-warn` promotes to error; append `_`):

`finally` → `finally_`.

**Confirmed NOT reserved** (safe as identifiers):

`case`, `default`, `switch`, `class`, `extends`, `this`, `new`, `super`.

**Problem**:
```moonbit
pub(all) enum StmtKind {
  If(test~ : Expr, cons~ : Stmt, alt~ : Stmt?)   // `test` — parser error
  Try(body~ : Array[Stmt], catch_~, finally~ : Array[Stmt]?)  // `finally` — --deny-warn error
}
```

**Instead**:
```moonbit
pub(all) enum StmtKind {
  If(cond~ : Expr, cons~ : Stmt, alt~ : Stmt?)
  Try(body~ : Array[Stmt], catch_~, finally_~ : Array[Stmt]?)
}
```

**Why it matters**: MoonBit's error messages for reserved-keyword-as-identifier are unhelpful (`error [3002] unexpected token 'test'`). Knowing the list up front avoids a diagnosis dead-end.

**Source**: M1 Step 3 (`src/ast/{expr,stmt,module}.mbt`) verified all listed names against a minimal MoonBit repro. Recorded 2026-09-10.

---

### Variant / struct name collisions are tolerated but read as ambiguity

MoonBit **does not** reject an enum variant sharing a name with a struct in the same package (pattern matching and construction disambiguate by expected type). Still, at read sites `Block` — is that the struct (function body) or the `StmtKind::Block` variant? — is unclear.

**Convention**: when an enum variant wraps a same-named struct payload, suffix the variant name to disambiguate.

```moonbit
pub struct Block { body : Array[Stmt] }         // function body
pub(all) enum StmtKind {
  BlockStmt(Array[Stmt])                        // statement wrapping a block — NOT `Block`
  // ...
  ImportDeclStmt(ImportDecl)                    // NOT `ImportDecl`
  ExportDeclStmt(ExportDecl)
}

pub(all) enum ClassMember {
  MethodDefMember(MethodDef)                    // NOT `MethodDef`
  PropDefMember(PropDef)
  StaticBlock(Array[Stmt])
}
```

**Source**: M1 Step 3 AST review. Recorded 2026-09-10.

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

### `pub(all)` for cross-package enums that need pattern matching

Types like `JSValue` are consumed by every layer (VM, compiler, builtins, tests) via `match`. `pub enum` only exports the type name — external callers cannot pattern-match on variants. Use `pub(all) enum` when variants are part of the API.

Cross-milestone contract: adding a new variant IS a breaking change under `pub(all)`. This is intentional — the parent task's contract already says "JSValue variants must be additive only, never rename or remove", and `pub(all)` makes the contract compiler-enforced. If a new variant is added, downstream `match` sites must be updated in the same commit.

### Struct references vs `Ref[T]`

MoonBit structs are already reference-typed: passing a struct binding to a function or storing it as a field shares the same underlying storage; mutating any `mut` field is visible through every alias. Do **not** wrap a struct in `Ref[T]` for "shared mutability" — it adds an extra `.val` indirection with no semantic gain.

When "handle to shared mutable X" is needed, declare `pub typealias X as XRef` for documentation purposes and use bare `X` at call sites. Add setters (`X::set_field(self, v)`) for cross-package field mutation because `mut` fields are not cross-package assignable.

**Source**: M1 Step 2 (`src/value/object.mbt`). Recorded 2026-09-10.

### `moonbitlang/core` has no file-I/O in current toolchain

`moonbitlang/core/fs` does not exist. `moonbitlang/core/env` only exposes CLI args / env vars / RNG. Reading a file from a test or CLI requires C FFI (`moonbit_fopen_ffi`) — which we cannot use, since **the project is pure MoonBit / no C FFI** (parent PRD constraint N1).

**Convention**: when a test or program needs source code from a file (e.g. `quickjs/tests/test_language.js` for lex/parse-through), do NOT introduce FFI. Instead:

1. **For unit tests**: embed the fixture as a `#|` raw multi-line string constant in the test file. This is what `lexer_test.mbt` does with `test_language.js` snippets.
2. **For the M1 harness runner** (Step 11): use a build-time asset embed — write a small MoonBit source generator (`moon build --pre-build` or similar) that reads the `.js` files at build time and emits a MoonBit source file exposing them as `let TEST_LANGUAGE_JS : String = #|...`.
3. **For M5's `cmd/moonjs run <file.js>`**: when a CLI file argument is needed, this becomes a real problem. Options at that point: (a) petition MoonBit stdlib to add `fs`; (b) build a minimal sys-binding without C FFI (WASI-native syscall style if supported); (c) inline the harness fixtures at build time and offer no arbitrary-file CLI. Decision deferred to M5 planning.

**Source**: M1 Step 5 (`src/lexer`) attempted full-file lex-through; MoonBit toolchain 0.1.20260904 doesn't provide `@fs.read_file`. Recorded 2026-09-10.

---

### MoonBit toolchain gotchas (Step 8a batch)

Toolchain quirks that trip newcomers to MoonBit 0.1.20260904. Each shows a concrete "wrong shape" → "right shape". Recorded 2026-09-11.

**1. Deprecated Int shift methods — use `<<` / `>>` operators.**

```moonbit
// Wrong: Int.lsl, Int.lsr, Int.asr are deprecated.
let shifted = x.lsl(3)

// Right: operator form for signed shifts.
let shifted = x << 3
```

For **logical (unsigned) right shift on an `Int`**, MoonBit's `>>` on `Int` is arithmetic (sign-extending). Round-trip through `UInt`:

```moonbit
let logical_shr = (x.reinterpret_as_uint() >> n).reinterpret_as_int()
```

This is what `js_ushr` in `src/vm/arithmetic.mbt` does. `reinterpret_as_uint` / `reinterpret_as_int` are free bit-pattern casts.

**2. `try? expr` is deprecated. Use `try expr catch { ... }` or the `catch { }` postfix.**

```moonbit
// Wrong.
let r = try? some_fn()

// Right.
let r = try some_fn() catch {
  e => default_value
}
// Or postfix form (used in coerce.mbt for @string.parse_double).
let d = @string.parse_double(view) catch { _ => @double.not_a_number }
```

**3. String slicing / trimming return views, not owned strings.**

`String::trim()` and `s[i:j]` return `@string.View`. To go back to `String`, call `.to_owned()`. Passing a `View` where a `String` is expected is a type error, not a coercion. Old helpers `String::trim_space()` / `String::substring(i, j)` are deprecated — use `.trim().to_owned()` / `s[i:j].to_owned()`.

**4. `String::at(i)` returns `UInt16` (UTF-16 code unit).**

This aligns with JS string semantics (see design.md §5.1 lexer notes). To compare against an ASCII literal like `'0'`, take the code-unit-as-Int via `.to_uint().reinterpret_as_int()` (see `charcode_at` in `src/vm/coerce.mbt`) — do NOT call `.to_int()` directly on a `UInt16`, which is a warning-under-`--deny-warn`.

**5. `unused_field` / `unused_constructor` are `--deny-warn` errors.**

If a struct has a `mut` field or a variant constructor that is defined but not used anywhere in the compile unit, `--deny-warn` treats it as an error. Two mitigations, in order of preference:

- **Add real users** — usually the intended fix. Adding a `pub fn Foo::new / ::get / ::set` stub for a field that will be exercised in a later step counts as a use (see `ClosedUpvalue::new/get/set` in `src/vm/vm.mbt` as "8b hooks" that exist only to satisfy the warning until 8b lands the real users).
- **Public struct fields** (`pub struct` without `priv`) are always "used" from a warning standpoint because external code could read them. Preferred for M1 milestone-boundary structs whose fields will see cross-package reads before their internal writers land (Frame's `upvalues`, `try_stack`, `open_upvalues` — 8a exposes them, 8b writes to them).

There is no `#coverage.skip` equivalent for suppressing this warning; either add users or accept the visibility.

**6. `for { ... }` bare infinite loop doesn't carry a `break value` type.**

MoonBit's deprecated `loop { ... }` construct could bind pattern variables and return `break v` typed. Its successor `for state = init { ... }` requires an explicit driver variable, and the bare `for { ... }` form runs unit-typed. When you want an "infinite dispatch loop that returns via `return` from the enclosing function", use `while true { ... }` and rely on `return` at each terminal arm to exit — see `Engine::execute_frame` in `src/vm/vm.mbt`. The trailing unreachable expression after the `while true` is required by MoonBit's flow analysis; add a `// Unreachable` comment.

**Source**: M1 Step 8a (`src/vm`). Every pattern above is exercised in the VM package. Recorded 2026-09-11.

---

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
