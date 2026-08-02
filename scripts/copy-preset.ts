import { mkdir } from 'node:fs/promises';

const preset = Bun.file('src/preset/default.css');

await mkdir('dist/preset', { recursive: true });
await Bun.write('dist/preset/default.css', preset);
