/* eslint-disable typescript/member-ordering, typescript/no-misused-promises, typescript/no-unnecessary-type-parameters, typescript/restrict-template-expressions, unicorn/prefer-observer-apis -- The demo serializes numeric controls and binds browser events directly. */

import './style.css';

import type { FlowScale } from '@flow/core';
import { createFluidValue, createModularScaleValue } from '@flow/core';
import { Pane } from 'tweakpane';

const TOKEN_MODE_OPTIONS = {
	'Explicit range': 'explicit',
	'Modular scale': 'modular',
} as const;

const DEFAULT_CONFIG = {
	baseMax: 1.25,
	baseMin: 1,
	namespace: 'text',
	ratioMax: 1.2,
	ratioMin: 1.125,
	replaceDefaultTextScale: false,
	viewportMax: 96,
	viewportMin: 20,
} as const;

type TokenMode = (typeof TOKEN_MODE_OPTIONS)[keyof typeof TOKEN_MODE_OPTIONS];

interface DemoToken {
	letterSpacing: string;
	lineHeightMax: number;
	lineHeightMin: number;
	lineHeightMode: 'fixed' | 'fluid';
	lineHeight: number;
	mode: TokenMode;
	name: string;
	scale: number;
	sizeMax: number;
	sizeMin: number;
}

interface DemoState {
	baseMax: number;
	baseMin: number;
	namespace: string;
	replaceDefaultTextScale: boolean;
	ratioMax: number;
	ratioMin: number;
	selectedToken: string;
	tokens: DemoToken[];
	viewportMax: number;
	viewportMin: number;
}

const state: DemoState = {
	...DEFAULT_CONFIG,
	selectedToken: 'display',
	tokens: [
		{
			letterSpacing: '',
			lineHeight: 1.6,
			lineHeightMax: 1.6,
			lineHeightMin: 1.6,
			lineHeightMode: 'fixed',
			mode: 'modular',
			name: 'body',
			scale: 0,
			sizeMax: 1.25,
			sizeMin: 1,
		},
		{
			letterSpacing: '-0.025em',
			lineHeight: 1.15,
			lineHeightMax: 1.15,
			lineHeightMin: 1.15,
			lineHeightMode: 'fixed',
			mode: 'modular',
			name: 'heading',
			scale: 3,
			sizeMax: 2.16,
			sizeMin: 1.424,
		},
		{
			letterSpacing: '-0.04em',
			lineHeight: 1,
			lineHeightMax: 1,
			lineHeightMin: 0.9,
			lineHeightMode: 'fluid',
			mode: 'explicit',
			name: 'display',
			scale: 6,
			sizeMax: 7,
			sizeMin: 3,
		},
	],
	viewportMax: 96,
	viewportMin: 20,
};

function getElement<T extends HTMLElement>(selector: string): T {
	const element = document.querySelector<T>(selector);

	if (element === null) {
		throw new Error(`The demo could not find ${selector}.`);
	}

	return element;
}

const paneElement = getElement<HTMLElement>('#pane');
const specimenElement = getElement<HTMLElement>('#specimen');
const outputElement = getElement<HTMLElement>('#css-output');
const viewportElement = getElement<HTMLElement>('#viewport-readout');
const copyButton = getElement<HTMLButtonElement>('#copy');
const copyStatusElement = getElement<HTMLElement>('#copy-status');

function getScale(): FlowScale {
	return {
		base: { max: `${state.baseMax}rem`, min: `${state.baseMin}rem` },
		ratio: { max: state.ratioMax, min: state.ratioMin },
		viewport: { max: `${state.viewportMax}rem`, min: `${state.viewportMin}rem` },
	};
}

function getTokenFontSize(token: DemoToken): string {
	return token.mode === 'modular'
		? createModularScaleValue(token.scale, getScale())
		: createFluidValue({ max: `${token.sizeMax}rem`, min: `${token.sizeMin}rem` }, getScale().viewport);
}

