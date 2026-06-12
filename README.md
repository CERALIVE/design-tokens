# @ceralive/design-tokens

Single source of CeraLive brand tokens (OKLCH), extracted from CeraUI's
"Ground Control" theme. Published to npm as `@ceralive/design-tokens` and
consumed by the platform (`apps/marketing`, `apps/docs`, `apps/web`) and the
CeraUI device UI — every consumer depends on a published version, so the
palette never forks across repos.

## Install

```sh
npm i @ceralive/design-tokens
```

## Use

CSS (canonical artifact):

```css
@import "@ceralive/design-tokens/tokens.css" layer(base);
```

Tooling (OG images, canvas scripts — anywhere without `getComputedStyle`):

```ts
import { tokens, linkRamp, cssVar } from "@ceralive/design-tokens";

tokens("dark")["status-live"]; // "oklch(0.86 0.2 128)"
linkRamp("dark"); // 6-step spectral bonded-link ramp
cssVar("primary"); // "var(--primary)"
```

In browser code, prefer reading the CSS variables (`getComputedStyle` /
`var(--token)`) so runtime theming keeps working; the TS map is for tooling.

## Rules

- `tokens.css` is canonical; the TS map mirrors it and
  `src/tokens.test.ts` fails the build if they drift.
- The e-ink/mono token set is **not** here on purpose — it is CeraUI-only
  (reflective device displays).
- Brand changes happen here first, then flow to consumers; never fork values.
