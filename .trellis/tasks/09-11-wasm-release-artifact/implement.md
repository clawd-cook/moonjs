# Implement: release-asset engine + fetch-at-build

Task: `09-11-wasm-release-artifact`. Refers to `prd.md` + `design.md`.

## Execution order

1. `website/scripts/fetch-engine.mjs` (new).
2. `website/package.json` scripts (`fetch:engine`, `prebuild`, `predev`).
3. Playground component `<Playground>` — surface version.
4. `.github/workflows/release.yml` — upload JS bundle asset (via
   `actions/upload-artifact` in `verify`, `download-artifact` in
   `github-release`, then `gh release upload`).
5. `.github/workflows/pages.yml` — add `workflow_run` trigger + `if` gate.
6. Validate all AC.

## Step-by-step

### 1. `website/scripts/fetch-engine.mjs`

Copy the shape from design.md §4 verbatim. Manual Node smoke test:

```bash
cd website
node scripts/fetch-engine.mjs
```

Expected on success:
- `src/moonjs-playground/moonjs-playground.js` overwritten with the release asset
- `src/moonjs-playground/version.json` written with `tag`, `commit`, `downloaded_at`
- exit 0

Expected offline: warnings printed, `version.json` gets `notice`, bundle
untouched, exit 0.

### 2. `website/package.json`

Add scripts (keep alphabetical order in the scripts block):

- `fetch:engine`: `node scripts/fetch-engine.mjs`
- `prebuild`: `node scripts/fetch-engine.mjs`
- `predev`: `node scripts/fetch-engine.mjs`

Do NOT remove `rebuild:engine`; contributors still need the local `moon build`
path.

### 3. `<Playground>` component

Add:

```tsx
import versionInfo from '../moonjs-playground/version.json';
```

Wrap the JSON with a tolerant type since it might be a stub during first
build:

```tsx
type VersionInfo = { tag?: string; commit?: string; downloaded_at?: string; notice?: string };
const version = versionInfo as VersionInfo;
```

Render a small caption in the toolbar's right side (before the Run button, or
below it) linking to the release page. If `version.notice` is set, add a `⚠`
suffix with `title=version.notice`.

CSS class `moonjs-playground__version`. Minimal styling: `font-size: 11px;
color: var(--rp-c-text-2); text-decoration: none; margin-right: 8px;`.

### 4. `.github/workflows/release.yml`

Change 1 — upload JS bundle from `verify`:

Add step at end of `verify`:
```yaml
- name: Build engine bundle (js target)
  run: |
    set -euo pipefail
    curl -fsSL https://cli.moonbitlang.com/install/unix.sh | bash
    echo "$HOME/.moon/bin" >> "$GITHUB_PATH"
    moon build --target js --release
- name: Package engine artefact
  run: |
    set -euo pipefail
    mkdir -p release-engine
    cp _build/js/release/build/cmd/moonjs-playground/moonjs-playground.js release-engine/
    cp _build/js/release/build/cmd/moonjs-playground/moonjs-playground.d.ts release-engine/ || true
    cp _build/js/release/build/cmd/moonjs-playground/moonbit.d.ts release-engine/ || true
- uses: actions/upload-artifact@... # pin SHA
  with:
    name: moonjs-engine-${{ steps.resolve.outputs.tag }}
    path: release-engine/
    retention-days: 7
```

(Note `verify` already installs MoonBit — reuse. If moon build is already done
in the pnpm build step, this step is a no-op cache-hit.)

Change 2 — `github-release` job downloads + uploads:

Add before "Create or update Release" step:
```yaml
- uses: actions/download-artifact@... # pin SHA
  with:
    name: moonjs-engine-${{ needs.verify.outputs.tag }}
    path: release-engine/
```

And add after "Create or update Release":
```yaml
- name: Attach engine bundle to Release
  env:
    GH_TOKEN: ${{ github.token }}
    TAG: ${{ needs.verify.outputs.tag }}
  run: |
    set -euo pipefail
    gh release upload "${TAG}" release-engine/* --clobber
```

### 5. `.github/workflows/pages.yml`

Add `workflow_run` trigger:

```yaml
on:
  push:
    branches: [master]
    paths:
      - 'website/**'
      - '.github/workflows/pages.yml'
  workflow_dispatch:
  workflow_run:
    workflows: ["Release"]
    types: [completed]
    branches: [master]
```

Gate `build` job:

```yaml
jobs:
  build:
    if: >
      github.event_name != 'workflow_run' ||
      github.event.workflow_run.conclusion == 'success'
```

`build` job runs `pnpm install --frozen-lockfile` then `pnpm build` — the
latter automatically triggers `prebuild` which runs `fetch-engine.mjs`. The
Pages workflow needs `GITHUB_TOKEN` for the fetch; that's the default token
already in scope.

### 6. Validation

- `node website/scripts/fetch-engine.mjs` from a clean clone: fetches from
  the latest release (currently `v0.0.1`) and writes files.
- `pnpm --dir website build` succeeds; `version.json` shows `v0.0.1`.
- Playground page shows `Engine v0.0.1` linking to
  `https://github.com/clawd-cook/moonjs/releases/tag/v0.0.1`.
- Push a new tag (or `workflow_dispatch` a Release); after it succeeds,
  Pages workflow starts automatically; site updates within a few minutes.
- Simulated offline (unset network + delete `version.json` + run `pnpm build`)
  succeeds, keeps checked-in bundle, `version.json` shows a `notice`.

## Risks / rollback

- **fetch-engine breaking pnpm build**: `prebuild` scripts run before `build`;
  if a bug makes the script exit non-zero, `pnpm build` fails. The script is
  wrapped in `try/catch` that ALWAYS exits 0, so this can only happen if the
  script itself has a syntax error. Sanity-run it locally before landing.
- **Rollback**: revert commits; the checked-in bundle keeps working (design
  never removes it).

## Pre-start checklist

- [x] PRD Q2..Q6 decided.
- [x] design.md landed.
- [x] implement.md landed (this file).
- [ ] `implement.jsonl` / `check.jsonl` seeded.
- [ ] User review + start command.
