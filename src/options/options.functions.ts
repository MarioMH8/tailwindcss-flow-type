import DEFAULT_OPTIONS from './options.default';
import type { TailwindFlowTypeOptions } from './options.type';

function parseNumber(value: unknown, defaultValue: number): number {
	if (typeof value === 'number') {
		return value;
	}

	return defaultValue;
}

// eslint-disable-next-line unicorn/consistent-boolean-name
function parseBoolean(value: unknown, defaultValue: boolean): boolean {
	if (typeof value === 'boolean') {
		return value;
	}

	return defaultValue;
}

function parseString(value: unknown, defaultValue: string): string {
	if (typeof value === 'string') {
		return value;
	}

	return defaultValue;
}

export default function parseOptions(userOptions: Partial<TailwindFlowTypeOptions> = {}): TailwindFlowTypeOptions {
	return {
		fontSizeMax: parseNumber(userOptions.fontSizeMax, DEFAULT_OPTIONS.fontSizeMax),
		fontSizeMin: parseNumber(userOptions.fontSizeMin, DEFAULT_OPTIONS.fontSizeMin),
		override: parseBoolean(userOptions.override, DEFAULT_OPTIONS.override),
		prefix: parseString(userOptions.prefix, DEFAULT_OPTIONS.prefix),
		ratioMax: parseNumber(userOptions.ratioMax, DEFAULT_OPTIONS.ratioMax),
		ratioMin: parseNumber(userOptions.ratioMin, DEFAULT_OPTIONS.ratioMin),
		screenMax: parseNumber(userOptions.screenMax, DEFAULT_OPTIONS.screenMax),
		screenMin: parseNumber(userOptions.screenMin, DEFAULT_OPTIONS.screenMin),
		unit: parseString(userOptions.unit, DEFAULT_OPTIONS.unit),
	};
}
