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

## Consumption patterns

The package ships two artifacts: [`tokens.css`](./tokens.css) (the canonical
OKLCH custom properties) and [`src/index.ts`](./src/index.ts) (a typed mirror
for tooling). Pick the artifact that matches the environment.

### CSS custom properties (canonical)

Import the stylesheet once, then read tokens as `var(--token)`. Theme switching
keeps working because the browser resolves the variable live against the active
`:root` / `.dark` block.

```css
@import "@ceralive/design-tokens/tokens.css" layer(base);

.cta {
	background: var(--primary);
	color: var(--primary-foreground);
	border-radius: var(--radius);
}
```

### Tailwind color extension

Map the CSS variables onto Tailwind utilities so `bg-primary`,
`text-status-live`, etc. resolve to the live token. No JS import is needed — the
values come from the imported stylesheet, so runtime theming still works.

```js
// tailwind.config.js
export default {
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				'primary-foreground': 'var(--primary-foreground)',
				'status-live': 'var(--status-live)',
				// every --token is available as var(--token)
			},
			borderRadius: { DEFAULT: 'var(--radius)' },
		},
	},
};
```

### TS map for tooling

Use the typed map anywhere `getComputedStyle` is unavailable — OG-image
generation, canvas/SVG scripts, email templates.

```ts
import { tokens, linkRamp, cssVar, type Mode, type TokenName } from '@ceralive/design-tokens';

const mode: Mode = 'dark';
tokens(mode)['status-live']; // "oklch(0.86 0.2 128)"
linkRamp(mode); // 6-step spectral bonded-link ramp
cssVar('primary'); // "var(--primary)"

const key: TokenName = 'primary'; // typed token name (autocompleted, drift-checked)
```

Need the raw per-mode maps (e.g. to diff or snapshot the palette)? Import them
directly:

```ts
import { lightTokens, darkTokens } from '@ceralive/design-tokens';

lightTokens['safe-area-padding']; // "max(1rem, env(safe-area-inset-bottom))"
darkTokens['status-live']; // "oklch(0.86 0.2 128)"
```

In browser code prefer the CSS variables over the TS map, so runtime theme
switching keeps working; the map is for build-time and headless tooling.

### PWA layout tokens

Three mode-invariant layout tokens (identical in light and dark) support
PWA / touch shells. They are plain lengths, not colors:

| Token | Value | Use |
|-------|-------|-----|
| `--touch-target` | `44px` | Minimum WCAG 2.5.5 touch-target size |
| `--pull-refresh-offset` | `48px` | Pull-to-refresh travel distance |
| `--safe-area-padding` | `max(1rem, env(safe-area-inset-bottom))` | Bottom inset on notched / gesture-bar devices |

```css
.app-shell {
	min-block-size: var(--touch-target);
	padding-block-end: var(--safe-area-padding);
}

.pull-to-refresh {
	transform: translateY(var(--pull-refresh-offset));
}
```

## Token palette

A quick reference to the token families in [`tokens.css`](./tokens.css). See the
file for the full per-mode values.

| Family | Representative tokens |
|--------|-----------------------|
| Surfaces | `--background`, `--foreground`, `--card`, `--popover` |
| Brand | `--primary`, `--ring`, `--accent`, `--secondary`, `--muted` |
| Stream status | `--status-live`, `--status-standby`, `--status-idle` |
| Semantic status | `--status-success`, `--status-info`, `--status-warning`, `--status-error`, `--status-neutral` |
| Signal quality | `--signal-excellent`, `--signal-good`, `--signal-fair`, `--signal-weak` |
| Spectral link ramp | `--link-1` … `--link-6`, `--link-bar-empty` |
| Elevation | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Gradient endpoints | `--gradient-primary-to`, `--gradient-success-to`, `--gradient-info-to`, `--gradient-destructive-to`, `--gradient-warning-to` |
| Layout (mode-invariant) | `--radius`, `--touch-target`, `--pull-refresh-offset`, `--safe-area-padding` |

## Dist-tags

| Tag | Channel | Pin |
|-----|---------|-----|
| `@latest` | Current stable release. What `npm i @ceralive/design-tokens` installs by default. | Consumers pin this. |
| `@next` | Preview / release candidate carrying unreleased token changes for early integration. | `npm i @ceralive/design-tokens@next` |

Released versions follow CalVer (`YYYY.MINOR.PATCH`); see
[`CHANGELOG.md`](./CHANGELOG.md).

## Rules

- [`tokens.css`](./tokens.css) is canonical; the TS map mirrors it and
  [`src/tokens.test.ts`](./src/tokens.test.ts) fails the build if they drift.
- The e-ink/mono token set is **not** here on purpose — it is CeraUI-only
  (reflective device displays).
- Brand changes happen here first, then flow to consumers; never fork values.
