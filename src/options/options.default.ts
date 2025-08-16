import type { TailwindFluidTypeOptions } from './options.type';

const DEFAULT_OPTIONS: TailwindFluidTypeOptions = {
	settings: {
		extendValues: true,
		fontSizeMax: 1.25,
		fontSizeMin: 1.125,
		ratioMax: 1.2,
		ratioMin: 1.125,
		screenMax: 96,
		screenMin: 20,
		unit: 'rem',
	},
	values: {
		'2xl': {
			fontSize: 3,
			lineHeight: 1.2,
		},
		'3xl': {
			fontSize: 4,
			lineHeight: 1.2,
		},
		'4xl': {
			fontSize: 5,
			lineHeight: 1.1,
		},
		'5xl': {
			fontSize: 6,
			lineHeight: 1.1,
		},
		'6xl': {
			fontSize: 7,
			lineHeight: 1.1,
		},
		'7xl': {
			fontSize: 8,
			lineHeight: 1,
		},
		'8xl': {
			fontSize: 9,
			lineHeight: 1,
		},
		'9xl': {
			fontSize: 10,
			lineHeight: 1,
		},
		base: {
			fontSize: 0,
			lineHeight: 1.6,
		},
		lg: {
			fontSize: 1,
			lineHeight: 1.6,
		},
		sm: {
			fontSize: -1,
			lineHeight: 1.6,
		},
		xl: {
			fontSize: 2,
			lineHeight: 1.2,
		},
		xs: {
			fontSize: -2,
			lineHeight: 1.6,
		},
	},
};

export default DEFAULT_OPTIONS;
