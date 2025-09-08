import DEFAULT_OPTIONS from './options.default';
import type { TailwindFlowTypeOptions } from './options.type';

export default function parseOptions(userOptions: Partial<TailwindFlowTypeOptions> = {}): TailwindFlowTypeOptions {
	return {
		fontSizeMax:
			'fontSizeMax' in userOptions && typeof userOptions.fontSizeMax === 'number'
				? userOptions.fontSizeMax
				: DEFAULT_OPTIONS.fontSizeMax,
		fontSizeMin:
			'fontSizeMin' in userOptions && typeof userOptions.fontSizeMin === 'number'
				? userOptions.fontSizeMin
				: DEFAULT_OPTIONS.fontSizeMin,
		override:
			'override' in userOptions && typeof userOptions.override === 'boolean'
				? userOptions.override
				: DEFAULT_OPTIONS.override,
		prefix:
			'prefix' in userOptions && typeof userOptions.prefix === 'string'
				? userOptions.prefix
				: DEFAULT_OPTIONS.prefix,
		ratioMax:
			'ratioMax' in userOptions && typeof userOptions.ratioMax === 'number'
				? userOptions.ratioMax
				: DEFAULT_OPTIONS.ratioMax,
		ratioMin:
			'ratioMin' in userOptions && typeof userOptions.ratioMin === 'number'
				? userOptions.ratioMin
				: DEFAULT_OPTIONS.ratioMin,
		screenMax:
			'screenMax' in userOptions && typeof userOptions.screenMax === 'number'
				? userOptions.screenMax
				: DEFAULT_OPTIONS.screenMax,
		screenMin:
			'screenMin' in userOptions && typeof userOptions.screenMin === 'number'
				? userOptions.screenMin
				: DEFAULT_OPTIONS.screenMin,
		unit: 'unit' in userOptions && typeof userOptions.unit === 'string' ? userOptions.unit : DEFAULT_OPTIONS.unit,
	};
}
