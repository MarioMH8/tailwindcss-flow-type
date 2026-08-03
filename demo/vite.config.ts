import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const directory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	base: process.env['VITE_BASE_PATH'] ?? '/',
	build: {
		emptyOutDir: true,
		outDir: path.resolve(directory, 'dist'),
	},
	resolve: {
		alias: [
			{ find: '@flow', replacement: path.resolve(directory, '../src') },
			{ find: '@', replacement: path.resolve(directory, '../src') },
		],
	},
	root: directory,
});
