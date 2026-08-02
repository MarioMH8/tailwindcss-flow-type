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

interface FlowTypePluginOptions {
	namespace: string;
	replaceDefaultTextScale: boolean;
	scale: FlowScale;
	tokens: Record<string, FlowTypographyToken>;
}

type FlowTypePluginUserOptions = Partial<FlowTypePluginOptions>;

const DEFAULT_FLOW_TYPE_OPTIONS: FlowTypePluginOptions = {
	namespace: 'text',
	replaceDefaultTextScale: false,
	scale: DEFAULT_FLOW_SCALE,
	tokens: DEFAULT_FLOW_TOKENS,
};

function parseFlowTypePluginOptions(userOptions: FlowTypePluginUserOptions = {}): FlowTypePluginOptions {
	return {
		namespace: parseNamespace(userOptions.namespace),
		replaceDefaultTextScale: shouldReplaceDefaultTextScale(userOptions.replaceDefaultTextScale),
		scale: userOptions.scale ?? DEFAULT_FLOW_TYPE_OPTIONS.scale,
		tokens: {
			...DEFAULT_FLOW_TYPE_OPTIONS.tokens,
			...userOptions.tokens,
		},
	};
}

function parseNamespace(value: unknown): string {
	return typeof value === 'string' && value.length > 0 ? value : DEFAULT_FLOW_TYPE_OPTIONS.namespace;
}

function shouldReplaceDefaultTextScale(value: unknown): boolean {
	return typeof value === 'boolean' ? value : DEFAULT_FLOW_TYPE_OPTIONS.replaceDefaultTextScale;
}

function createCssThemeTokens(flowTokens: unknown, flowLineHeights: unknown): Record<string, FlowTypographyToken> {
	if (typeof flowTokens !== 'object' || flowTokens === null || Array.isArray(flowTokens)) {
		return {};
	}

	const lineHeights: Record<string, unknown> =
		typeof flowLineHeights === 'object' && flowLineHeights !== null && !Array.isArray(flowLineHeights)
			? (flowLineHeights as Record<string, unknown>)
			: {};
	const tokens: Record<string, FlowTypographyToken> = {};

	for (const [name, value] of Object.entries(flowTokens)) {
		const scale = Number(value);

		if (!Number.isFinite(scale)) {
			continue;
		}

		const lineHeight = lineHeights[name];
		tokens[name] = {
			...(typeof lineHeight === 'string' && lineHeight.length > 0 && { lineHeight }),
			scale,
		};
	}

	return tokens;
}

function createFlowTypePlugin(userOptions: FlowTypePluginUserOptions = {}): PluginCreator {
	const options = parseFlowTypePluginOptions(userOptions);

	return (api: PluginAPI) => {
		const configuredTokens = {
			...options.tokens,
			...createCssThemeTokens(api.theme('flow-token'), api.theme('flow-line-height')),
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
