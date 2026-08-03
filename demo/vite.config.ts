import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';

const directory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: path.resolve(directory, 'dist'),
	},
	resolve: {
		alias: {
			'@flow': path.resolve(directory, '../src'),
		},
	},
	root: directory,
});
