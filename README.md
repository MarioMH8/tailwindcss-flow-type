![banner.png](.idea%2Fbanner.png)

<h1 align="center">
  tailwindcss-flow-type
</h1>

<p align="center">
  Fluid, responsive typography tokens for Tailwind CSS v4.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tailwindcss-flow-type" rel="nofollow">
    <img src="https://img.shields.io/npm/v/tailwindcss-flow-type?style=flat-square" alt="npm" style="max-width: 100%;">
  </a>
  <a href="https://github.com/MarioMH8/tailwindcss-flow-type">
    <img src="https://img.shields.io/github/issues/mariomh8/tailwindcss-flow-type?style=flat-square" alt="GitHub issues" style="max-width: 100%;">
  </a>
</p>

## Table of Contents

- [Installation](#installation)
- [Demo](#demo)
- [Usage](#usage)
- [Configuration](#configuration)
- [Migration](#migration)
- [Contributing](#contributing)

## Installation

> This package requires Tailwind CSS 4 or higher.

```bash
npm install tailwindcss-flow-type
```

**Using Bun**

```bash
bun add tailwindcss-flow-type
```

## Demo

Try the published [interactive configuration laboratory](https://mariomh8.github.io/tailwindcss-flow-type/).

Launch the interactive configuration laboratory locally:

```bash
bun run demo
```

Build the static demo bundle:

```bash
bun run demo:build
```

## Usage

### CSS plugin

Define a modular token directly in a CSS stylesheet:

```css
@import 'tailwindcss';

@plugin 'tailwindcss-flow-type';

@theme {
  --flow-token-body: 0;
}
```

```html
<p class="text-body">Fluid body text</p>
```

### TypeScript plugin

```typescript
import flowType from 'tailwindcss-flow-type';

const config = {
  plugins: [
    flowType({
      tokens: {
        body: { lineHeight: '1.6', scale: 0 },
      },
    }),
  ],
};

export default config;
```

### CSS-first preset

Import the preset for the built-in semantic tokens:

```css
@import 'tailwindcss';
@import 'tailwindcss-flow-type/preset/default.css';
```

```html
<h1 class="text-display">Fluid display text</h1>
```

The preset provides `text-body`, `text-heading`, and `text-display`. Each token uses `clamp()`, so it responds to the viewport in the browser without runtime JavaScript.

## Configuration

The CSS and TypeScript APIs configure the same model. CSS uses flat `@plugin` declarations and `@theme` variables; TypeScript uses nested objects.

| Setting | CSS | TypeScript | Default |
|---|---|---|---|
| Utility namespace | `namespace: flow-text` | `namespace: 'flow-text'` | `text` |
| Replace Tailwind text scale | `replace-default-text-scale: true` | `replaceDefaultTextScale: true` | `false` |
| Base minimum | `scale-base-min: 1rem` | `scale.base.min: '1rem'` | `1rem` |
| Base maximum | `scale-base-max: 1.25rem` | `scale.base.max: '1.25rem'` | `1.25rem` |
| Minimum ratio | `scale-ratio-min: 1.125` | `scale.ratio.min: 1.125` | `1.125` |
| Maximum ratio | `scale-ratio-max: 1.2` | `scale.ratio.max: 1.2` | `1.2` |
| Minimum viewport | `scale-viewport-min: 20rem` | `scale.viewport.min: '20rem'` | `20rem` |
| Maximum viewport | `scale-viewport-max: 96rem` | `scale.viewport.max: '96rem'` | `96rem` |
| Modular token | `--flow-token-name: 3` | `tokens.name.scale: 3` | None |
| Explicit token size | `--flow-size-name-min` / `--flow-size-name-max` | `tokens.name.size` | None |
| Fixed line-height | `--flow-line-height-name` | `tokens.name.lineHeight` | None |
| Fluid line-height | `--flow-line-height-name-min` / `--flow-line-height-name-max` | `tokens.name.lineHeight` | None |
| Letter-spacing | `--flow-letter-spacing-name` | `tokens.name.letterSpacing` | None |

`replaceDefaultTextScale` enables bundled fluid values for `text-xs` through `text-9xl`. A CSS or TypeScript token with the same name overrides the bundled value. Without an explicit token or replacement scale, the plugin emits no utilities.

### Complete CSS example

```css
@plugin 'tailwindcss-flow-type' {
  namespace: flow-text;
  scale-base-min: 1rem;
  scale-base-max: 1.25rem;
  scale-ratio-min: 1.125;
  scale-ratio-max: 1.2;
  scale-viewport-min: 20rem;
  scale-viewport-max: 96rem;
}

@theme {
  --flow-token-body: 0;
  --flow-line-height-body: 1.6;
  --flow-size-display-min: 3rem;
  --flow-size-display-max: 7rem;
  --flow-line-height-display-min: 0.9;
  --flow-line-height-display-max: 1;
  --flow-letter-spacing-display: -0.04em;
}
```

### Complete TypeScript example

```typescript
flowType({
  namespace: 'flow-text',
  scale: {
    base: { max: '1.25rem', min: '1rem' },
    ratio: { max: 1.2, min: 1.125 },
    viewport: { max: '96rem', min: '20rem' },
  },
  tokens: {
    body: { lineHeight: '1.6', scale: 0 },
    display: {
      letterSpacing: '-0.04em',
      lineHeight: { max: '1', min: '0.9' },
      size: { max: '7rem', min: '3rem' },
    },
  },
});
```

## Migration

V1 replaces the V0 options and theme namespaces. Read the complete [V1 migration guide](./docs/migration-v1.md) before upgrading.

## Contributing

This project uses [Bun](https://bun.sh) as its runtime, test runner, and bundler.

```bash
git clone git@github.com:MarioMH8/tailwindcss-flow-type.git
cd tailwindcss-flow-type
bun install
bun run build
```

Read the full [contribution guidelines](./CONTRIBUTING.md) before opening an issue or pull request.

## MIT License

[Copyright 2021-2026 MarioMH](./LICENSE)
