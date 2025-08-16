import { describe, expect, it } from 'bun:test';

import generateCss from './utils/generate-css';

describe('tailwind-fluid-type', () => {
	it('index.html', async () => {
		const css = await generateCss('index.html');
		expect(css).toMatchSnapshot();
	});
});
