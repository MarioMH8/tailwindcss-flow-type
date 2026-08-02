# tailwindcss-flow-type

Fluid typography tokens for Tailwind CSS v4.

V1 provides fluid `clamp()` values that respond to the viewport without runtime JavaScript. Use the CSS-first preset for the standard semantic scale, or the JavaScript plugin for a custom modular or explicit token system.

## Installation

```bash
npm install tailwindcss-flow-type
```

## CSS-first preset

The default preset is the simplest Tailwind v4 integration:

```css
@import "tailwindcss";
@import "tailwindcss-flow-type/preset/default.css";
```

It defines `text-body`, `text-heading`, and `text-display`:

```html
<p class="text-body">Fluid body text</p>
<h2 class="text-heading">Fluid heading</h2>
<h1 class="text-display leading-none">Fluid display text</h1>
```

Each value is dynamic in the browser through `clamp()`, while its limits are fixed at build time. For example, `text-body` grows from `1rem` to `1.25rem` between `20rem` and `96rem` viewport widths.

## JavaScript plugin

Use the plugin when a project needs its own scale or tokens:

```text
import flowType from "tailwindcss-flow-type";

export default {
  plugins: [
    flowType({
      namespace: "text",
      replaceDefaultTextScale: false,
      scale: {
        viewport: { min: "20rem", max: "96rem" },
        base: { min: "1rem", max: "1.25rem" },
        ratio: { min: 1.125, max: 1.2 },
      },
      tokens: {
        body: { scale: 0, lineHeight: "1.6" },
        heading: { scale: 3, lineHeight: "1.15" },
        display: {
          size: { min: "3rem", max: "7rem" },
          lineHeight: { min: "0.9", max: "1" },
          letterSpacing: "-0.04em",
        },
      },
    }),
  ],
};
```

`scale` derives a token from the modular exponent. `size` defines an explicit fluid range. A token must use exactly one of them.

Set `namespace: "flow-text"` to emit `flow-text-body`, `flow-text-heading`, and similar utilities instead. Set `replaceDefaultTextScale: true` only when the project intends to replace Tailwind's standard `text-xs` through `text-9xl` utilities.

## Migration from 0.1.0

See [the V1 migration guide](./docs/migration-v1.md) for the removed V0 options, theme namespaces, and the replacement API.

## License

MIT
