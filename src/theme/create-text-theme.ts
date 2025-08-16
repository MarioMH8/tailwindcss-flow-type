import type { PluginUtils } from 'tailwindcss/plugin';

import { TAILWIND_FLUID_TYPES_SIZES } from '../options';

export default function createTextTheme(): (plugin: PluginUtils) => Record<string, unknown> {
	return plugin => {
		const theme: Record<string, unknown> = {};

		for (const size of TAILWIND_FLUID_TYPES_SIZES) {
			theme[size] = {
				'-line-height': plugin.theme(`fluid.${size}.-line-height`),
				DEFAULT: plugin.theme(`fluid.${size}.DEFAULT`),
			};
		}
		console.log(theme);

		return theme;
	};
}
