import type { PluginAPI, PluginCreator } from 'tailwindcss/plugin';
import createPlugin from 'tailwindcss/plugin';

import type { FlowScale, FlowTypographyToken } from '@/core';
import { createFluidTypographyToken } from '@/core';

const TAILWIND_TEXT_TOKEN_NAMES = [
	'xs',
	'sm',
	'base',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'8xl',
	'9xl',
] as const;

const DEFAULT_FLOW_SCALE: FlowScale = {
	base: { max: '1.25rem', min: '1rem' },
	ratio: { max: 1.2, min: 1.125 },
	viewport: { max: '96rem', min: '20rem' },
};

const DEFAULT_FLOW_TOKENS: Record<string, FlowTypographyToken> = {};

const DEFAULT_REPLACEMENT_TOKENS: Record<string, FlowTypographyToken> = {
	'2xl': { lineHeight: '1.5', scale: 3 },
	'3xl': { lineHeight: '1.5', scale: 4 },
	'4xl': { lineHeight: '1.5', scale: 5 },
	'5xl': { lineHeight: '1.4', scale: 6 },
	'6xl': { lineHeight: '1.4', scale: 7 },
	'7xl': { lineHeight: '1.4', scale: 8 },
	'8xl': { lineHeight: '1.4', scale: 9 },
	'9xl': { lineHeight: '1.3', scale: 10 },
	base: { lineHeight: '1.6', scale: 0 },
	lg: { lineHeight: '1.6', scale: 1 },
	sm: { lineHeight: '1.6', scale: -1 },
	xl: { lineHeight: '1.5', scale: 2 },
	xs: { lineHeight: '1.6', scale: -2 },
};

interface FlowTypePluginOptions {
	namespace: string;
	replaceDefaultTextScale: boolean;
	scale: FlowScale;
	tokens: Record<string, FlowTypographyToken>;
}

interface FlowTypePluginCssOptions {
	'replace-default-text-scale'?: boolean;
	'scale-base-max'?: string;
	'scale-base-min'?: string;
	'scale-ratio-max'?: number;
	'scale-ratio-min'?: number;
	'scale-viewport-max'?: string;
	'scale-viewport-min'?: string;
}

type FlowTypePluginUserOptions = FlowTypePluginCssOptions & Partial<FlowTypePluginOptions>;

const DEFAULT_FLOW_TYPE_OPTIONS: FlowTypePluginOptions = {
	namespace: 'text',
	replaceDefaultTextScale: false,
	scale: DEFAULT_FLOW_SCALE,
	tokens: DEFAULT_FLOW_TOKENS,
};

function parseFlowTypePluginOptions(userOptions: FlowTypePluginUserOptions = {}): FlowTypePluginOptions {
	return {
		namespace: parseNamespace(userOptions.namespace),
		replaceDefaultTextScale: shouldReplaceDefaultTextScale(
			userOptions.replaceDefaultTextScale ?? userOptions['replace-default-text-scale']
		),
		scale: userOptions.scale ?? parseCssScale(userOptions),
		tokens: {
			...DEFAULT_FLOW_TYPE_OPTIONS.tokens,
			...userOptions.tokens,
		},
	};
}

function parseCssScale(userOptions: FlowTypePluginCssOptions): FlowScale {
	return {
		base: {
			max: parseCssString(userOptions['scale-base-max'], DEFAULT_FLOW_SCALE.base.max),
			min: parseCssString(userOptions['scale-base-min'], DEFAULT_FLOW_SCALE.base.min),
		},
		ratio: {
			max: parseCssNumber(userOptions['scale-ratio-max'], DEFAULT_FLOW_SCALE.ratio.max),
			min: parseCssNumber(userOptions['scale-ratio-min'], DEFAULT_FLOW_SCALE.ratio.min),
		},
		viewport: {
			max: parseCssString(userOptions['scale-viewport-max'], DEFAULT_FLOW_SCALE.viewport.max),
			min: parseCssString(userOptions['scale-viewport-min'], DEFAULT_FLOW_SCALE.viewport.min),
		},
	};
}

function parseCssNumber(value: unknown, defaultValue: number): number {
	return typeof value === 'number' && Number.isFinite(value) ? value : defaultValue;
}

function parseCssString(value: unknown, defaultValue: string): string {
	return typeof value === 'string' && value.length > 0 ? value : defaultValue;
}

function parseNamespace(value: unknown): string {
	return typeof value === 'string' && value.length > 0 ? value : DEFAULT_FLOW_TYPE_OPTIONS.namespace;
}

function shouldReplaceDefaultTextScale(value: unknown): boolean {
	return typeof value === 'boolean' ? value : DEFAULT_FLOW_TYPE_OPTIONS.replaceDefaultTextScale;
}

