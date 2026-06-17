const TAILWIND_FLOW_TYPE_SIZES = [
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'8xl',
	'9xl',
	'10xl',
	'11xl',
	'12xl',
	'base',
	'lg',
	'sm',
	'xl',
	'xs',
	'2xs',
	'3xs',
] as const;

type TailwindFlowTypeSizes = (typeof TAILWIND_FLOW_TYPE_SIZES)[number];

type TailwindFlowTypeTheme = Record<TailwindFlowTypeSizes, string>;

export { TAILWIND_FLOW_TYPE_SIZES };

export type { TailwindFlowTypeTheme };
