import { existsSync } from 'node:fs';
import { copyFile, mkdir } from 'node:fs/promises';

import { defineConfig } from 'tsup';

const PRESET_DIST_FOLDER = 'dist/preset';

async function copyPreset(): Promise<void> {
	const isExistsDistributionFolder = existsSync(PRESET_DIST_FOLDER);
	if (!isExistsDistributionFolder) {
		await mkdir(PRESET_DIST_FOLDER);
	}
	await copyFile(`src/preset/default.css`, `dist/preset/default.css`);
}

export default defineConfig([
	{
		clean: true,
		dts: true,
		entry: ['./src/index.ts', './src/core/index.ts', './src/plugin/index.ts'],
		format: ['esm'],
		minify: false,
		sourcemap: false,
	},
	{
		clean: false,
		dts: true,
		entry: ['./src/index.ts', './src/core/index.ts', './src/plugin/index.ts'],
		format: ['cjs'],
		minify: false,
		sourcemap: false,
	},
	{
		clean: false,
		dts: false,
		entry: ['./src/index.ts', './src/core/index.ts', './src/plugin/index.ts'],
		format: ['esm', 'cjs'],
		minify: true,
		onSuccess: copyPreset,
		outExtension({ format }) {
			return {
				js: `.min.${format === 'esm' ? 'js' : 'cjs'}`,
			};
		},
		sourcemap: false,
	},
]);
