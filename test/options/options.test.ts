import { describe, expect, it } from 'bun:test';

import type { TailwindFluidTypeOptionsFlat } from '../../src';
import { DEFAULT_OPTIONS, parseOptions, TAILWIND_FLUID_TYPES_SIZES } from '../../src';

describe('tailwind-fluid-type', () => {
	describe('options', () => {
		describe('DEFAULT_OPTIONS', () => {
			it('not change', () => {
				expect(DEFAULT_OPTIONS).toMatchSnapshot();
			});
		});
		describe('TAILWIND_FLUID_TYPES_SIZES', () => {
			it('not change', () => {
				expect(TAILWIND_FLUID_TYPES_SIZES).toMatchSnapshot();
			});
		});
		describe('parseOptions', () => {
			it('should works as expected when no user options are provided', () => {
				const result = parseOptions();
				expect(result).toStrictEqual(DEFAULT_OPTIONS);
			});

			it('should works as expected when provide settings', () => {
				const options: TailwindFluidTypeOptionsFlat = {
					fontSizeMax: 3,
					fontSizeMin: 1.5,
					ratioMax: 1.8,
					ratioMin: 1.2,
					screenMax: 1440,
					screenMin: 360,
					unit: 'em',
				};
				const result = parseOptions(options);
				expect(result.settings.fontSizeMax).toBe(3);
				expect(result.settings.fontSizeMin).toBe(1.5);
				expect(result.settings.ratioMax).toBe(1.8);
				expect(result.settings.ratioMin).toBe(1.2);
				expect(result.settings.screenMax).toBe(1440);
				expect(result.settings.screenMin).toBe(360);
				expect(result.settings.unit).toBe('em');
				expect(result).toMatchSnapshot();
			});

			it('should works as expected when provide settings and extends is true', () => {
				const options: TailwindFluidTypeOptionsFlat = {
					extendValues: true,
					sm: 9999,
				};
				const result = parseOptions(options);
				expect(result.values.sm?.fontSize).toBe(9999);
				expect(result).toMatchSnapshot();
			});

			it('should works as expected when provide settings and extends is false', () => {
				const options: TailwindFluidTypeOptionsFlat = {
					extendValues: false,
					lgLineHeight: 12,
					sm: 8888,
					smLetterSpacing: 666,
					smLineHeight: 777,
				};
				const result = parseOptions(options);
				expect(result.values.sm?.fontSize).toBe(8888);
				expect(result.values.sm?.lineHeight).toBe(777);
				expect(result.values.sm?.letterSpacing).toBe(666);
				expect(result.values.lg).toBeUndefined();
				expect(result).toMatchSnapshot();
			});
		});
	});
});
