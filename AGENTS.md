# design-tokens

Parent: [`../AGENTS.md`](../AGENTS.md)

## ROLE IN THE GROUP

Single source of CeraLive brand tokens (OKLCH). Extracted from CeraUI's "Ground Control"
theme and published to npm as `@ceralive/design-tokens`. Consumed by the platform
(`apps/marketing`, `apps/docs`, `apps/web`) and CeraUI — every consumer depends on a
published version so the palette never forks across repos.

**Not in the device image.** Not in `REPOS` in `image-building-pipeline/fetch-debs.sh`.

## STRUCTURE

```
design-tokens/
├── src/
│   ├── index.ts          # TS token map (mirrors tokens.css)
│   └── tokens.test.ts    # Drift guard — fails if TS map diverges from tokens.css
├── tokens.css            # Canonical CSS artifact (OKLCH custom properties)
├── biome.json            # Extends @ceralive/biome-config
├── tsconfig.json
├── vitest.config.ts
└── package.json          # @ceralive/design-tokens, published to npm
```

## WHERE TO LOOK

| Task | Location |
|------|----------|
| CSS token values (canonical) | `tokens.css` |
| TS token map + types | `src/index.ts` |
| Drift guard test | `src/tokens.test.ts` |

## COMMANDS

```bash
 bun run build   # tsc --noEmit (type-check)
 bun run test    # vitest run — includes drift guard
 bun run lint    # biome check .
 bun run format  # biome format --write .
```

## CONVENTIONS

- `tokens.css` is the canonical artifact. The TS map in `src/index.ts` mirrors it.
  `src/tokens.test.ts` fails the build if they drift — never update one without the other.
- Brand changes happen here first, then flow to consumers. Never fork token values in a
  consumer repo.
- The e-ink/mono token set is intentionally absent — it is CeraUI-only (reflective device
  displays) and does not belong in the shared palette.
- Package management: Bun 1.4.0 owns installs and the lockfile (`bun install`, `bun.lock`). npm remains
  only in `publish-release.yml` for Node 26 OIDC publishing.
- Linting/formatting: Biome 2.5.9 via `@ceralive/biome-config` 2026.8.0 — ESLint and Prettier are
  not used. The `biome.json` extends `@ceralive/biome-config` (`"extends": ["@ceralive/biome-config"]`),
  giving tabs, LF, single quotes, 100-col, and pins its `$schema` to the same Biome patch. Run
  `npm run lint` (check) or `npm run format` (apply fixes).
- TypeScript 7 (`typescript@^7.0.2`, the native compiler). This repo has no embedded-language
  checker (no svelte-check / astro check), so it type-checks with plain `tsc` and was safe to flip.
  `tsconfig.json` already used `moduleResolution: "bundler"` with no `baseUrl`, so the TS7 removals
  needed no migration — do not reintroduce `moduleResolution: node`/`node10`/`classic` or `baseUrl`.
  `types: ["node"]` is set explicitly because TS7 defaults `types` to `[]`.

## CI

Two workflows, both on the CeraLive **Node 26** baseline:

| Workflow | Trigger | Role |
|----------|---------|------|
| `ci.yml` | PR + push to `main`/`release/**` + manual | **Required gate** — `bun install --frozen-lockfile`, lint, build, tests. No `continue-on-error`. |
| `publish-release.yml` | `v*` tag + manual | Re-runs the gate, then publishes to npm via OIDC trusted publishing. |

## ANTI-PATTERNS

- Don't add e-ink/mono tokens here — those are CeraUI-only.
- Don't fork token values in consumer repos — update here and publish.
- Don't add this repo to `REPOS` in `image-building-pipeline/fetch-debs.sh`.
