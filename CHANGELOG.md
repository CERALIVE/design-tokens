# Changelog

All notable changes to `@ceralive/design-tokens` are documented here.

Versions follow CalVer (`YYYY.MINOR.PATCH`). This format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- `--touch-target` (`44px`) — minimum WCAG 2.5.5 touch-target size.
- `--pull-refresh-offset` (`48px`) — pull-to-refresh travel distance.
- `--safe-area-padding` (`max(1rem, env(safe-area-inset-bottom))`) — bottom
  inset padding for notched / gesture-bar devices.

All three are mode-invariant PWA layout tokens, present in both the `:root`
(light) and `.dark` blocks of `tokens.css` and mirrored in the TypeScript map.

## [2026.6.1]

### Added

- Initial published palette extracted from CeraUI's "Ground Control" theme:
  surfaces, brand, stream status, semantic status, signal quality, the 6-step
  spectral link ramp, elevation, and gradient endpoints — in light and dark.
- Typed TS mirror (`lightTokens`, `darkTokens`, `tokens`, `linkRamp`, `cssVar`)
  with a drift guard that fails the build if the map diverges from `tokens.css`.

[Unreleased]: https://github.com/CERALIVE/design-tokens/compare/v2026.6.1...HEAD
[2026.6.1]: https://github.com/CERALIVE/design-tokens/releases/tag/v2026.6.1
