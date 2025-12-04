import type { TailwindFlowTypeTheme } from './flow-theme.type';

const FLOW_TYPE_THEME_TEXT_DEFAULT: TailwindFlowTypeTheme = {
	'2xl': '3',
	'3xl': '4',
	'4xl': '5',
	'5xl': '6',
	'6xl': '7',
	'7xl': '8',
	'8xl': '9',
	'9xl': '10',
	base: '0',
	lg: '1',
	sm: '-1',
	xl: '2',
	xs: '-2',
};

const FLOW_TYPE_THEME_LINE_HEIGHT_DEFAULT: TailwindFlowTypeTheme = {
	'2xl': '1.5',
	'3xl': '1.5',
	'4xl': '1.5',
	'5xl': '1.4',
	'6xl': '1.4',
	'7xl': '1.4',
	'8xl': '1.4',
	'9xl': '1.3',
	base: '1.6',
	lg: '1.6',
	sm: '1.6',
	xl: '1.5',
	xs: '1.6',
};

export { FLOW_TYPE_THEME_LINE_HEIGHT_DEFAULT, FLOW_TYPE_THEME_TEXT_DEFAULT };
