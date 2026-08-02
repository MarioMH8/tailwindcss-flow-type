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

const DEFAULT_FLOW_TOKENS: Record<string, FlowTypographyToken> = {
	'2xl': { lineHeight: '1.5', scale: 3 },
	'3xl': { lineHeight: '1.5', scale: 4 },
	'4xl': { lineHeight: '1.5', scale: 5 },
	'5xl': { lineHeight: '1.4', scale: 6 },
	'6xl': { lineHeight: '1.4', scale: 7 },
	'7xl': { lineHeight: '1.4', scale: 8 },
	'8xl': { lineHeight: '1.4', scale: 9 },
	'9xl': { lineHeight: '1.3', scale: 10 },
	base: { lineHeight: '1.6', scale: 0 },
	body: { lineHeight: '1.6', scale: 0 },
	display: {
		letterSpacing: '-0.04em',
		lineHeight: { max: '1', min: '0.9' },
		size: { max: '7rem', min: '3rem' },
	},
	heading: { letterSpacing: '-0.02em', lineHeight: '1.15', scale: 3 },
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

function createFlowTypePlugin(userOptions: FlowTypePluginUserOptions = {}): PluginCreator {
	const options = parseFlowTypePluginOptions(userOptions);
	const tokens = Object.fromEntries(
		Object.entries(options.tokens).filter(([name]) =>
			options.namespace === 'text' && !options.replaceDefaultTextScale
				? !TAILWIND_TEXT_TOKEN_NAMES.includes(name as (typeof TAILWIND_TEXT_TOKEN_NAMES)[number])
				: true
		)
	);
	const values = Object.fromEntries(Object.keys(tokens).map(name => [name, name]));

	return (api: PluginAPI) => {
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
