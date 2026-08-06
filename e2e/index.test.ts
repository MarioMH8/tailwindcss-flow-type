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

	it('should resolve flat CSS scale options', async () => {
		const css = await generateCss('test-2.html', {
			options: `{
        namespace: flow-text;
        scale-base-min: 2rem;
        scale-base-max: 3rem;
        scale-ratio-min: 1;
        scale-ratio-max: 1;
        scale-viewport-min: 30rem;
        scale-viewport-max: 90rem;
      }`,
			theme: '--flow-token-body: 1;',
		});

		expect(css).toContain(
			'font-size: clamp(2rem, calc(2rem + (3rem - 2rem) * ((100vw - 30rem) / (90rem - 30rem)))'
		);
	});

	it('should resolve explicit CSS token properties', async () => {
		const css = await generateCss('test-2.html', {
			options: '{ namespace: flow-text; }',
			theme: `
        --flow-size-display-min: 3rem;
        --flow-size-display-max: 7rem;
        --flow-line-height-display-min: 0.9;
        --flow-line-height-display-max: 1;
        --flow-letter-spacing-display: -0.04em;
      `,
		});

		expect(css).toContain('.flow-text-display');
		expect(css).toContain('font-size: clamp(3rem, calc(3rem + (7rem - 3rem)');
		expect(css).toContain('line-height: clamp(0.9, calc(0.9 + (1 - 0.9)');
		expect(css).toContain('letter-spacing: -0.04em');
	});

	it('should replace default text utilities only when configured', async () => {
		const css = await generateCss('test-3.html', {
			options: '{ replaceDefaultTextScale: true; }',
		});

		expect(css).toContain('.text-base');
		expect(css).toContain('.text-lg');
		expect(css).toContain('.text-xl');
		expect(css).toContain('font-size: clamp(1rem, calc(1rem + (1.25rem - 1rem)');
	});

	it('should let CSS tokens override the replacement scale', async () => {
		const css = await generateCss('test-3.html', {
			options: '{ replaceDefaultTextScale: true; }',
			theme: '--flow-token-base: 1; --flow-line-height-base: 1.4;',
		});

		expect(css).toContain('.text-base');
		expect(css).toContain('font-size: clamp(1.125rem, calc(1.125rem + (1.5rem - 1.125rem)');
		expect(css).toContain('line-height: 1.4');
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
