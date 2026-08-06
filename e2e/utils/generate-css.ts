import path from 'node:path';

import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';

interface GeneratePluginCssOptions {
	onlyUtilities?: boolean;
	options?: string;
	preset?: boolean;
	theme?: string;
}

const DEFAULT_OPTIONS: GeneratePluginCssOptions = {
	onlyUtilities: true,
};

export default async function generateCss(
	filename: string,
	{ onlyUtilities = true, ...options }: GeneratePluginCssOptions = DEFAULT_OPTIONS
): Promise<string> {
	const configInsert = options.theme ? `@theme {\n${options.theme}\n}` : '';
	const pluginDirective = options.preset ? '' : `@plugin '..'${options.options ? ` ${options.options}` : ';'}`;
	const presetImport = options.preset ? `@import '../src/preset/default.css';` : '';

	const result = await postcss(tailwindcss()).process(
		`
       @import ${onlyUtilities ? `'tailwindcss/utilities'` : `'tailwindcss'`} source(none);
       ${presetImport}
       ${pluginDirective}
      @source './${filename}';

      ${configInsert}`,
		{
			from: `${path.resolve(import.meta.dirname)}?test=${filename}`,
		}
	);

	// Strip off extra whitespace, as well as comments left by Tailwind.
	return result.css.replace(/^\/\*!.*?\n/, '').trim();
}
