# Migrating from 0.1.0 to 1.0.0

V1 is the first stable release of `tailwindcss-flow-type`. It intentionally replaces the V0 option model, fixed token list, and separate theme namespaces with cohesive typography tokens.

## Before upgrading

V1 is a breaking release. Upgrade the package and migrate its CSS or JavaScript configuration in the same change. Do not retain V0 `flow-text` or `flow-line-height` variables, because they no longer have an effect.

## Replace the plugin configuration

V0 combined all scale dimensions into numeric values plus a shared `unit`:

```css
@plugin 'tailwindcss-flow-type' {
  fontSizeMin: 1.125;
  fontSizeMax: 1.25;
  ratioMin: 1.125;
  ratioMax: 1.2;
  screenMin: 20;
  screenMax: 96;
  unit: rem;
  prefix: flow;
  override: true;
}
```

V1 uses complete CSS values for ranges. For advanced configuration, move the scale to the JavaScript plugin API:

```text
flowType({
  namespace: 'text',
  replaceDefaultTextScale: true,
  scale: {
    base: { max: '1.25rem', min: '1.125rem' },
    ratio: { max: 1.2, min: 1.125 },
    viewport: { max: '96rem', min: '20rem' },
  },
});
```

| V0 | V1 replacement |
|---|---|
| `fontSizeMin` / `fontSizeMax` | `scale.base.min` / `scale.base.max` |
| `ratioMin` / `ratioMax` | `scale.ratio.min` / `scale.ratio.max` |
| `screenMin` / `screenMax` / `unit` | `scale.viewport.min` / `scale.viewport.max` as complete CSS lengths |
| `prefix` | `namespace` |
| `override` | `replaceDefaultTextScale` |

## Replace theme namespaces

V0 used separate namespaces:

```css
@theme {
  --flow-text-body: 0;
  --flow-line-height-body: 1.6;
}
```

V1 uses `--flow-token-*` for the modular exponent and retains `--flow-line-height-*` for the optional default line-height:

```css
@plugin 'tailwindcss-flow-type' {
  namespace: flow-text;
}

@theme {
  --flow-token-body: 0;
  --flow-line-height-body: 1.6;
}
```

The V1 example generates `flow-text-body`. Use `namespace: text` to generate `text-body` instead.

## Choose an integration

Use the CSS-first preset when the built-in semantic tokens are enough:

```css
@import 'tailwindcss';
@import 'tailwindcss-flow-type/preset/default.css';
```

The preset provides `text-body`, `text-heading`, and `text-display` without registering `@plugin`.

Use the JavaScript plugin when a token needs an explicit range, such as a display style that does not follow the modular scale:

```text
display: {
  letterSpacing: '-0.04em',
  lineHeight: { max: '1', min: '0.9' },
  size: { max: '7rem', min: '3rem' },
}
```

## Default Tailwind text scale

V0's `override: true` changed the behavior of built-in `text-*` utilities. V1 leaves Tailwind's standard scale untouched and emits no plugin utilities until tokens are defined. Set `replaceDefaultTextScale: true` to deliberately replace `text-xs` through `text-9xl` with the bundled fluid scale; CSS or JavaScript tokens with matching names override the bundled values.

## Verify the migration

1. Replace every V0 plugin option and `--flow-text-*` variable.
2. Compile the stylesheet and verify that the expected `text-*` or custom namespace classes are generated.
3. Check the smallest and largest supported viewport widths to confirm each `clamp()` reaches the intended values.
4. Remove obsolete V0 snapshots or custom CSS that targeted its old utility names.
