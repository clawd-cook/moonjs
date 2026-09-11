# Web Playground - Technical Design

Parent task: `moonjs-js-engine`. Task: `09-11-web-playground`. Approach summary in `prd.md`.

## 1. Modules touched

```
cmd/moonjs-playground/            NEW  — MoonBit foreign_library exposing eval_and_format
  moon.pkg                        pkgtype foreign_library, link.js.format esm
  main.mbt                        eval_and_format impl + Playground print builtin

src/vm/vm.mbt                     MODIFY — allow install_playground_print(engine)
                                             (or expose engine.set_playground_stdout(buffer))
                                  ALTERNATIVE — keep VM untouched; playground pkg
                                  installs `print` directly onto engine.globals as a NativeFn

website/
  package.json                    MODIFY  — add pnpm rebuild:engine script
  src/moonjs-playground/          NEW      — checked-in build artefacts
    moonjs-playground.js
    moonjs-playground.d.ts
    moonbit.d.ts
  src/components/Playground.tsx   NEW      — React component
  src/components/Playground.css   NEW      — component styles
  docs/en/guide/playground.mdx    NEW      — page with <Playground /> + samples
  docs/zh/guide/playground.mdx    NEW      — Chinese mirror
  docs/en/_nav.json               MODIFY   — add Playground entry
  docs/zh/_nav.json               MODIFY   — add Playground entry
```

## 2. `cmd/moonjs-playground/` design

### 2.1 `moon.pkg`

```
import {
  "heyq02/moonjs" @lib,
  "heyq02/moonjs/src/value" @value,
}

pkgtype(kind: "foreign_library")

link.js {
  format: "esm",
}
```

`foreign_library` produces a linked JS module. `esm` format lets rsbuild treat it as a normal ESM dependency (tree-shakable, code-splittable).

### 2.2 `main.mbt`

```moonbit
#export_name("eval_and_format")
pub fn eval_and_format(source : String, filename : String) -> EvalOutput {
  // Create engine, install playground `print` builtin (writes to a
  // shared MoonBit-side stdout buffer), run eval_script, format result.
}

pub struct EvalOutput {
  kind : String        // "ok" or "error"
  value : String       // JS-like formatted value, or "" on error
  error : String       // formatted stack trace, or "" on ok
  stdout : String      // captured print(...) output
}
```

`EvalOutput` fields are `pub` so MoonBit-generated `.d.ts` exposes them as accessible properties on the JS side; the JS caller reads them as plain properties.

**Playground stdout mechanism**: a MoonBit `mut stdout : String` module-level buffer inside `cmd/moonjs-playground`. The `print` NativeFn appends to it. `eval_and_format` snapshots the buffer at the start (reset to `""`), and reads it back into `EvalOutput.stdout`. Non-reentrant per call, which is fine (single browser JS thread).

### 2.3 The `print` builtin

Constructed as `@value.NativeFunction::new("print", false, fn(this, args) { ... })` where the impl:
1. For each arg: format via the same JS-like formatter used for `EvalOutput.value`.
2. Join args with `" "`, append `"\n"`, push to module stdout buffer.
3. Return `Undefined`.

Installed onto `engine.globals` after `Engine::new()`. Because playground uses a fresh engine per `eval_and_format` call, no cross-call pollution.

### 2.4 JS-like value formatter

New MoonBit fn `format_js_value(v : @value.JSValue) -> String`:

| JSValue | Rendered |
|---|---|
| `Undefined` | `undefined` |
| `Null` | `null` |
| `Bool(true)` / `Bool(false)` | `true` / `false` |
| `Int32(n)` | decimal integer, e.g. `-42` |
| `Number(NaN)` | `NaN` |
| `Number(Infinity)` | `Infinity` (or `-Infinity`) |
| `Number(n)` where integer-valued | integer form (e.g. `3` not `3.0`) — matches JS Number toString |
| `Number(n)` otherwise | Double::to_string default |
| `Str(s)` | `"<escaped>"` — JSON-string style, backslash escapes |
| `Object(o)` | `[object Object]` (M1 minimum; M3 will delegate to `.toString()`) |
| `Function(f)` | `[Function: <name or 'anonymous'>]` |
| `NativeFn(nf)` | `[native]` |

M3+ can replace this with real `Object.prototype.toString.call(v)` dispatch.

### 2.5 Error formatter

For `JSException`:
1. Extract `.name` and `.message` from `exc.value` if it's an Object; else format via `format_js_value`.
2. First line: `"<name>: <message>"` (or the raw value string when no name/message).
3. For each frame in `exc.stack`:
   `    at <chunk_name> (<filename>:<line>:<col>)`

Filename `""` fallback: `<inline>`.

## 3. React `Playground.tsx` design