function createCssThemeTokens(
	flowTokens: unknown,
	flowSizes: unknown,
	flowLineHeights: unknown,
	flowLetterSpacing: unknown
): Record<string, FlowTypographyToken> {
	const modularTokens = flattenThemeValues(flowTokens);
	const sizes = flattenThemeValues(flowSizes);
	const lineHeights = flattenThemeValues(flowLineHeights);
	const letterSpacing = flattenThemeValues(flowLetterSpacing);
	const tokens: Record<string, FlowTypographyToken> = {};
	const names = new Set([
		...Object.keys(modularTokens),
		...getRangeTokenNames(sizes),
		...getRangeTokenNames(lineHeights),
		...Object.keys(letterSpacing),
	]);

	for (const name of names) {
		const size = createThemeRange(sizes, name);
		const scale = Number(modularTokens[name]);

		if (size === undefined && !Number.isFinite(scale)) {
			continue;
		}

		const lineHeightRange = createThemeRange(lineHeights, name);
		const lineHeight = lineHeightRange ?? toCssValue(lineHeights[name]);
		const tracking = toCssValue(letterSpacing[name]);
		tokens[name] = {
			...(lineHeight !== undefined && { lineHeight }),
			...(tracking !== undefined && { letterSpacing: tracking }),
			...(size === undefined ? { scale } : { size }),
		};
	}

	return tokens;
}

function createThemeRange(values: Record<string, unknown>, name: string): undefined | { max: string; min: string } {
	const min = toCssValue(values[`${name}-min`]);
	const max = toCssValue(values[`${name}-max`]);

	return min === undefined || max === undefined ? undefined : { max, min };
}

function flattenThemeValues(value: unknown, prefix = ''): Record<string, unknown> {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		return {};
	}

	const values: Record<string, unknown> = {};

	for (const [name, nestedValue] of Object.entries(value)) {
		const key = prefix.length === 0 ? name : `${prefix}-${name}`;

		if (typeof nestedValue === 'object' && nestedValue !== null && !Array.isArray(nestedValue)) {
			Object.assign(values, flattenThemeValues(nestedValue, key));
		} else {
			values[key] = nestedValue;
		}
	}

	return values;
}

function getRangeTokenNames(values: Record<string, unknown>): string[] {
	return Object.keys(values)
		.filter(name => name.endsWith('-min') || name.endsWith('-max'))
		.map(name => name.slice(0, Math.max(name.lastIndexOf('-min'), name.lastIndexOf('-max'))));
}

function toCssValue(value: unknown): string | undefined {
	return typeof value === 'string' || typeof value === 'number' ? value.toString() : undefined;
}

function createFlowTypePlugin(userOptions: FlowTypePluginUserOptions = {}): PluginCreator {
	const options = parseFlowTypePluginOptions(userOptions);

	return (api: PluginAPI) => {
		const configuredTokens = {
			...(options.namespace === 'text' && options.replaceDefaultTextScale && DEFAULT_REPLACEMENT_TOKENS),
			...options.tokens,
			...createCssThemeTokens(
				api.theme('flow-token'),
				api.theme('flow-size'),
				api.theme('flow-line-height'),
				api.theme('flow-letter-spacing')
			),
		};
		const tokenEntries = Object.entries(configuredTokens);
		const tokens = Object.fromEntries(
			tokenEntries.filter(([name]) =>
				options.namespace === 'text' && !options.replaceDefaultTextScale
					? !TAILWIND_TEXT_TOKEN_NAMES.includes(name as (typeof TAILWIND_TEXT_TOKEN_NAMES)[number])
					: true
			)
		);
		const values = Object.fromEntries(Object.keys(tokens).map(name => [name, name]));

		api.matchUtilities(
			{
				[options.namespace]: (tokenName: string) => {
					const token = tokens[tokenName];

					if (token === undefined) {
						return {};
					}

					const properties = createFluidTypographyToken(token, options.scale.viewport, options.scale);

					return {
						fontSize: properties.fontSize,
						...(properties.letterSpacing !== undefined && { letterSpacing: properties.letterSpacing }),
						...(properties.lineHeight !== undefined && { lineHeight: properties.lineHeight }),
					};
				},
			},
			{
				supportsNegativeValues: false,
				values,
			}
		);
	};
}

const flowTypePlugin = createPlugin.withOptions<FlowTypePluginUserOptions>(createFlowTypePlugin);

export {
	createFlowTypePlugin,
	DEFAULT_FLOW_SCALE,
	DEFAULT_FLOW_TOKENS,
	DEFAULT_FLOW_TYPE_OPTIONS,
	flowTypePlugin,
	parseFlowTypePluginOptions,
};

export type { FlowTypePluginOptions, FlowTypePluginUserOptions };
