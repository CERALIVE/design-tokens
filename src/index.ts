/**
 * CeraLive brand tokens — typed mirror of tokens.css.
 *
 * tokens.css is the canonical artifact (browsers consume it directly);
 * this map exists for tooling: OG-image generation, canvas/SVG scripts,
 * email templates — anywhere getComputedStyle is unavailable.
 * `tokens.test.ts` enforces that the two never drift.
 */

export const lightTokens = {
	background: 'oklch(0.98 0.004 150)',
	foreground: 'oklch(0.15 0.015 150)',
	card: 'oklch(0.96 0.004 150)',
	'card-foreground': 'oklch(0.15 0.015 150)',
	popover: 'oklch(0.98 0.003 150)',
	'popover-foreground': 'oklch(0.15 0.015 150)',
	primary: 'oklch(0.4 0.18 128)',
	'primary-foreground': 'oklch(0.98 0.003 0)',
	secondary: 'oklch(0.93 0.005 150)',
	'secondary-foreground': 'oklch(0.22 0.014 150)',
	muted: 'oklch(0.92 0.005 150)',
	'muted-foreground': 'oklch(0.42 0.018 150)',
	accent: 'oklch(0.9 0.006 150)',
	'accent-foreground': 'oklch(0.18 0.016 150)',
	destructive: 'oklch(0.55 0.22 25)',
	'destructive-foreground': 'oklch(0.98 0.004 0)',
	border: 'oklch(0.88 0.006 150)',
	input: 'oklch(0.9 0.005 150)',
	ring: 'oklch(0.4 0.18 128)',
	radius: '0.5rem',
	'touch-target': '44px',
	'pull-refresh-offset': '48px',
	'safe-area-padding': 'max(1rem, env(safe-area-inset-bottom))',
	'switch-off': 'oklch(0.66 0.022 150)',
	'switch-off-foreground': 'oklch(0.99 0.004 150)',
	'sidebar-background': 'oklch(0.94 0.005 150)',
	'sidebar-foreground': 'oklch(0.22 0.014 150)',
	'sidebar-primary': 'oklch(0.4 0.18 128)',
	'sidebar-primary-foreground': 'oklch(0.98 0.003 0)',
	'sidebar-accent': 'oklch(0.9 0.006 150)',
	'sidebar-accent-foreground': 'oklch(0.22 0.014 150)',
	'sidebar-border': 'oklch(0.86 0.006 150)',
	'sidebar-ring': 'oklch(0.4 0.18 128)',
	'status-success': 'oklch(0.5 0.15 150)',
	'status-success-foreground': 'oklch(0.99 0.003 0)',
	'status-info': 'oklch(0.5 0.16 245)',
	'status-info-foreground': 'oklch(0.99 0.003 0)',
	'status-warning': 'oklch(0.52 0.13 65)',
	'status-warning-foreground': 'oklch(0.99 0.003 0)',
	'status-error': 'oklch(0.55 0.22 25)',
	'status-error-foreground': 'oklch(0.99 0.004 0)',
	'status-neutral': 'oklch(0.45 0.018 150)',
	'status-neutral-foreground': 'oklch(0.99 0.003 0)',
	'status-live': 'oklch(0.45 0.16 128)',
	'status-standby': 'oklch(0.55 0.14 70)',
	'status-idle': 'oklch(0.55 0.01 150)',
	'signal-excellent': 'oklch(0.5 0.16 145)',
	'signal-good': 'oklch(0.52 0.15 110)',
	'signal-fair': 'oklch(0.55 0.14 75)',
	'signal-weak': 'oklch(0.52 0.18 30)',
	'link-1': 'oklch(0.55 0.17 128)',
	'link-2': 'oklch(0.55 0.15 200)',
	'link-3': 'oklch(0.52 0.16 252)',
	'link-4': 'oklch(0.5 0.18 292)',
	'link-5': 'oklch(0.58 0.16 65)',
	'link-6': 'oklch(0.55 0.2 20)',
	'link-bar-empty': 'color-mix(in oklab, var(--muted-foreground) 55%, transparent)',
	'shadow-sm': '0 1px 2px 0 oklch(0.15 0.015 150 / 0.08)',
	'shadow-md': '0 4px 12px -2px oklch(0.15 0.015 150 / 0.1)',
	'shadow-lg': '0 12px 28px -6px oklch(0.15 0.015 150 / 0.14)',
	'gradient-primary-to': 'oklch(0.45 0.15 150)',
	'gradient-success-to': 'oklch(0.45 0.14 165)',
	'gradient-info-to': 'oklch(0.45 0.16 255)',
	'gradient-destructive-to': 'oklch(0.48 0.2 15)',
	'gradient-warning-to': 'oklch(0.5 0.13 60)',
} as const satisfies Record<string, string>;

