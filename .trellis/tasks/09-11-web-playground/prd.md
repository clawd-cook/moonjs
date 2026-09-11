# Web playground: run JS in docs site

## Goal

Give docs readers a browser playground: on `docs.moonjs` (Rspress site), a page contains a textarea + Run button + result panel. Typing JS code and hitting Run compiles-and-executes it via the same MoonJS engine used in tests, all client-side.

## User Value

- Learning: readers try MoonJS's exact behavior on their own snippets.
- Confidence: seeing arithmetic / closures / `throw` work in the browser is stronger than reading the spec.
- Feedback: bug reports come with minimal reproducers ("this input gives that output").

## Confirmed Facts (from brainstorm)

### Toolchain
- `moon build --target js` already produces a working ESM-style JS bundle. Current `cmd/moonjs/moonjs.js` in `_build/js/debug/build/cmd/moonjs/` is ~18k lines, contains full engine + a `(() => {...})()` main that runs a hardcoded snippet.
- MoonBit exposes `#export_name("name")` attribute (preferred) and `link.js.exports` field (per-backend override). Package must be `pkgtype(kind: "executable")` or `pkgtype(kind: "foreign_library")` for linked output.
- `link.js.format` supports `"esm"` (default) / `"cjs"` / `"iife"`.
- Rspress v2 is Rsbuild-based; ESM imports get code-splitting for free.

### Rspress site (`website/`)
- Config: `base: '/clawd-cook/'`, `siteOrigin: 'https://clawd-cook.github.io'` (recent edit).
- pnpm-only build. React 19 + TypeScript.
- Bilingual (`docs/en` + `docs/zh` mirrored).

### Engine capabilities (M1 baseline)
- No `print` builtin yet (M5 introduces `qjs:std.print`).
- `eval_script(source, filename) -> Result[JSValue, JSException]` is the public entry.
- `JSException` carries a full cross-frame stack trace with 1-based line/col.

## Decisions (Q1..Q6)

- **Q1 → A** — single-page inline React `<Playground>` component. No iframe, no Web Worker in v1. If long-running scripts freeze the tab, users refresh; Worker isolation is a future upgrade path.
- **Q2 → A** — new package `cmd/moonjs-playground/` with `pkgtype(kind: "foreign_library")` + `link.js.format = "esm"` + `#export_name` on the API surface.
- **Q3 → B** — build output lands at `website/src/moonjs-playground/moonjs-playground.js` (+ `.d.ts`), imported by the React component via dynamic `import()`.
- **Q4 → A** — one dedicated page `guide/playground` with textarea + Run button + result panel + preset sample buttons. Component is parameterised (`<Playground initialCode=... />`) so architecture pages can embed it later.
- **Q5 → B** — MoonBit-side `eval_and_format(source, filename) -> EvalOutput`, where `EvalOutput` bundles `{ result_kind, value_str, error_str, stdout }`. A `print(...)` NativeFn is added specifically for the playground so `print("x")` shows up in the `stdout` field.
- **Q6 → A** — the generated `moonjs-playground.js` and `.d.ts` are checked into git. Rspress build needs only pnpm; MoonBit toolchain optional for site contributors. A `pnpm rebuild:engine` script refreshes the bundle.

## Requirements

### Functional
- **R1.** New MoonBit package `cmd/moonjs-playground/` produces `moonjs-playground.js` (ESM) exporting at minimum:
  - `eval_and_format(source: string, filename: string) -> { kind: "ok" | "error"; value: string; error: string; stdout: string }`
- **R2.** The engine sees a `print(...)` global inside playground evaluations: when JS code calls `print("hello")`, `"hello\n"` is appended to the `stdout` string returned by `eval_and_format`.
- **R3.** Reasonable JS-like formatting for return values: `undefined`, `null`, `true`/`false`, integer / decimal numbers (`NaN`, `Infinity`), quoted strings with escapes, `[object Object]`, `[Function: fib]`, `[native]`.
- **R4.** Error formatting: for `JSException`, produce `<name>: <message>\n    at <chunk_name> (<file>:<line>:<col>)\n    ...`.
- **R5.** Build script `pnpm rebuild:engine` (in `website/package.json`) runs `moon build --target js` in the project root and copies output to `website/src/moonjs-playground/`.
- **R6.** React component `<Playground initialCode? />` at `website/src/components/Playground.tsx`:
  - Loads `moonjs-playground.js` via dynamic `import()` on mount (client-side only; SSR-safe: no top-level import).
  - Renders: textarea (min 8 rows), Run button, result panel showing formatted value + stdout + error stack.
  - Bilingual labels via rspress i18n hook.
- **R7.** New docs page `guide/playground.md` (or `.mdx`) at `docs/en/guide/playground.mdx` and `docs/zh/guide/playground.mdx`, embedding `<Playground />` with 3-4 sample snippet buttons (fib, closure, try/catch, arithmetic).
- **R8.** Nav entry: add "Playground" to `_nav.json` in both locales.

### Non-functional
- **N1.** Rspress build stays pnpm-only. No MoonBit toolchain required to `pnpm build`.
- **N2.** The playground bundle only loads when a user opens the playground page (code-splitting via dynamic `import()`).
- **N3.** No new external npm dependencies beyond what rspress already pulls in.
- **N4.** Component works in both `pnpm dev` and `pnpm build` output (SSR-safe).

## Acceptance Criteria

- [ ] `pnpm rebuild:engine` runs `moon build --target js` and materialises `website/src/moonjs-playground/moonjs-playground.js` + `.d.ts`.
- [ ] `pnpm build` (from `website/`) succeeds without MoonBit installed.
- [ ] `pnpm dev` shows Playground page at `/guide/playground`; typing `1 + 2` and Run shows `3` in the value panel.
- [ ] `print("hello"); 42` shows `hello` in stdout panel and `42` in value panel.
- [ ] `throw new Error("boom")` shows the error stack with correct line:col.
- [ ] `function fib(n) { return n < 2 ? n : fib(n-1) + fib(n-2); } fib(6)` shows `8`.
- [ ] All 4 sample snippet buttons work.
- [ ] Chinese page `/zh/guide/playground` mirrors the English page; UI labels localised.
- [ ] Page navigation entry visible in both locales.
- [ ] `moon check --deny-warn --target native` and `moon test --target native` still pass (no regressions to M1).
- [ ] `moon check --deny-warn --target js` clean (proves js-target path stays healthy).

## Out of Scope

- Monaco editor (syntax highlighting done via CSS, not full editor).
- Multi-file / import support (M5 territory).
- Persistent share links (URL-encoded source).
- Web Worker isolation (v2 if playground scripts commonly freeze the tab).
- test262 harness inside the browser.

## Open Questions

None blocking — decisions finalised.
