import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { darkTokens, lightTokens, linkRamp } from './index.ts';

const CSS_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'tokens.css');

/** Extracts `--name: value;` declarations from one selector block. */
function parseBlock(css: string, selector: string): Record<string, string> {
	const start = css.indexOf(`${selector} {`);
	if (start === -1) throw new Error(`selector ${selector} not found`);
	let depth = 0;
	let end = start;
	for (let i = css.indexOf('{', start); i < css.length; i++) {
		if (css[i] === '{') depth++;
		if (css[i] === '}') depth--;
		if (depth === 0) {
			end = i;
			break;
		}
	}
	const block = css.slice(start, end);
	const declarations: Record<string, string> = {};
	for (const match of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
		const [, name, value] = match;
		if (name !== undefined && value !== undefined) {
			declarations[name] = value.replace(/\s+/g, ' ').trim();
		}
	}
	return declarations;
}

describe('tokens.css ↔ TS map parity', () => {
	// Arrange
	const css = readFileSync(CSS_PATH, 'utf8');
	const cssLight = parseBlock(css, ':root,\n.light');
	const cssDark = parseBlock(css, '.dark,\n[data-theme="dark"]');

	test('every :root declaration matches lightTokens exactly', () => {
		// Act + Assert
		expect(cssLight).toEqual({ ...lightTokens });
	});

	test('every .dark declaration matches darkTokens exactly', () => {
		expect(cssDark).toEqual({ ...darkTokens });
	});

	test('dark mode covers every light token except --radius (structural, mode-invariant)', () => {
		// Arrange
		const lightOnly = Object.keys(lightTokens).filter((name) => !(name in darkTokens));

		// Assert
		expect(lightOnly).toEqual(['radius']);
	});
});

describe('linkRamp', () => {
	test('returns the 6-step spectral ramp in declared order for dark mode', () => {
		// Act
		const ramp = linkRamp('dark');

		// Assert
		expect(ramp).toHaveLength(6);
		expect(ramp[0]).toBe(darkTokens['link-1']);
		expect(ramp[5]).toBe(darkTokens['link-6']);
	});
});
