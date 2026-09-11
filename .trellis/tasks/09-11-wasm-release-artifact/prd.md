# Release-asset engine + fetch-at-build

_(Task rescoped: original title was "wasm release artifact + fetch at build" but Q1 spike
showed MoonBit wasm-target String ABI blocks a clean glue path. See §"Rescope note".)_

## Goal

Every GitHub Release also ships the `moonjs-playground.js` bundle (already built by the
release workflow's MoonBit js target step). The Pages / website build fetches the
**latest release**'s asset before `pnpm build`, refreshes the checked-in bundle,
writes a `version.json` next to it, and the Playground UI shows the running engine
version. On a fresh release, Pages redeploys automatically (via `workflow_run`
trigger) so the site tracks the newest engine.

## Rescope note

The task title still reads "wasm" but the plan has pivoted to **JS bundle as release
asset**. Reason: MoonBit's traditional `--target wasm` module exports only the entry
function (`eval_and_format(i32, i32) -> ???`), does NOT export `memory` / `malloc` /
`free`, and the String ABI is not documented. A working glue requires either adding
a full marshalling helper layer in MoonBit (Path A of PRD-v1) or reverse-engineering
the String layout (Path B / D of PRD-v1). Both were rejected as too speculative.
The `js` target already produces a working ESM bundle. The **product need** — "the
website uses the latest engine and shows the version" — is fully served by shipping
that bundle as a release asset. Wasm is a possible future optimisation, not a
requirement.

## Confirmed Facts

- `.github/workflows/release.yml` (`release` workflow) currently:
  - Builds `--target js --release` in the `verify` job (as part of running `pnpm build`,
    which does not re-run `moon build`).
  - Publishes to mooncakes.io.
  - Creates a GitHub Release with a source tarball, no other assets.
- `.github/workflows/pages.yml` currently:
  - Triggers on `push` to `master` under `website/**` or on `workflow_dispatch`.
  - Runs `pnpm build` under `website/`.
  - Deploys to Pages.
- `website/src/moonjs-playground/moonjs-playground.js` is checked in (802 KB) and
  imported by the Playground React component via dynamic `import()`.
- Node has `fetch` built in since v18; `ubuntu-latest` runners come with Node ≥ 20.

## Decisions (Q2..Q6)

- **Q2 → A** — build-time fetch + version pin. Website `prebuild:fetch-engine`
  script downloads the release's `moonjs-playground.js` before `pnpm build`.
- **Q3 → C-revised** — no wasm; ship the JS bundle as a release asset instead.
  (Wasm attempted, blocked by String-ABI unknowns.)
- **Q4 → A** — record version via `website/src/moonjs-playground/version.json`
  (`{ "tag", "commit", "downloaded_at", "notice"? }`). Playground UI shows
  `Engine: v0.0.1` linking to the release.
- **Q5 → A + B** — release workflow uploads the JS bundle as an asset **and**
  pages workflow adds a `workflow_run` trigger so a successful release
  auto-redeploys the site.
- **Q6 → A** — checked-in bundle acts as offline fallback. `prebuild:fetch-engine`
  attempts to overwrite it; on network failure, keeps the local copy and writes
  a `notice` field to `version.json`. Never fails the build purely because
  fetching failed.

## Requirements

### Functional
- **R1.** Release workflow's `github-release` job uploads `moonjs-playground.js`
  (from the same source moon build that produced it in `_build/js/release/...`)
  as a release asset. Filename literally `moonjs-playground.js`.
- **R2.** Alongside the JS bundle, upload `moonjs-playground.d.ts` and
  `moonbit.d.ts` (for downstream TypeScript consumers). Optional but low cost.
- **R3.** New script `website/scripts/fetch-engine.mjs` (Node ESM) that:
  - Calls `GET https://api.github.com/repos/clawd-cook/moonjs/releases/latest`.
  - Downloads asset `moonjs-playground.js` (and `.d.ts` files if present) into
    `website/src/moonjs-playground/`.
  - Writes `website/src/moonjs-playground/version.json` with `{ tag, commit,
    downloaded_at, notice? }`.
  - **On failure** (network, 404, non-2xx): logs a warning, keeps the current
    files, writes `version.json` with `notice: "fetch failed: <reason>; using
    checked-in bundle"`. **Never exits non-zero.**
- **R4.** `website/package.json` adds two npm scripts:
  - `fetch:engine` — runs `node scripts/fetch-engine.mjs`.
  - `prebuild` — automatically runs before `build` (pnpm convention), invokes
    `fetch:engine`.
- **R5.** Playground React component reads `version.json` (static import) and
  renders a small caption `Engine: <tag>` linking to
  `https://github.com/clawd-cook/moonjs/releases/tag/<tag>`. If `notice` present
  in `version.json`, show a subtle warning icon with tooltip.
- **R6.** Pages workflow gains a `workflow_run` trigger that fires when the
  Release workflow completes successfully. New run only if the source event
  was a tag push (not a `workflow_dispatch` re-run of Release).
- **R7.** Contributors can still run `pnpm rebuild:engine` locally (unchanged
  script) to overwrite the checked-in bundle from a local MoonBit build without
  going through fetch.

### Non-functional
- **N1.** Website build stays pnpm-only. No moonbit toolchain required.
- **N2.** Website build stays functional offline (fetch failure ≠ build failure).
- **N3.** No new npm dependencies. `fetch-engine.mjs` uses Node built-ins.
- **N4.** All actions pinned by SHA; no secrets required beyond `GITHUB_TOKEN`.

## Acceptance Criteria

- [ ] After the next `v*` tag push, the GitHub Release page has a
      `moonjs-playground.js` asset attached.
- [ ] `pnpm --dir website fetch:engine` (from a clean clone, no local moon)
      downloads `moonjs-playground.js` and writes `version.json` with the
      current release tag.
- [ ] `pnpm --dir website build` succeeds offline (fetch step logs a warning,
      Playground still works with the checked-in bundle).
- [ ] Playground page shows `Engine: vX.Y.Z` in the footer (or nearby) linking
      to the release.
- [ ] A successful Release workflow run automatically kicks off a Pages
      workflow run within 1 minute.
- [ ] `moon check --deny-warn --target native` still passes (no engine
      changes).

## Out of Scope

- Actual wasm compilation / distribution (deferred pending MoonBit String ABI
  clarity).
- Persistent asset versioning per-release in Pages (i.e. keeping older engine
  versions live at `.../v0.0.1/` paths). Site always reflects latest.
- Automatic PR creation to commit the fetched bundle back to master. If
  desirable later, use a `peter-evans/create-pull-request` action; not v1.

## Open Questions

None blocking.
