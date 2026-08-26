# Conventions

## Runtime and package management

Use Bun for package management, scripts, and tests. Do not add Node-specific scripts.

## Imports

Use the project path aliases:

| Alias    | Resolves to |
|----------|-------------|
| `@/`     | `src/`      |
| `@flow/` | `src/`      |
| `@e2e/`  | `e2e/`      |

## Linting

ESLint uses `@hexadrop/eslint-config` through `eslint.config.js`. Run `bun run lint:fix` before committing.