function getTokenLineHeight(token: DemoToken): string {
	return token.lineHeightMode === 'fixed'
		? token.lineHeight.toString()
		: createFluidValue(
				{ max: token.lineHeightMax.toString(), min: token.lineHeightMin.toString() },
				getScale().viewport
			);
}

function createCssConfig(): string {
	const declarations = [
		state.namespace !== DEFAULT_CONFIG.namespace && `  namespace: ${state.namespace};`,
		state.replaceDefaultTextScale && '  replace-default-text-scale: true;',
		state.baseMin !== DEFAULT_CONFIG.baseMin && `  scale-base-min: ${state.baseMin}rem;`,
		state.baseMax !== DEFAULT_CONFIG.baseMax && `  scale-base-max: ${state.baseMax}rem;`,
		state.ratioMin !== DEFAULT_CONFIG.ratioMin && `  scale-ratio-min: ${state.ratioMin};`,
		state.ratioMax !== DEFAULT_CONFIG.ratioMax && `  scale-ratio-max: ${state.ratioMax};`,
		state.viewportMin !== DEFAULT_CONFIG.viewportMin && `  scale-viewport-min: ${state.viewportMin}rem;`,
		state.viewportMax !== DEFAULT_CONFIG.viewportMax && `  scale-viewport-max: ${state.viewportMax}rem;`,
	].filter((declaration): declaration is string => typeof declaration === 'string');
	const tokenDeclarations = state.tokens.flatMap(token => {
		const name = token.name.trim();

		if (name.length === 0) {
			return [];
		}

		const declarations =
			token.mode === 'modular'
				? [`  --flow-token-${name}: ${token.scale};`]
				: [
						`  --flow-size-${name}-min: ${token.sizeMin}rem;`,
						`  --flow-size-${name}-max: ${token.sizeMax}rem;`,
					];

		if (token.lineHeightMode === 'fixed') {
			declarations.push(`  --flow-line-height-${name}: ${token.lineHeight};`);
		} else {
			declarations.push(
				`  --flow-line-height-${name}-min: ${token.lineHeightMin};`,
				`  --flow-line-height-${name}-max: ${token.lineHeightMax};`
			);
		}

		if (token.letterSpacing.trim().length > 0) {
			declarations.push(`  --flow-letter-spacing-${name}: ${token.letterSpacing};`);
		}

		return declarations;
	});

	const plugin =
		declarations.length === 0
			? `@plugin 'tailwindcss-flow-type';`
			: `@plugin 'tailwindcss-flow-type' {\n${declarations.join('\n')}\n}`;
	const theme = tokenDeclarations.length === 0 ? '' : `@theme {\n${tokenDeclarations.join('\n')}\n}`;

	return [plugin, theme].filter(section => section.length > 0).join('\n\n');
}

function renderSpecimen(): void {
	specimenElement.replaceChildren();
	const tokenNames = new Set(state.tokens.map(token => token.name));

	if (!tokenNames.has(state.selectedToken)) {
		state.selectedToken = state.tokens[0]?.name ?? '';
	}

	for (const token of state.tokens) {
		const card = document.createElement('article');
		const label = document.createElement('p');
		const text = document.createElement('p');

		card.className = `token-card${token.name === state.selectedToken ? ' selected' : ''}`;
		card.style.fontSize = getTokenFontSize(token);
		card.style.lineHeight = getTokenLineHeight(token);
		card.style.letterSpacing = token.letterSpacing;
		card.tabIndex = 0;
		label.className = 'token-label';
		label.textContent = `${state.namespace}-${token.name}`;
		text.textContent = token.name === 'body' ? 'A flexible system stays precise.' : 'Typography with a pulse.';
		card.append(label, text);
		card.addEventListener('click', () => {
			state.selectedToken = token.name;
			render();
		});
		card.addEventListener('keydown', event => {
			if (!(event.key === 'Enter' || event.key === ' ')) {
				return;
			}

			event.preventDefault();
			state.selectedToken = token.name;
			render();
		});
		specimenElement.append(card);
	}
}

