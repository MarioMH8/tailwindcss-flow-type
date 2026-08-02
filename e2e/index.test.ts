import generateCss from '@e2e/utils/generate-css';
import { describe, expect, it } from 'bun:test';

describe('tailwindcss-flow-type', () => {
	it('should generate semantic text utilities by default', async () => {
		const css = await generateCss('test-1.html');

		expect(css).toContain('.text-body');
		expect(css).toContain('.text-heading');
		expect(css).toContain('font-size: clamp(1rem, calc(1rem + (1.25rem - 1rem)');
		expect(css).toContain('line-height: 1.6');
	});

	it('should support a custom utility namespace', async () => {
		const css = await generateCss('test-2.html', {
			options: '{ namespace: flow-text; }',
		});

		expect(css).toContain('.flow-text-body');
		expect(css).toContain('font-size: clamp(1rem, calc(1rem + (1.25rem - 1rem)');
	});

	it('should replace default text utilities only when configured', async () => {
		const css = await generateCss('test-3.html', {
			options: '{ replaceDefaultTextScale: true; }',
		});

		expect(css).toContain('.text-base');
		expect(css).toContain('font-size: clamp(1rem, calc(1rem + (1.25rem - 1rem)');
	});

	it('should generate semantic text utilities from the CSS-first preset', async () => {
		const css = await generateCss('test-1.html', {
			preset: true,
		});

		expect(css).toContain('--text-body: clamp(1rem, calc(1rem + (1.25rem - 1rem)');
		expect(css).toContain('.text-body');
		expect(css).toContain('font-size: var(--text-body)');
	});
});
