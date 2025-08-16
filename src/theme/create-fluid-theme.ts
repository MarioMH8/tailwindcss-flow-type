import type { TailwindFluidTypeOptions } from '../options';
import { TAILWIND_FLUID_TYPES_SIZES } from '../options';
import { calculateModularScale } from '../utils';

export default function createFluidTheme(options: TailwindFluidTypeOptions): Record<string, unknown> {
	const theme: Record<string, unknown> = {};

	for (const size of TAILWIND_FLUID_TYPES_SIZES) {
		const value = options.values[size];
		if (value) {
			const fontSize = value.fontSize;
			const lineHeight = value.lineHeight;
			if (typeof fontSize === 'number') {
				theme[size] = {
					'-line-height':
						typeof lineHeight === 'number'
							? `${lineHeight.toString()}${options.settings.unit}`
							: lineHeight,
					DEFAULT: calculateModularScale(fontSize, options),
				};
			} else if (typeof fontSize === 'string') {
				theme[size] = {
					'-line-height':
						typeof lineHeight === 'number'
							? `${lineHeight.toString()}${options.settings.unit}`
							: lineHeight,
					DEFAULT: fontSize,
				};
			}
		}
	}

	return theme;
}