function render(): void {
	outputElement.textContent = createCssConfig();
	viewportElement.textContent = `${Math.round(window.innerWidth)}px viewport`;
	renderSpecimen();
}

function createPane(): void {
	paneElement.replaceChildren();
	const pane = new Pane({ container: paneElement, title: 'Flow controls' });

	pane.addBinding(state, 'baseMin', { label: 'base / min', max: 3, min: 0.5, step: 0.025 }).on('change', render);
	pane.addBinding(state, 'baseMax', { label: 'base / max', max: 4, min: 0.5, step: 0.025 }).on('change', render);
	pane.addBinding(state, 'ratioMin', { label: 'ratio / min', max: 1.5, min: 1, step: 0.005 }).on('change', render);
	pane.addBinding(state, 'ratioMax', { label: 'ratio / max', max: 1.5, min: 1, step: 0.005 }).on('change', render);
	pane.addBinding(state, 'viewportMin', { label: 'viewport / min', max: 60, min: 10, step: 1 }).on('change', render);
	pane.addBinding(state, 'viewportMax', { label: 'viewport / max', max: 160, min: 64, step: 1 }).on('change', render);
	pane.addBinding(state, 'namespace', { label: 'namespace' }).on('change', render);
	pane.addBinding(state, 'replaceDefaultTextScale', { label: 'replace text scale' }).on('change', render);

	for (const token of state.tokens) {
		pane.addButton({ title: `Token / ${token.name || 'untitled'}` });
		pane.addBinding(token, 'name').on('change', render);
		pane.addBinding(token, 'mode', { options: TOKEN_MODE_OPTIONS }).on('change', render);
		pane.addBinding(token, 'scale', { max: 12, min: -4, step: 1 }).on('change', render);
		pane.addBinding(token, 'sizeMin', { label: 'size / min', max: 12, min: 0.25, step: 0.125 }).on(
			'change',
			render
		);
		pane.addBinding(token, 'sizeMax', { label: 'size / max', max: 16, min: 0.25, step: 0.125 }).on(
			'change',
			render
		);
		pane.addBinding(token, 'lineHeightMode', {
			label: 'leading mode',
			options: { Fixed: 'fixed', Fluid: 'fluid' },
		}).on('change', render);
		pane.addBinding(token, 'lineHeight', { label: 'leading', max: 2, min: 0.75, step: 0.025 }).on('change', render);
		pane.addBinding(token, 'lineHeightMin', { label: 'leading / min', max: 2, min: 0.75, step: 0.025 }).on(
			'change',
			render
		);
		pane.addBinding(token, 'lineHeightMax', { label: 'leading / max', max: 2, min: 0.75, step: 0.025 }).on(
			'change',
			render
		);
		pane.addBinding(token, 'letterSpacing', { label: 'tracking' }).on('change', render);
		pane.addButton({ title: 'Remove token' }).on('click', () => {
			state.tokens = state.tokens.filter(candidate => candidate !== token);
			createPane();
			render();
		});
	}

	pane.addButton({ title: 'Add modular token' }).on('click', () => {
		state.tokens.push({
			letterSpacing: '',
			lineHeight: 1.4,
			lineHeightMax: 1.4,
			lineHeightMin: 1.4,
			lineHeightMode: 'fixed',
			mode: 'modular',
			name: `token-${state.tokens.length + 1}`,
			scale: 2,
			sizeMax: 2,
			sizeMin: 1.5,
		});
		createPane();
		render();
	});
}

copyButton.addEventListener('click', async () => {
	try {
		await navigator.clipboard.writeText(createCssConfig());
		copyStatusElement.textContent = 'CSS copied to clipboard.';
		copyButton.textContent = 'Copied';
		setTimeout(() => {
			copyButton.textContent = 'Copy CSS';
		}, 1600);
	} catch {
		copyStatusElement.textContent = 'Clipboard access is unavailable. Select the code and copy it manually.';
	}
});

window.addEventListener('resize', render);
createPane();
render();
