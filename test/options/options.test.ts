import { describe, expect, it } from 'bun:test';

import type { TailwindFlowTypeOptions } from '../../src';
import { DEFAULT_OPTIONS, parseOptions, TAILWIND_FLOW_TYPE_SIZES } from '../../src';

describe('tailwindcss-flow-type', () => {
	describe('options', () => {
		describe('DEFAULT_OPTIONS', () => {
			it('not change', () => {
				expect(DEFAULT_OPTIONS).toMatchSnapshot();
			});
		});
		describe('TAILWIND_FLOW_TYPES_SIZES', () => {
			it('not change', () => {
				expect(TAILWIND_FLOW_TYPE_SIZES).toMatchSnapshot();
			});
		});
		describe('parseOptions', () => {
			it('should works as expected when no user options are provided', () => {
				const result = parseOptions();
				expect(result).toStrictEqual(DEFAULT_OPTIONS);
			});

			it('should works as expected when provide settings', () => {
				const options: TailwindFlowTypeOptions = {
					fontSizeMax: 3,
					fontSizeMin: 1.5,
					override: true,
					prefix: 'ggg',
					ratioMax: 1.8,
					ratioMin: 1.2,
					screenMax: 1440,
					screenMin: 360,
					unit: 'em',
				};
				const result = parseOptions(options);
				expect(result.fontSizeMax).toBe(3);
				expect(result.fontSizeMin).toBe(1.5);
				expect(result.ratioMax).toBe(1.8);
				expect(result.ratioMin).toBe(1.2);
				expect(result.screenMax).toBe(1440);
				expect(result.screenMin).toBe(360);
				expect(result.override).toBe(true);
				expect(result.prefix).toBe('ggg');
				expect(result.unit).toBe('em');
				expect(result).toMatchSnapshot();
			});
		});
	});
});