export const darkTokens = {
	background: 'oklch(0.15 0.012 150)',
	foreground: 'oklch(0.95 0.008 150)',
	card: 'oklch(0.18 0.01 150)',
	'card-foreground': 'oklch(0.95 0.008 150)',
	popover: 'oklch(0.2 0.01 150)',
	'popover-foreground': 'oklch(0.95 0.008 150)',
	primary: 'oklch(0.86 0.2 128)',
	'primary-foreground': 'oklch(0.1 0.02 150)',
	secondary: 'oklch(0.24 0.012 150)',
	'secondary-foreground': 'oklch(0.9 0.008 150)',
	muted: 'oklch(0.22 0.01 150)',
	'muted-foreground': 'oklch(0.62 0.015 150)',
	accent: 'oklch(0.26 0.012 150)',
	'accent-foreground': 'oklch(0.92 0.008 150)',
	destructive: 'oklch(0.56 0.22 25)',
	'destructive-foreground': 'oklch(0.98 0.004 0)',
	border: 'oklch(0.28 0.012 150)',
	input: 'oklch(0.24 0.01 150)',
	ring: 'oklch(0.86 0.2 128)',
	'touch-target': '44px',
	'pull-refresh-offset': '48px',
	'safe-area-padding': 'max(1rem, env(safe-area-inset-bottom))',
	'switch-off': 'oklch(0.52 0.028 150)',
	'switch-off-foreground': 'oklch(0.96 0.008 150)',
	'sidebar-background': 'oklch(0.13 0.01 150)',
	'sidebar-foreground': 'oklch(0.88 0.008 150)',
	'sidebar-primary': 'oklch(0.86 0.2 128)',
	'sidebar-primary-foreground': 'oklch(0.1 0.02 150)',
	'sidebar-accent': 'oklch(0.22 0.01 150)',
	'sidebar-accent-foreground': 'oklch(0.88 0.008 150)',
	'sidebar-border': 'oklch(0.26 0.01 150)',
	'sidebar-ring': 'oklch(0.86 0.2 128)',
	'status-success': 'oklch(0.8 0.18 145)',
	'status-success-foreground': 'oklch(0.15 0.02 150)',
	'status-info': 'oklch(0.74 0.13 230)',
	'status-info-foreground': 'oklch(0.15 0.02 230)',
	'status-warning': 'oklch(0.8 0.16 75)',
	'status-warning-foreground': 'oklch(0.2 0.04 75)',
	'status-error': 'oklch(0.64 0.2 25)',
	'status-error-foreground': 'oklch(0.99 0.004 25)',
	'status-neutral': 'oklch(0.62 0.015 150)',
	'status-neutral-foreground': 'oklch(0.12 0.02 150)',
	'status-live': 'oklch(0.86 0.2 128)',
	'status-standby': 'oklch(0.8 0.16 75)',
	'status-idle': 'oklch(0.45 0.01 150)',
	'signal-excellent': 'oklch(0.82 0.2 128)',
	'signal-good': 'oklch(0.78 0.18 100)',
	'signal-fair': 'oklch(0.76 0.16 75)',
	'signal-weak': 'oklch(0.6 0.16 35)',
	'link-1': 'oklch(0.84 0.2 128)',
	'link-2': 'oklch(0.76 0.18 188)',
	'link-3': 'oklch(0.72 0.16 252)',
	'link-4': 'oklch(0.74 0.18 292)',
	'link-5': 'oklch(0.78 0.18 65)',
	'link-6': 'oklch(0.7 0.18 15)',
	'link-bar-empty': 'color-mix(in oklab, var(--muted-foreground) 55%, transparent)',
	'shadow-sm': '0 1px 2px 0 oklch(0 0 0 / 0.4)',
	'shadow-md': '0 4px 8px -2px oklch(0 0 0 / 0.45)',
	'shadow-lg': '0 12px 28px -6px oklch(0 0 0 / 0.55)',
	'gradient-primary-to': 'oklch(0.72 0.16 150)',
	'gradient-success-to': 'oklch(0.68 0.15 165)',
	'gradient-info-to': 'oklch(0.6 0.15 255)',
	'gradient-destructive-to': 'oklch(0.5 0.18 15)',
	'gradient-warning-to': 'oklch(0.7 0.15 55)',
} as const satisfies Record<string, string>;

export type TokenName = keyof typeof lightTokens;
export type Mode = 'light' | 'dark';

const LINK_RAMP_NAMES = [
	'link-1',
	'link-2',
	'link-3',
	'link-4',
	'link-5',
	'link-6',
] as const satisfies readonly TokenName[];

export function tokens(mode: Mode): Readonly<Record<TokenName, string>> {
	// Dark spreads over light so mode-invariant tokens (--radius) cascade
	// through, exactly as the CSS does.
	return mode === 'dark' ? { ...lightTokens, ...darkTokens } : lightTokens;
}

/** The 6-step spectral bonded-link ramp, in order. */
export function linkRamp(mode: Mode): readonly string[] {
	return LINK_RAMP_NAMES.map((name) => tokens(mode)[name]);
}

/** `cssVar("status-live")` → `"var(--status-live)"` */
export function cssVar(name: TokenName): string {
	return `var(--${name})`;
}
