![banner.png](.idea%2Fbanner.png)

<h1 align="center">
  tailwindcss-flow-type
</h1>

<p align="center">
  A Tailwind CSS plugin for fluid, responsive typography that scales smoothly across screen sizes with minimal configuration.
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
- [Contributing](#contributing)

## Installation

> This plugin requires Tailwind CSS 4 or higher.

```bash
npm install --save tailwindcss-flow-type
```

**Using bun**

```bash
bun add tailwindcss-flow-type
```

Include the plugin in your `.css` file:

```css
@import 'tailwindcss';

@plugin 'tailwindcss-flow-type';
```

## Usage

The default behavior of the plugin don't override the default `text-*` classes provided by Tailwind CSS. Instead, it
adds a new set of `flow-*` classes that you can use to apply fluid typography styles.

```html
<article>
    <h1 class="flow-text-base">Fluid type</h1>
</article>
```

```css
.flow-text-base {
    font-size: clamp(1.125rem, calc(1.125rem + ((1.25 - 1.125) * ((100vw - 20rem) / (96 - 20)))), 1.25rem);
}
.flow-text-base {
    line-height: 1.6;
}
```

**Override default classes**

You can override the default `text-*` classes by setting the `override` option to `true` when configuring the plugin:

```css
@import 'tailwindcss';

@plugin 'tailwindcss-flow-type' {
    override: true
};
```

Then you can use the `text-*` classes to apply fluid typography styles:

```html
<article>
    <h1 class="text-base">Fluid type</h1>
</article>
```

```css
.text-base {
    font-size: clamp(1.125rem, calc(1.125rem + ((1.25 - 1.125) * ((100vw - 20rem) / (96 - 20)))), 1.25rem);
    line-height: var(--tw-leading, 1.6);
}
```

## Configuration

The plugin comes with a default configuration (see below) but it's possible to customize this config for your project.
As default, we use `rem` for better accessibility, but you can also use `px`.

```css
@import 'tailwindcss';

@plugin 'tailwindcss-flow-type' {
    fontSizeMax: 1.25;
    fontSizeMin: 1.125;
    override: true;
    prefix: flow;
    ratioMax: 1.2;
    ratioMin: 1.125;
    screenMax: 96;
    screenMin: 20;
    unit: rem;
};

@theme {
    --flow-text-xs: -2;
    --flow-text-sm: -1;
    --flow-text-base: 0;
    --flow-text-lg: 1;
    --flow-text-xl: 2;
    --flow-text-2xl: 3;
    --flow-text-3xl: 4;
    --flow-text-4xl: 5;
    --flow-text-5xl: 6;
    --flow-text-6xl: 7;
    --flow-text-7xl: 8;
    --flow-text-8xl: 9;
    --flow-text-9xl: 10;
    
    --flow-line-height-xs: 1.6;
    --flow-line-height-sm: 1.6;
    --flow-line-height-base: 1.6;
    --flow-line-height-lg: 1.6;
    --flow-line-height-xl: 1.2;
    --flow-line-height-2xl: 1.2;
    --flow-line-height-3xl: 1.2;
    --flow-line-height-4xl: 1.1;
    --flow-line-height-5xl: 1.1;
    --flow-line-height-6xl: 1.1;
    --flow-line-height-7xl: 1;
    --flow-line-height-8xl: 1;
    --flow-line-height-9xl: 1;
}
```

## Contributing

This project uses [Bun](https://bun.sh) as a runtime, test runner and bundler.

Thanks for wanting to help out! Here's the setup you'll have to do:

Clone the project

```bash
git clone git@github.com:MarioMH8/tailwindcss-flow-type.git
```

Go to the project directory

```bash
cd tailwindcss-flow-type
```

Install dependencies

```bash
bun install
```

Compile the project

```bash
bun run build
```

## MIT License

[Copyright 2021-2025 MarioMH](./LICENSE)
