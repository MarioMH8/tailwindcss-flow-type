import DEFAULT_OPTIONS from './options.default';
import type {
	TailwindFluidTypeOptions,
	TailwindFluidTypeOptionsFlat,
	TailwindFluidTypeOptionsSettings,
	TailwindFluidTypeOptionsValues,
} from './options.type';
import { TAILWIND_FLUID_TYPES_SIZES } from './options.type';

export default function parseOptions(userOptions: TailwindFluidTypeOptionsFlat = {}): TailwindFluidTypeOptions {
	const settings: TailwindFluidTypeOptionsSettings = {
		extendValues:
			'extendValues' in userOptions && typeof userOptions.extendValues === 'boolean'
				? userOptions.extendValues
				: DEFAULT_OPTIONS.settings.extendValues,
		fontSizeMax:
			'fontSizeMax' in userOptions && typeof userOptions.fontSizeMax === 'number'
				? userOptions.fontSizeMax
				: DEFAULT_OPTIONS.settings.fontSizeMax,
		fontSizeMin:
			'fontSizeMin' in userOptions && typeof userOptions.fontSizeMin === 'number'
				? userOptions.fontSizeMin
				: DEFAULT_OPTIONS.settings.fontSizeMin,
		ratioMax:
			'ratioMax' in userOptions && typeof userOptions.ratioMax === 'number'
				? userOptions.ratioMax
				: DEFAULT_OPTIONS.settings.ratioMax,
		ratioMin:
			'ratioMin' in userOptions && typeof userOptions.ratioMin === 'number'
				? userOptions.ratioMin
				: DEFAULT_OPTIONS.settings.ratioMin,
		screenMax:
			'screenMax' in userOptions && typeof userOptions.screenMax === 'number'
				? userOptions.screenMax
				: DEFAULT_OPTIONS.settings.screenMax,
		screenMin:
			'screenMin' in userOptions && typeof userOptions.screenMin === 'number'
				? userOptions.screenMin
				: DEFAULT_OPTIONS.settings.screenMin,
		unit:
			'unit' in userOptions && typeof userOptions.unit === 'string'
				? userOptions.unit
				: DEFAULT_OPTIONS.settings.unit,
	};

	const values: Partial<TailwindFluidTypeOptionsValues> = {};

	for (const size of TAILWIND_FLUID_TYPES_SIZES) {
		const fontSize =
			userOptions[size] ?? (settings.extendValues ? DEFAULT_OPTIONS.values[size]?.fontSize : undefined);
		const lineHeight =
			userOptions[`${size}LineHeight`] ??
			(settings.extendValues ? DEFAULT_OPTIONS.values[size]?.lineHeight : undefined);
		const letterSpacing =
			userOptions[`${size}LetterSpacing`] ??
			(settings.extendValues ? DEFAULT_OPTIONS.values[size]?.letterSpacing : undefined);

		if (typeof fontSize === 'number' || typeof fontSize === 'string') {
			values[size] = {
				fontSize,
			};
			if (typeof lineHeight === 'number' || typeof lineHeight === 'string') {
				values[size].lineHeight = lineHeight;
			}
			if (typeof letterSpacing === 'number' || typeof letterSpacing === 'string') {
				values[size].letterSpacing = letterSpacing;
			}
		}
	}

	return {
		settings,
		values,
	};
}
