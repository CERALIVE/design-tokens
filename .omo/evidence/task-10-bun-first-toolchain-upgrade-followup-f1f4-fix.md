# Task 10 follow-up — F1/F4 release workflow fix

Date: 2026-08-21

## Defect

Todo 10 removed `package-lock.json` and moved the CI gate to Bun, but left
`.github/workflows/publish-release.yml` on `npm ci` and npm script invocations.
Without an npm lockfile, the release workflow failed before its gate or OIDC publish
step could run.

## Workflow change

`publish-release.yml` now:

- installs Bun 1.4.0 via `oven-sh/setup-bun@v2`;
- uses `bun install --frozen-lockfile`, `bun run lint`, `bun run build`, and
  `bun run test` for the release gate;
- uses `bun -p` for package-version checks and dist-tag selection;
- replaces npm's JSON pack output parsing with parsing of Bun's `packed <size>
  <path>` dry-run lines, while retaining the same unexpected-file allowlist;
- keeps Node 26, the npm upgrade, and `npm publish` as the final OIDC trusted-
  publishing island. The removed `cache: npm` setting also required a
  `package-lock.json` and would otherwise fail before publishing.

## Verification

Executed from the `design-tokens` worktree:

```sh
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/publish-release.yml'))"
bun install --frozen-lockfile
bun run lint
bun run build
bun test
bun pm pack --dry-run
```

All commands exited 0. The pack dry-run listed exactly these six allowed files:

```text
package.json
LICENSE
README.md
src/index.ts
src/tokens.test.ts
tokens.css
```

The workflow's Bun parser was run locally against that output; its allowlist check
also exited 0.
