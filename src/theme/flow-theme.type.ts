const TAILWIND_FLOW_TYPE_SIZES = [
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'8xl',
	'9xl',
	'base',
	'lg',
	'sm',
	'xl',
	'xs',
] as const;

type TailwindFlowTypeSizes = (typeof TAILWIND_FLOW_TYPE_SIZES)[number];

type TailwindFlowTypeTheme = Record<TailwindFlowTypeSizes, string>;

export { TAILWIND_FLOW_TYPE_SIZES };

export type { TailwindFlowTypeTheme };
