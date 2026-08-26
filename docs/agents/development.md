# Development and testing

Use the smallest command that validates the changed behavior.

## Commands

| Task                          | Command                                          |
|-------------------------------|--------------------------------------------------|
| Install dependencies          | `bun install`                                    |
| Run the full suite            | `bun run test`                                   |
| Test core fluid-type behavior | `bun test ./test/core/create-fluid-type.test.ts` |
| Test Tailwind integration     | `bun test ./e2e/index.test.ts`                   |
| Lint                          | `bun run lint`                                   |
| Fix lint issues               | `bun run lint:fix`                               |
| Run the interactive demo      | `bun run demo`                                   |
| Build the demo bundle         | `bun run demo:build`                             |

## Test layout

- Unit tests live in `test/core`.
- End-to-end tests live in `e2e` and compile Tailwind with `postcss` and `@tailwindcss/postcss` before inspecting the generated CSS.

## Before committing

Run `bun run lint:fix`. Pre-push hooks run `bun run test`, `bun run lint:fix`, and `bun run typecheck`.
