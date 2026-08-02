# Migrating to V1

V1 is the first stable release of `tailwindcss-flow-type` and intentionally replaces the V0 configuration model.

## Removed API

The following plugin options no longer exist: `fontSizeMin`, `fontSizeMax`, `ratioMin`, `ratioMax`, `screenMin`, `screenMax`, `unit`, `prefix`, and `override`.

The `flow-text` and `flow-line-height` theme namespaces are also removed. V1 tokens carry their size, line-height, and letter-spacing together.

## Replace the V0 plugin

```css
/* V0 */
@plugin "tailwindcss-flow-type" {
  override: true;
}
```

Use the CSS-first preset when the default semantic tokens are sufficient:

```css
@import "tailwindcss";
@import "tailwindcss-flow-type/preset/default.css";
```

For a custom system, move configuration to the JavaScript plugin API and define tokens with a modular `scale` exponent or explicit `size` range.

## Default Tailwind scale

V0 used `override` to affect `text-*`. V1 keeps Tailwind's built-in text scale by default and adds semantic tokens such as `text-body` and `text-heading`.

Set `replaceDefaultTextScale: true` only when intentionally redefining the built-in text scale.
