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

## Usage

### CSS-first preset

Import the preset to use the default semantic tokens without registering the JavaScript plugin:

```css
@import 'tailwindcss';
@import 'tailwindcss-flow-type/preset/default.css';
```

```html
<article>
  <p class="text-body">Fluid body text</p>
  <h2 class="text-heading">Fluid heading</h2>
  <h1 class="text-display leading-none">Fluid display text</h1>
</article>
```

The preset provides `text-body`, `text-heading`, and `text-display`. Each token uses `clamp()`, so it responds to the viewport in the browser without runtime JavaScript.

### JavaScript plugin

Use the plugin when the project needs a custom scale, explicit token sizes, or a custom utility namespace:

```text
import flowType from 'tailwindcss-flow-type';

const config = {
  plugins: [
    flowType({
      namespace: 'text',
      replaceDefaultTextScale: false,
      scale: {
        base: { max: '1.25rem', min: '1rem' },
        ratio: { max: 1.2, min: 1.125 },
        viewport: { max: '96rem', min: '20rem' },
      },
      tokens: {
        body: { lineHeight: '1.6', scale: 0 },
        heading: { lineHeight: '1.15', scale: 3 },
        display: {
          letterSpacing: '-0.04em',
          lineHeight: { max: '1', min: '0.9' },
          size: { max: '7rem', min: '3rem' },
        },
      },
    }),
  ],
};

export default config;
```

## Configuration

### CSS token configuration

The JavaScript plugin accepts flat options through `@plugin`. Define modular tokens in CSS with `@theme` using `--flow-token-*`; their value is the exponent in the configured modular scale. Add a matching `--flow-line-height-*` variable when the token needs a default line-height.

```css
@import 'tailwindcss';

@plugin 'tailwindcss-flow-type' {
  namespace: flow-text;
}

@theme {
  --flow-token-body: 0;
  --flow-token-heading: 3;
  --flow-token-display: 6;

  --flow-line-height-body: 1.6;
  --flow-line-height-heading: 1.15;
  --flow-line-height-display: 1;
}
```

This produces `flow-text-body`, `flow-text-heading`, and `flow-text-display`. CSS-defined tokens override tokens with the same name from the plugin defaults.

### Plugin options

| Option | Type | Default | Description |
|---|---|---|---|
| `namespace` | `string` | `text` | Utility namespace. `flow-text` produces `flow-text-body`. |
| `replaceDefaultTextScale` | `boolean` | `false` | Enables replacement of Tailwind's `text-xs` through `text-9xl` utilities. |
| `scale.base` | `{ min, max }` | `1rem` to `1.25rem` | Base font-size range for modular tokens. |
| `scale.ratio` | `{ min, max }` | `1.125` to `1.2` | Modular ratio range. Both values must be positive finite numbers. |
| `scale.viewport` | `{ min, max }` | `20rem` to `96rem` | Viewport range used by fluid interpolation. |
| `tokens` | `Record<string, token>` | Built-in semantic scale | JavaScript token definitions. |

Each JavaScript token must define exactly one source for `font-size`:

| Token property | Meaning |
|---|---|
| `scale` | Numeric modular exponent, for example `3`. |
| `size` | Explicit `{ min, max }` CSS values. |
| `lineHeight` | Fixed string or explicit fluid `{ min, max }` range. |
| `letterSpacing` | Fixed CSS letter-spacing value. |

Use `replaceDefaultTextScale: true` only when the project intentionally redefines Tailwind's built-in text scale. By default, the package adds semantic tokens and leaves Tailwind's `text-base`, `text-lg`, and similar utilities intact.

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
