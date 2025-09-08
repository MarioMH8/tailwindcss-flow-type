import type { PluginUtils } from 'tailwindcss/plugin';

import type { TailwindFlowTypeOptions } from '../options';
import { calculateModularScale, isNumber } from '../utils';
import type { TailwindFlowTypeTheme } from './flow-theme.type';
import { TAILWIND_FLOW_TYPE_SIZES } from './flow-theme.type';

export default function createTextTheme(
	options: TailwindFlowTypeOptions
): (plugin: PluginUtils) => Record<string, unknown> {
	return plugin => {
		const theme: Record<string, unknown> = {};

		const flowTextTheme = plugin.theme('flow-text') as TailwindFlowTypeTheme;
		const flowLineHeightTheme = plugin.theme('flow-line-height') as TailwindFlowTypeTheme;

		for (const size of TAILWIND_FLOW_TYPE_SIZES) {
			const textSize = flowTextTheme[size];
			const lineHeight = flowLineHeightTheme[size];
			theme[size] = {
				'-line-height': lineHeight,
				DEFAULT: isNumber(textSize) ? calculateModularScale(Number(textSize), options) : textSize,
			};
		}

		return theme;
	};
}
