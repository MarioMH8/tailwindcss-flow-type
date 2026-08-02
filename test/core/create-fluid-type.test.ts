import { describe, expect, it } from 'bun:test';

import { createFluidTypographyToken, createFluidValue, createModularScaleValue } from '@/core';

describe('fluid typography core', () => {
	describe('createFluidValue', () => {
		it('should generate a dimensionally valid clamp expression', () => {
			expect(createFluidValue({ max: '1.25rem', min: '1rem' }, { max: '96rem', min: '20rem' })).toBe(
				'clamp(1rem, calc(1rem + (1.25rem - 1rem) * ((100vw - 20rem) / (96rem - 20rem))), 1.25rem)'
			);
		});

		it('should reject an inverted viewport range with matching units', () => {
			expect(() => createFluidValue({ max: '1.25rem', min: '1rem' }, { max: '20rem', min: '96rem' })).toThrow(
				'viewport.min must be less than viewport.max'
			);
		});
	});

	describe('createModularScaleValue', () => {
		it('should calculate a fluid value from a modular exponent', () => {
			expect(
				createModularScaleValue(2, {
					base: { max: '1.25rem', min: '1rem' },
					ratio: { max: 1.2, min: 1.125 },
					viewport: { max: '96rem', min: '20rem' },
				})
			).toBe(
				'clamp(1.265625rem, calc(1.265625rem + (1.8rem - 1.265625rem) * ((100vw - 20rem) / (96rem - 20rem))), 1.8rem)'
			);
		});

		it('should reject non-positive ratios', () => {
			expect(() =>
				createModularScaleValue(1, {
					base: { max: '1.25rem', min: '1rem' },
					ratio: { max: 1.2, min: 0 },
					viewport: { max: '96rem', min: '20rem' },
				})
			).toThrow('scale.ratio.min must be a positive finite number');
		});
	});

	describe('createFluidTypographyToken', () => {
		it('should support a token with explicit fluid properties', () => {
			expect(
				createFluidTypographyToken(
					{
						letterSpacing: '-0.04em',
						lineHeight: { max: '1', min: '0.9' },
						size: { max: '7rem', min: '3rem' },
					},
					{ max: '96rem', min: '20rem' }
				)
			).toEqual({
				fontSize: 'clamp(3rem, calc(3rem + (7rem - 3rem) * ((100vw - 20rem) / (96rem - 20rem))), 7rem)',
				letterSpacing: '-0.04em',
				lineHeight: 'clamp(0.9, calc(0.9 + (1 - 0.9) * ((100vw - 20rem) / (96rem - 20rem))), 1)',
			});
		});
	});
});
