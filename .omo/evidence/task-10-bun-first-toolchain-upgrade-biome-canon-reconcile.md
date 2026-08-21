# Task 10 — Biome canon reconciliation (F1 review fix)

Date: 2026-08-21
Branch: `chore/bun-first-toolchain-upgrade`
Follows: `task-10-bun-first-toolchain-upgrade.md`

## Why this exists

Todo 10 was dispatched before Todo 4 (root) advanced the Biome canon, so this repo
deliberately held `@biomejs/biome` at `^2.5.8` to match the then-current
`biome-config/biome.json` pin. Todo 4 has since landed, making the hold skew; the
F1 reviewer flagged it independently, twice.

## Canon state at reconciliation time

Verified against the live registry, not assumed:

| Package | `npm view … version` | Canon target | Reachable today? |
| --- | --- | --- | --- |
| `@biomejs/biome` | `2.5.9` | `2.5.9` | yes |
| `@ceralive/biome-config` | `2026.8.0` | `2026.8.1` | **no** |

`npm view @ceralive/biome-config versions --json` returns exactly
`["1.0.0","2026.6.1","2026.6.2","2026.8.0"]`. Version `2026.8.1` exists only as an
unreleased source bump in the root worktree (`biome-config/package.json`, root
commit `0fd7630`); the `publish-biome-config` CI job publishes it when the root PR
merges. A resolution probe confirms the consequence:

```
$ bun install   # with "@ceralive/biome-config": "^2026.8.1"
error: No version matching "^2026.8.1" found for specifier "@ceralive/biome-config" (but package exists)
error: @ceralive/biome-config@^2026.8.1 failed to resolve
```

## What changed here

Pinning style preserved — this repo uses caret ranges, so caret ranges were kept.

| File | Before | After |
| --- | --- | --- |
| `package.json` | `"@biomejs/biome": "^2.5.8"` | `"@biomejs/biome": "^2.5.9"` |
| `biome.json` | `$schema` `…/2.5.8/schema.json` | `$schema` `…/2.5.9/schema.json` |
| `AGENTS.md` | "Biome 2.5.8 via `@ceralive/biome-config` 2026.8.0" | "Biome 2.5.9 via `@ceralive/biome-config` 2026.8.0" |

The `AGENTS.md` line is included per Rule A — this repo states its Biome canon in
prose, and that sentence also promises the `$schema` is pinned to "the same Biome
patch", which would have been false had only the dependency moved.

`@ceralive/biome-config` is left at `^2026.8.0` on purpose, in both the manifest and
the prose. The caret range already admits `2026.8.1`
(`^2026.8.0` = `>=2026.8.0 <2027.0.0`), so this consumer adopts the new canon config
automatically on the next install after the root publish, with no further edit here.
Writing `^2026.8.1` today would make `bun install` unresolvable and the gate red.

`bun.lock` regenerated: `@biomejs/biome@2.5.9`. No other dependency was touched.

## Verification

Run from the repo root under Bun 1.4.0. All commands exited zero.

| Command | Result |
| --- | --- |
| `bun install` | `+ @biomejs/biome@2.5.9`, 3 packages, lockfile saved |
| `bun x biome --version` | `Version: 2.5.9` |
| `bun run lint` | `Checked 7 files in 27ms. No fixes applied.` |
| `bun run build` | clean (`tsc --noEmit`, no diagnostics) |
| `bun run test` | `Test Files 1 passed (1)`, `Tests 5 passed (5)` (vitest 4.1.10 under `--bun`) |

The 5 tests include the `tokens.css` ↔ TS-map drift guard, which is the gate that
would fail if the palette and its typed mirror diverged.

## Residual

Once the root PR merges and `@ceralive/biome-config@2026.8.1` publishes, the
lockfile re-resolves on the next install. No `package.json` edit is required. The
`AGENTS.md` sentence will then need its `2026.8.0` updated to `2026.8.1` — that is a
prose-only follow-up, tracked in the effort's `issues.md`.
