import generateCss from '@e2e/utils/generate-css';
import { describe, expect, it } from 'bun:test';

describe('tailwindcss-flow-type', () => {
	it('should not generate utilities without explicit tokens', async () => {
		const css = await generateCss('test-1.html');

		expect(css).not.toContain('.text-body');
		expect(css).not.toContain('.text-heading');
	});

	it('should resolve modular tokens declared through CSS theme variables', async () => {
		const css = await generateCss('test-2.html', {
			options: '{ namespace: flow-text; }',
			theme: '--flow-token-body: 1; --flow-line-height-body: 1.4;',
		});

		expect(css).toContain('.flow-text-body');
		expect(css).toContain('font-size: clamp(1.125rem, calc(1.125rem + (1.5rem - 1.125rem)');
		expect(css).toContain('line-height: 1.4');
	});

	it('should replace default text utilities only when configured', async () => {
		const css = await generateCss('test-3.html', {
			options: '{ replaceDefaultTextScale: true; }',
			theme: '--flow-token-base: 0;',
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
