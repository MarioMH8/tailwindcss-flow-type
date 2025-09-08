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
	'2xl': '1.2',
	'3xl': '1.2',
	'4xl': '1.1',
	'5xl': '1.1',
	'6xl': '1.1',
	'7xl': '1',
	'8xl': '1',
	'9xl': '1',
	base: '1.6',
	lg: '1.6',
	sm: '1.6',
	xl: '1.2',
	xs: '1.6',
};

export { FLOW_TYPE_THEME_LINE_HEIGHT_DEFAULT, FLOW_TYPE_THEME_TEXT_DEFAULT };
