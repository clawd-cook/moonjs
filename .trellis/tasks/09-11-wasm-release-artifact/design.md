# Design: release-asset engine + fetch-at-build

Task: `09-11-wasm-release-artifact`. Refers to `prd.md`.

## 1. Data flow

```
             ┌───────────────────────────┐
Tag push     │ release.yml               │
──────────►  │ ┌───────────────────────┐ │
             │ │ verify                │ │
             │ │  moon build --js      │ │  produces _build/js/release/build/
             │ └───────────────────────┘ │  cmd/moonjs-playground/*
             │ ┌───────────────────────┐ │
             │ │ publish-mooncakes     │ │
             │ └───────────────────────┘ │
             │ ┌───────────────────────┐ │
             │ │ github-release        │ │  gh release upload:
             │ │  + upload JS bundle   │ │    moonjs-playground.js
             │ │  + upload .d.ts       │ │    moonjs-playground.d.ts
             │ │                       │ │    moonbit.d.ts
             │ └───────────────────────┘ │
             └───────────────────────────┘
                          │
                          │ workflow_run: completed && success
                          ▼
             ┌───────────────────────────┐
             │ pages.yml                 │
             │ ┌───────────────────────┐ │
             │ │ build                 │ │
             │ │  prebuild:fetch-engine│ │  fetch latest release asset
             │ │  pnpm build (rspress) │ │  → website/src/moonjs-playground/
             │ │                       │ │    moonjs-playground.js
             │ │                       │ │    version.json
             │ └───────────────────────┘ │
             │ ┌───────────────────────┐ │
             │ │ deploy → Pages        │ │
             │ └───────────────────────┘ │
             └───────────────────────────┘
```

## 2. `.github/workflows/release.yml` diff

In the existing `github-release` job, after the "Create or update Release" step
add another step that builds the JS bundle (or reads it from
`_build/js/release/build/cmd/moonjs-playground/`) and calls
`gh release upload <tag> moonjs-playground.js …`.

Concrete: `verify` already runs `pnpm build`, which itself invokes
`prebuild:fetch-engine`, which — for a fresh release cutting a version that
doesn't yet exist on GitHub — will 404 and fall back to the checked-in bundle.
That's fine.

But `github-release` needs the freshly-built JS artefact. Simplest:
`github-release` has its own step that runs `moon build --target js --release`
and uploads from `_build/js/release/build/cmd/moonjs-playground/*`. (This
re-installs MoonBit in that job — small extra cost.)

Alternative to avoid re-installing MoonBit in two jobs:
`verify` uploads an artifact via `actions/upload-artifact`; `github-release`
downloads it. Slightly cleaner. **Adopt this variant.**

## 3. `.github/workflows/pages.yml` diff

Add a second trigger:

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

Then in the `build` job, gate on:

```yaml
if: >
  github.event_name != 'workflow_run' ||
  github.event.workflow_run.conclusion == 'success'
```

so failed release runs don't trigger a broken redeploy.

The `prebuild:fetch-engine` runs as part of `pnpm build` (pnpm's `prebuild`
convention). It uses `GITHUB_TOKEN` when available (to avoid the 60-req/hr
anon rate limit) but works without a token for local dev.

## 4. `website/scripts/fetch-engine.mjs` shape

