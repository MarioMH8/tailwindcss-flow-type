import createPlugin from 'tailwindcss/plugin';

import type { TailwindFluidTypeOptionsFlat } from './options';
import { parseOptions } from './options';
import { createFluidTheme, createTextTheme } from './theme';

export * from './options';
export * from './theme';
export * from './utils';

export default createPlugin.withOptions<TailwindFluidTypeOptionsFlat>(
	() => {
		return () => {
			/*
			 * tailwind.matchUtilities(
			 * 	{
			 * 		text: value => ({
			 * 			fontSize: value,
			 * 		}),
			 * 	},
			 * 	{
			 * 		supportsNegativeValues: false,
			 * 		values: tailwind.theme('text'),
			 * 	}
			 * );
			 */
		};
	},
	userOptions => {
		const options = parseOptions(userOptions);

		return {
			theme: {
				fluid: createFluidTheme(options),
				text: createTextTheme(),
			},
		};
	}
);
