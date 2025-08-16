import path from 'node:path';

import tailwindcss from '@tailwindcss/postcss';
import postcss from 'postcss';

interface GeneratePluginCssOptions {
	options?: string;
	theme?: string;
}

export default async function generateCss(filename: string, options: GeneratePluginCssOptions = {}): Promise<string> {
	const configInsert = options.theme ? `@theme {\n${options.theme}\n}` : '';
	const pluginOptions = options.options ? ` ${options.options}` : ';';

	const result = await postcss(tailwindcss()).process(
		`
      @import 'tailwindcss';
      @plugin '..'${pluginOptions}
      @source './${filename}';

      ${configInsert}`,
		{
			from: `${path.resolve(import.meta.dirname)}?test=${filename}`,
		}
	);

	// Strip off extra whitespace, as well as comments left by Tailwind.
	return result.css.replace(/^\/\*!.*?\n/, '').trim();
}
