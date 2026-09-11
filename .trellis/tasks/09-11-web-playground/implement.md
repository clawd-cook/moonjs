# Web Playground - Implementation Plan

Task: `09-11-web-playground`. Refers to `prd.md` + `design.md`.

## Execution order

1. **Spike (5 min)** — verify `#export_name` on a `foreign_library` produces ESM exports.
2. **`cmd/moonjs-playground/`** — MoonBit package: `moon.pkg`, `main.mbt` with `eval_and_format`, `format_js_value`, `format_error`, `print` builtin.
3. **`pnpm rebuild:engine`** — npm script; validate output files land in `website/src/moonjs-playground/`.
4. **React `<Playground>` component** — `website/src/components/Playground.tsx` + `Playground.css`.
5. **Docs pages** — `docs/en/guide/playground.mdx` + `docs/zh/guide/playground.mdx` with sample snippets.
6. **Nav** — update `_nav.json` in both locales.
7. **Validate** — run every AC bullet in prd.md.

## Step 1: Spike (validate MoonBit → JS export)

Tiny throwaway package (`spike/` or in `cmd/moonjs-playground/` directly):

```moonbit
// moon.pkg: pkgtype(kind: "foreign_library"), link.js.format = "esm"

#export_name("add")
pub fn add(a : Int, b : Int) -> Int { a + b }
```

Run `moon build --target js` and inspect the output for a plain `export function add(...)` or `export { add }`. If seen — proceed to Step 2. If not (e.g. `#export_name` doesn't apply to `foreign_library` in this MoonBit version) — fall back to `link.js.exports = [ "add" ]` in `moon.pkg`.

Delete the spike after validation.

## Step 2: `cmd/moonjs-playground/`

Create the directory + `moon.pkg` + `main.mbt`. Public functions:

- `eval_and_format(source : String, filename : String) -> EvalOutput`
- `EvalOutput` struct with 4 String fields, all `pub`.

Internal:
- `mut stdout_buffer : String = ""`
- `install_print(engine : @vm.Engine) -> Unit` — creates NativeFn appending to buffer.
- `format_js_value(v : @value.JSValue) -> String`
- `format_exception(exc : @value.JSException) -> String`

Impl of `eval_and_format`:
```moonbit
pub fn eval_and_format(source : String, filename : String) -> EvalOutput {
  stdout_buffer = ""
  let engine = @vm.Engine::new()
  install_print(engine)
  match engine.eval_script(source, filename) {
    Ok(v) => EvalOutput {
      kind: "ok",
      value: format_js_value(v),
      error: "",
      stdout: stdout_buffer,
    }
    Err(exc) => EvalOutput {
      kind: "error",
      value: "",
      error: format_exception(exc),
      stdout: stdout_buffer,
    }
  }
}
```

Because `pub struct EvalOutput` with `pub` fields exposes them on the JS side as plain properties.

**Verify**: `moon build --target js` produces `moonjs-playground.js` with `export function eval_and_format(...)` (or equivalent ESM shape).

## Step 3: `pnpm rebuild:engine`

Add to `website/package.json`:

```json
"scripts": {
  ...
  "rebuild:engine": "cd .. && moon build --target js --release && mkdir -p website/src/moonjs-playground && cp _build/js/release/build/cmd/moonjs-playground/moonjs-playground.js website/src/moonjs-playground/ && cp _build/js/release/build/cmd/moonjs-playground/moonjs-playground.d.ts website/src/moonjs-playground/ && cp _build/js/release/build/cmd/moonjs-playground/moonbit.d.ts website/src/moonjs-playground/"
}
```

Run it. Verify files exist at `website/src/moonjs-playground/`. Commit them.

## Step 4: React `<Playground>` component

Create `website/src/components/Playground.tsx` per design.md §3. Key traits:
- Dynamic `import()` in `useEffect` — no top-level import.
- `initialCode` prop.
- Renders textarea, Run button, output panels.
- SSR-safe (`typeof window !== 'undefined'` guard).

Create `website/src/components/Playground.css` with minimal styling using `--rp-c-*` CSS variables for dark mode compatibility.

## Step 5: Docs pages

`website/docs/en/guide/playground.mdx`:
```mdx
---
description: Run JavaScript in the browser using the MoonJS engine compiled to JS.
---

import { Playground } from '../../../src/components/Playground.tsx';

# Playground

Everything below runs in your browser via the MoonJS engine compiled to JS. Use `print(...)` to write to the output panel. If a script hangs, refresh the tab.

<Playground initialCode={`function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
print("fib(6) =", fib(6));
fib(6);`} />

## Known limits

- Runs the MoonJS M1 subset only — no arrow functions, classes, template literals, spread, destructuring yet (see [Milestones](/guide/milestones/overview)).
- No `console`, `setTimeout`, or module imports; use `print(...)` to inspect intermediate values.
- Errors show precise `line:col` from parser and runtime.
```

Chinese mirror with translated prose.

## Step 6: Nav

Edit `docs/en/_nav.json` and `docs/zh/_nav.json` to add Playground entry (after API, before Milestones).

## Step 7: Validation

Run each AC line from prd.md. All must pass:

- `pnpm rebuild:engine` regenerates bundle.
- `pnpm build` without MoonBit succeeds.
- `pnpm dev`; `1 + 2` → `3`; `print("hello"); 42` → stdout `hello`, value `42`; fib(6) → `8`; `throw new Error("boom")` → stack.
- 4 sample chips work.
- Chinese page mirrors.
- `moon check --deny-warn --target native` and `moon test --target native` still green (no MoonBit regressions from the new package).
- `moon check --deny-warn --target js` clean.

## Rollback points

- **After Step 1 (spike)**: if export mechanics don't work, evaluate whether `link.js.exports` fallback is viable; if MoonBit js target can't produce a callable module at all, this task is blocked and reported.
- **After Step 2**: if `EvalOutput` fields don't project as JS properties, wrap into an inline object literal in `eval_and_format` (`return { kind: "ok", ... }` via a shim).
- **After Step 4**: if rspress SSR crashes at build, add explicit `pageType: doc` and a fallback loading state; worst case, wrap `<Playground>` in a client-only component.

## Pre-start checklist

- [x] prd.md finalised (Q1..Q6 decided).
- [x] design.md landed.
- [x] implement.md landed (this file).
- [ ] `implement.jsonl` and `check.jsonl` seeded with real entries.
- [ ] User reviews and approves.
