import { describe, expect, it } from 'bun:test';

import { calculateModularScale, DEFAULT_OPTIONS } from '../../src';

describe('tailwind-fluid-type', () => {
	describe('calculateModularScale', () => {
		describe('with default options', () => {
			it.each([-4, -1, 0, 1, 4])('should works as expected with %p scale value', value => {
				const result = calculateModularScale(value);
				expect(result).toMatchSnapshot();
			});
		});

		describe('with custom units', () => {
			it.each([-4, -1, 0, 1, 4])('should works as expected with %p scale value', value => {
				const result = calculateModularScale(value, {
					...DEFAULT_OPTIONS,
					settings: {
						...DEFAULT_OPTIONS.settings,
						unit: 'px',
					},
				});
				expect(result).toMatchSnapshot();
			});
		});

		describe('with ratioMin and ratioMax are 1', () => {
			it.each([-4, -1, 0, 1, 4])('should works as expected with %p scale value', value => {
				const result = calculateModularScale(value, {
					...DEFAULT_OPTIONS,
					settings: {
						...DEFAULT_OPTIONS.settings,
						ratioMax: 1,
						ratioMin: 1,
					},
				});
				expect(result).toMatchSnapshot();
			});
		});

		describe('with screenMin equals screenMax', () => {
			it.each([-4, -1, 0, 1, 4])('should works as expected with %p scale value', value => {
				const result = calculateModularScale(value, {
					...DEFAULT_OPTIONS,
					settings: {
						...DEFAULT_OPTIONS.settings,
						screenMax: 20,
						screenMin: 20,
					},
				});
				expect(result).toMatchSnapshot();
			});
		});

		describe('with fontSizeMin and fontSizeMax are 0', () => {
			it.each([-4, -1, 0, 1, 4])('should works as expected with %p scale value', value => {
				const result = calculateModularScale(value, {
					...DEFAULT_OPTIONS,
					settings: {
						...DEFAULT_OPTIONS.settings,
						fontSizeMax: 0,
						fontSizeMin: 0,
					},
				});
				expect(result).toMatchSnapshot();
			});
		});
	});
});
