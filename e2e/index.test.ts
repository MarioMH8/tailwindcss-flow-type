import { describe, expect, it } from 'bun:test';

import generateCss from './utils/generate-css';

describe('tailwindcss-flow-type', () => {
	it('should works with default settings', async () => {
		const css = await generateCss('test-1.html', {
			onlyUtilities: false,
		});
		expect(css).toMatchSnapshot();
	});
	it('should works with default prefix', async () => {
		const css = await generateCss('test-2.html');
		expect(css).toMatchSnapshot();
	});
	it('should works with override', async () => {
		const css = await generateCss('test-3.html', {
			options: '{ override: true }',
		});
		expect(css).toMatchSnapshot();
	});
	it('should works with custom prefix', async () => {
		const css = await generateCss('test-4.html', {
			options: `{ prefix: 'responsive' }`,
		});
		expect(css).toMatchSnapshot();
	});
	it('should works with custom theme', async () => {
		const css = await generateCss('test-5.html', {
			options: '{ override: true; }',
			theme: '--flow-text-base: 1; --flow-text-lg: 2px;',
		});
		expect(css).toMatchSnapshot();
	});
});
