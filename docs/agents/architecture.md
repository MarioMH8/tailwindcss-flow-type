# Architecture

## Public surfaces

| Surface         | Location                 | Responsibility                                                                                                                                                                                                                                        |
|-----------------|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Core fluid math | `src/core`               | Computes clamp-based typography values. `createFluidValue` creates clamp expressions; `createModularScaleValue` applies modular-scale exponents; `createFluidTypographyToken` produces `font-size`, `line-height`, and `letter-spacing` declarations. |
| Tailwind plugin | `src/plugin.ts`          | Uses `createPlugin.withOptions`; accepts TypeScript and flat CSS `@plugin` options; reads CSS theme variables; emits namespaced utilities such as `text-body` or `flow-text-display`.                                                                 |
| Default preset  | `src/preset/default.css` | Defines the precomputed semantic `text-body`, `text-heading`, and `text-display` tokens.                                                                                                                                                              |

## Build output

`tsup.config.ts` produces ESM and CJS builds, including minified variants. Its `onSuccess` hook copies the CSS preset to `dist/preset/default.css`.
