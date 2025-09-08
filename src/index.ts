import type { ThemeConfig } from 'tailwindcss/plugin';
import createPlugin from 'tailwindcss/plugin';

import type { TailwindFlowTypeOptions } from './options';
import { parseOptions } from './options';
import { createTextTheme, FLOW_TYPE_THEME_LINE_HEIGHT_DEFAULT, FLOW_TYPE_THEME_TEXT_DEFAULT } from './theme';
import { calculateModularScale, isNumber } from './utils';

export * from './options';
export * from './theme';
export * from './utils';

export default createPlugin.withOptions<Partial<TailwindFlowTypeOptions>>(
	userOptions => {
		const options = parseOptions(userOptions);

		return tailwind => {
			tailwind.matchUtilities(
				{
					[`${options.prefix}-text`]: value => {
						const fontSize =
							typeof value === 'string' ? (isNumber(value) ? Number(value) : value) : undefined;

						if (fontSize === undefined) {
							return {};
						}

						return {
							fontSize:
								typeof fontSize === 'number' ? calculateModularScale(fontSize, options) : fontSize,
						};
					},
				},
				{
					supportsNegativeValues: false,
					values: tailwind.theme('flow-text') as Record<string, string>,
				}
			);
			tailwind.matchUtilities(
				{
					[`${options.prefix}-text`]: value => {
						return {
							lineHeight: value,
						};
					},
				},
				{
					supportsNegativeValues: false,
					values: tailwind.theme('flow-line-height') as Record<string, string>,
				}
			);
		};
	},
	userOptions => {
		const options = parseOptions(userOptions);

		const theme: ThemeConfig = {
			'flow-line-height': FLOW_TYPE_THEME_LINE_HEIGHT_DEFAULT,
			'flow-text': FLOW_TYPE_THEME_TEXT_DEFAULT,
		};

		if (options.override) {
			theme['text'] = createTextTheme(options);
		}

		return {
			theme,
		};
	}
);