```tsx
import { useState, useEffect } from 'react';
import './Playground.css';

type EvalOutput = {
  kind: 'ok' | 'error';
  value: string;
  error: string;
  stdout: string;
};

type Runner = (source: string, filename: string) => EvalOutput;

export function Playground({ initialCode = '' }: { initialCode?: string }) {
  const [runner, setRunner] = useState<Runner | null>(null);
  const [source, setSource] = useState(initialCode);
  const [output, setOutput] = useState<EvalOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic import — client-only, code-split. Skips at SSR (window is undefined).
    if (typeof window === 'undefined') return;
    import('../moonjs-playground/moonjs-playground.js').then((mod) => {
      setRunner(() => mod.eval_and_format as Runner);
      setLoading(false);
    });
  }, []);

  const run = () => {
    if (!runner) return;
    try {
      setOutput(runner(source, '<playground>'));
    } catch (e: any) {
      setOutput({ kind: 'error', value: '', error: `Host error: ${e.message}`, stdout: '' });
    }
  };

  // ... render textarea + button + panels + sample chips
}
```

Sample chips use `setSource(...)` to load presets. UI text pulled from a small `useI18n` hook or read from rspress locale context.

### 3.1 SSR safety

Rspress SSGs pages at build time via a headless React render. Our component:
- Uses **no** top-level `import` of the moonjs bundle (only dynamic `import()` inside `useEffect`).
- `typeof window === 'undefined'` guard belt-and-suspenders.
- Initial render (`loading: true`) shows a placeholder textarea + disabled Run button; hydration replaces it once bundle loads.

### 3.2 Styling

Minimal CSS: monospace textarea, colored result panels (green ok, red error, gray stdout). Uses rspress CSS variables where possible (`--rp-c-brand`, `--rp-c-text-1`) so dark mode works automatically.

## 4. Build & distribution

### 4.1 `pnpm rebuild:engine`

```jsonc
// website/package.json scripts
{
  "rebuild:engine": "cd .. && moon build --target js --release && cp _build/js/release/build/cmd/moonjs-playground/moonjs-playground.js website/src/moonjs-playground/ && cp _build/js/release/build/cmd/moonjs-playground/moonjs-playground.d.ts website/src/moonjs-playground/ && cp _build/js/release/build/cmd/moonjs-playground/moonbit.d.ts website/src/moonjs-playground/"
}
```

Uses `--release` for smaller, minified output. Copies both the JS and the TS declaration files.

### 4.2 `website/src/moonjs-playground/moon.d.ts` shim

If the generated `.d.ts` uses `import type * as MoonBit from './moonbit.d.ts';` (as seen in current builds), we ship `moonbit.d.ts` alongside.

### 4.3 Committing

`website/src/moonjs-playground/*.js` and `*.d.ts` are checked in. `.gitignore` in the website directory needs a carve-out to allow them (it currently ignores `dist/` and `doc_build/`, which is fine).

### 4.4 CI / GitHub Pages

Deployment workflow (if any) runs `pnpm install && pnpm build`. No MoonBit install step required.

## 5. Docs page `guide/playground.mdx`

Structure:
- H1 title
- One paragraph intro: "Everything below runs in your browser via the MoonJS engine compiled to JavaScript. Refresh the tab if a script hangs."
- `<Playground initialCode="..." />` with a modest default snippet
- Sample chips underneath (or as component-internal buttons)
- Small "Known limits" note (no `arguments`, no `eval`, no console, no `setTimeout`, uses `print(...)` for output)

Chinese mirror at `docs/zh/guide/playground.mdx`.

## 6. Nav wiring

Add to `docs/en/_nav.json`:
```json
{ "text": "Playground", "link": "/guide/playground" }
```
And in `docs/zh/_nav.json`:
```json
{ "text": "Playground", "link": "/zh/guide/playground" }
```

The existing "Guide" nav still points at `guide/start/introduction`; Playground is a peer entry, not a Guide subitem.

## 7. Risks

- **MoonBit js-target export mechanics**: `#export_name` behavior in the current MoonBit toolchain must be verified with a tiny spike before writing the real `eval_and_format`. If `#export_name` alone doesn't produce ESM exports on a `foreign_library`, fall back to `link.js.exports` explicit list in `moon.pkg`.
- **Bundle size**: 18k lines debug, expected ~5-10k release. If chunk > 3 MB gzip, playground page load feels slow — mitigations (loading spinner, Worker) exist but not v1.
- **SSR crash**: rspress SSG must not evaluate the moonjs bundle at build time. Dynamic `import()` gated on `typeof window` is the mitigation.
- **Cross-package build path**: `pnpm rebuild:engine` uses `../` `cd`. Windows path handling is not tested (not a target platform for docs contributors).