```js
#!/usr/bin/env node
// Node built-ins only. No external deps.
import { writeFile, mkdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = process.env.MOONJS_REPO || 'clawd-cook/moonjs';
const HERE = dirname(fileURLToPath(import.meta.url));
const TARGET_DIR = join(HERE, '..', 'src', 'moonjs-playground');

async function fetchJson(url, token) {
  const r = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'User-Agent': 'moonjs-fetch-engine',
    },
  });
  if (!r.ok) throw new Error(`${url}: ${r.status} ${r.statusText}`);
  return r.json();
}

async function fetchBinary(url, token) {
  const r = await fetch(url, {
    headers: {
      Accept: 'application/octet-stream',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'User-Agent': 'moonjs-fetch-engine',
    },
    redirect: 'follow',
  });
  if (!r.ok) throw new Error(`${url}: ${r.status} ${r.statusText}`);
  return Buffer.from(await r.arrayBuffer());
}

async function writeVersionFile(payload) {
  await mkdir(TARGET_DIR, { recursive: true });
  await writeFile(join(TARGET_DIR, 'version.json'),
    JSON.stringify(payload, null, 2) + '\n');
}

async function main() {
  const token = process.env.GITHUB_TOKEN || '';
  try {
    const release = await fetchJson(
      `https://api.github.com/repos/${REPO}/releases/latest`, token);
    const tag = release.tag_name;
    const commit = release.target_commitish;
    const assets = release.assets || [];
    // Files we want to refresh
    const wanted = ['moonjs-playground.js', 'moonjs-playground.d.ts', 'moonbit.d.ts'];
    for (const name of wanted) {
      const a = assets.find((x) => x.name === name);
      if (!a) {
        console.warn(`fetch-engine: asset '${name}' not on release ${tag}, skipping`);
        continue;
      }
      const buf = await fetchBinary(a.url, token);
      await writeFile(join(TARGET_DIR, name), buf);
      console.log(`fetched ${name} (${buf.length} bytes)`);
    }
    await writeVersionFile({
      tag,
      commit,
      downloaded_at: new Date().toISOString(),
    });
    console.log(`fetch-engine: pinned to ${tag}`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(`fetch-engine: WARN ${msg}`);
    console.warn(`fetch-engine: keeping checked-in bundle`);
    // Best-effort: write a version.json noting the failure
    try {
      // Do not overwrite an existing tag/commit if one exists; append notice
      const existing = await stat(join(TARGET_DIR, 'version.json'))
        .then(() => import('node:fs').then((fs) =>
          JSON.parse(fs.readFileSync(join(TARGET_DIR, 'version.json'), 'utf8'))))
        .catch(() => ({}));
      await writeVersionFile({
        ...existing,
        notice: `fetch failed: ${msg}; using checked-in bundle`,
        downloaded_at_attempt: new Date().toISOString(),
      });
    } catch { /* swallow */ }
    // Explicit: never fail the build here.
  }
}

main();
```

## 5. `website/package.json` scripts

```jsonc
{
  "scripts": {
    "build": "rspress build",
    "dev": "rspress dev",
    "fetch:engine": "node scripts/fetch-engine.mjs",
    "prebuild": "node scripts/fetch-engine.mjs",
    "predev": "node scripts/fetch-engine.mjs",
    // ... existing entries stay
  }
}
```

`prebuild` runs automatically before `pnpm build`. `predev` runs before `pnpm dev`.
Both are best-effort; nothing fails builds.

## 6. Playground component change

Add a static JSON import (rspress + rsbuild support JSON module imports):

```tsx
import versionInfo from '../moonjs-playground/version.json';

// inside Playground render:
{versionInfo?.tag && (
  <a
    className="moonjs-playground__version"
    href={`https://github.com/clawd-cook/moonjs/releases/tag/${versionInfo.tag}`}
    target="_blank"
    rel="noopener noreferrer"
    title={versionInfo.notice ?? `Built ${versionInfo.downloaded_at ?? ''}`}
  >
    Engine {versionInfo.tag}
    {versionInfo.notice ? ' ⚠' : ''}
  </a>
)}
```

Rendered small, e.g. top-right of the toolbar or bottom-right of the output pane.

## 7. Local-dev / offline story

- `pnpm dev` on a laptop: `predev` script runs, hits network, may 404 (no release
  yet) — writes `version.json` with `notice`, keeps checked-in bundle. Site
  still loads, Playground still works, tooltip shows the notice.
- `pnpm rebuild:engine` still works — regenerates the bundle from local
  MoonBit source (unchanged workflow). Overwrites whatever `fetch-engine` put
  there. Contributor commits the update if they want to bake a pre-release
  into the repo.

## 8. Risks

- **GitHub API rate limit**: anon = 60 req/hr per IP. `pnpm build` fires 1 API +
  ~3 asset fetches per run, so a solo dev hits < 5/hr; CI uses `GITHUB_TOKEN`
  and has 1000/hr.
- **workflow_run may miss the first release**: `workflow_run` triggers require
  the target workflow (`Release`) to have run at least once on the default
  branch. Our Release workflow has already run for `v0.0.1`, so this is
  satisfied.
- **Race**: `workflow_run` fires when the Release workflow completes, but a
  Release-created asset may take a few seconds to become visible via API.
  Pages `fetch-engine` retries could be added, but v1 skips this — the next
  `push` to master or `workflow_dispatch` catches up.
- **404 on first tag ever**: `releases/latest` returns 404 if no release
  exists. `fetch-engine.mjs` treats 404 as "no release yet, keep local" —
  fine.
