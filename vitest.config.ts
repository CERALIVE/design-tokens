import { defineConfig } from 'vitest/config';

// Standalone test root for the design-tokens package. The parity suite in
// src/tokens.test.ts asserts the TS maps never drift from tokens.css.
export default defineConfig({
	test: {
		include: ['src/**/*.test.ts'],
	},
});
