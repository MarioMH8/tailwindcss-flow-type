---
'tailwindcss-flow-type': major
---

Release V1 with a token-based fluid typography API and Tailwind CSS v4 preset.

- Replace V0 numeric options, `flow-text`, and fixed token lists with modular or explicit typography tokens.
- Import `tailwindcss-flow-type/preset/default.css` for `text-body`, `text-heading`, and `text-display`.
- Configure modular tokens in CSS with `--flow-token-*` and optional `--flow-line-height-*` theme variables.
- Use `namespace` for custom utility names and `replaceDefaultTextScale` to explicitly replace Tailwind's built-in text scale with overridable fluid defaults.
