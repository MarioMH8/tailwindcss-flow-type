# tailwindcss-flow-type

## 1.0.0

### Major Changes

- 0ac99fa: Release V1 with a token-based fluid typography API and Tailwind CSS v4 preset.
  - Replace V0 numeric options, `flow-text`, and fixed token lists with modular or explicit typography tokens.
  - Import `tailwindcss-flow-type/preset/default.css` for `text-body`, `text-heading`, and `text-display`.
  - Configure modular tokens in CSS with `--flow-token-*` and optional `--flow-line-height-*` theme variables.
  - Use `namespace` for custom utility names and `replaceDefaultTextScale` to explicitly replace Tailwind's built-in text scale with overridable fluid defaults.

## 0.1.0

### Minor Changes

- 6a82af1: Include new sizes: `10xl`, `11xl`, `12xl`, `2xs` and `3xs`

## 0.0.2

### Patch Changes

- 7262713: Update default line heights

## 0.0.1

### Patch Changes

- Initial commit
