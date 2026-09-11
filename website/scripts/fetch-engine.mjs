#!/usr/bin/env node
// website/scripts/fetch-engine.mjs
//
// Downloads the latest MoonJS release's Playground JS bundle from GitHub
// Releases and writes it into `website/src/moonjs-playground/`, plus a
// version.json alongside it recording the release tag and commit.
//
// Best-effort contract:
// - Success: refresh the bundle files + write version.json { tag, commit, downloaded_at }.
// - Any failure (network, no release, missing asset, non-2xx): log a warning,
//   keep the currently-checked-in bundle, write version.json with a `notice`
//   field describing the failure. **Never exits non-zero** — the docs build
//   must not fail because the API is temporarily unreachable.
//
// Node built-ins only. Uses global `fetch` (Node ≥ 18) and node:fs/promises.

import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const REPO = process.env.MOONJS_REPO || 'clawd-cook/moonjs';
const HERE = dirname(fileURLToPath(import.meta.url));
const TARGET_DIR = join(HERE, '..', 'src', 'moonjs-playground');
const VERSION_FILE = join(TARGET_DIR, 'version.json');
const WANTED = ['moonjs-playground.js', 'moonjs-playground.d.ts', 'moonbit.d.ts'];

const ghHeaders = (token) => ({
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'moonjs-fetch-engine',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const assetHeaders = (token) => ({
  ...ghHeaders(token),
  Accept: 'application/octet-stream',
});

async function fetchJson(url, token) {
  const r = await fetch(url, { headers: ghHeaders(token) });
  if (!r.ok) {
    throw new Error(`GET ${url}: ${r.status} ${r.statusText}`);
  }
  return r.json();
}

async function fetchBinary(url, token) {
  const r = await fetch(url, {
    headers: assetHeaders(token),
    redirect: 'follow',
  });
  if (!r.ok) {
    throw new Error(`GET ${url}: ${r.status} ${r.statusText}`);
  }
  return Buffer.from(await r.arrayBuffer());
}

async function writeVersionFile(payload) {
  await mkdir(TARGET_DIR, { recursive: true });
  await writeFile(VERSION_FILE, JSON.stringify(payload, null, 2) + '\n', 'utf8');
}

function readExistingVersion() {
  if (!existsSync(VERSION_FILE)) return {};
  try {
    return JSON.parse(readFileSync(VERSION_FILE, 'utf8'));
  } catch {
    return {};
  }
}

async function noteFailure(msg) {
  // Best-effort — surface the reason to the Playground UI via
  // `version.json.notice`. Preserve prior tag/commit if present so a stale
  // pin stays visible.
  const existing = readExistingVersion();
  const payload = {
    ...existing,
    notice: `fetch failed: ${msg}; using checked-in bundle`,
    downloaded_at_attempt: new Date().toISOString(),
  };
  try {
    await writeVersionFile(payload);
  } catch {
    // Nothing we can do; swallow.
  }
}

async function main() {
  const token = process.env.GITHUB_TOKEN || '';
  let release;
  try {
    release = await fetchJson(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      token,
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(`fetch-engine: WARN ${msg}`);
    console.warn('fetch-engine: keeping checked-in bundle');
    await noteFailure(msg);
    return;
  }

  const tag = release.tag_name;
  const commit = release.target_commitish;
  const assets = Array.isArray(release.assets) ? release.assets : [];

  let refreshed = 0;
  for (const name of WANTED) {
    const asset = assets.find((a) => a.name === name);
    if (!asset) {
      console.warn(
        `fetch-engine: asset '${name}' not on release ${tag}, skipping`,
      );
      continue;
    }
    try {
      const buf = await fetchBinary(asset.url, token);
      await writeFile(join(TARGET_DIR, name), buf);
      refreshed += 1;
      console.log(`fetch-engine: fetched ${name} (${buf.length} bytes)`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`fetch-engine: WARN failed to fetch ${name}: ${msg}`);
    }
  }

  await writeVersionFile({
    tag,
    commit,
    downloaded_at: new Date().toISOString(),
    refreshed_files: refreshed,
  });
  console.log(`fetch-engine: pinned to ${tag} (${refreshed} file(s) refreshed)`);
}

main().catch((e) => {
  const msg = e instanceof Error ? e.message : String(e);
  console.warn(`fetch-engine: unexpected error ${msg}`);
  console.warn('fetch-engine: keeping checked-in bundle');
  noteFailure(msg).catch(() => {});
  // Explicitly do NOT propagate — exit 0 always.
});
