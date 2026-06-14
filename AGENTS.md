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
npm run build   # tsc --noEmit (type-check)
npm run test    # vitest run — includes drift guard
npm run lint    # biome check .
npm run format  # biome format --write .
```

## CONVENTIONS

- `tokens.css` is the canonical artifact. The TS map in `src/index.ts` mirrors it.
  `src/tokens.test.ts` fails the build if they drift — never update one without the other.
- Brand changes happen here first, then flow to consumers. Never fork token values in a
  consumer repo.
- The e-ink/mono token set is intentionally absent — it is CeraUI-only (reflective device
  displays) and does not belong in the shared palette.
- Linting/formatting: Biome 2.5 via `@ceralive/biome-config` — ESLint and Prettier are not
  used. The `biome.json` extends `@ceralive/biome-config` (`"extends": ["@ceralive/biome-config"]`),
  giving tabs, LF, single quotes, 100-col. Run `npm run lint` (check) or `npm run format`
  (apply fixes).

## ANTI-PATTERNS

- Don't add e-ink/mono tokens here — those are CeraUI-only.
- Don't fork token values in consumer repos — update here and publish.
- Don't add this repo to `REPOS` in `image-building-pipeline/fetch-debs.sh`.
