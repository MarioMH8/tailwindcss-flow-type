import type { FlowRange, FlowScale, FlowTypographyToken, FluidTypographyProperties } from '@/core/types';

interface ComparableLength {
	unit: string;
	value: number;
}

function assertNonEmptyString(value: unknown, name: string): asserts value is string {
	if (typeof value !== 'string' || value.trim().length === 0) {
		throw new TypeError(`${name} must be a non-empty CSS value`);
	}
}

function assertPositiveFiniteNumber(value: unknown, name: string): asserts value is number {
	if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
		throw new TypeError(`${name} must be a positive finite number`);
	}
}

function assertFiniteNumber(value: unknown, name: string): asserts value is number {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		throw new TypeError(`${name} must be a finite number`);
	}
}

function parseComparableLength(value: string): ComparableLength | undefined {
	const match = /^(?<value>-?(?:\d+\.?\d*|\.\d+))(?<unit>[a-z%]+)$/iu.exec(value.trim());
	const numericValue = match?.groups?.['value'];
	const unit = match?.groups?.['unit'];

	if (numericValue === undefined || unit === undefined) {
		return undefined;
	}

	return {
		unit: unit.toLowerCase(),
		value: Number(numericValue),
	};
}

function assertRange(range: FlowRange, name: string): void {
	assertNonEmptyString(range.min, `${name}.min`);
	assertNonEmptyString(range.max, `${name}.max`);
}

function assertViewport(viewport: FlowRange): void {
	assertRange(viewport, 'viewport');

	const min = parseComparableLength(viewport.min);
	const max = parseComparableLength(viewport.max);

	if (min === undefined || max === undefined) {
		return;
	}

	if (min.unit !== max.unit) {
		return;
	}

	if (min.value >= max.value) {
		throw new RangeError('viewport.min must be less than viewport.max');
	}
}

function formatNumber(value: number): string {
	return Number(value.toPrecision(12)).toString();
}

function isFlowRange(value: unknown): value is FlowRange {
	return typeof value === 'object' && value !== null && 'min' in value && 'max' in value;
}

function createFluidValue(value: FlowRange, viewport: FlowRange): string {
	assertRange(value, 'value');
	assertViewport(viewport);

	return `clamp(${value.min}, calc(${value.min} + (${value.max} - ${value.min}) * ((100vw - ${viewport.min}) / (${viewport.max} - ${viewport.min}))), ${value.max})`;
}

function createModularScaleValue(exponent: number, scale: FlowScale): string {
	assertFiniteNumber(exponent, 'exponent');
	assertRange(scale.base, 'scale.base');
	assertViewport(scale.viewport);
	assertPositiveFiniteNumber(scale.ratio.min, 'scale.ratio.min');
	assertPositiveFiniteNumber(scale.ratio.max, 'scale.ratio.max');

	const baseMin = parseComparableLength(scale.base.min);
	const baseMax = parseComparableLength(scale.base.max);

	if (baseMin === undefined || baseMax === undefined) {
		throw new TypeError('scale.base must use numeric CSS lengths');
	}

	if (baseMin.unit !== baseMax.unit) {
		throw new TypeError('scale.base.min and scale.base.max must use the same unit');
	}

	const minValue = baseMin.value * scale.ratio.min ** exponent;
	const maxValue = baseMax.value * scale.ratio.max ** exponent;
	const start = Math.min(minValue, maxValue);
	const end = Math.max(minValue, maxValue);
	const unit = baseMin.unit;

	return createFluidValue(
		{ max: `${formatNumber(end)}${unit}`, min: `${formatNumber(start)}${unit}` },
		scale.viewport
	);
}

function createFluidTypographyToken(
	token: FlowTypographyToken,
	viewport: FlowRange,
	scale?: FlowScale
): FluidTypographyProperties {
	const hasScale = token.scale !== undefined;
	const hasSize = token.size !== undefined;

	if (hasScale === hasSize) {
		throw new TypeError('token must define either scale or size');
	}

	let fontSize: string;

	if (token.size !== undefined) {
		fontSize = createFluidValue(token.size, viewport);
	} else if (scale !== undefined && token.scale !== undefined) {
		fontSize = createModularScaleValue(token.scale, scale);
	} else {
		throw new TypeError('scale is required for modular tokens');
	}
	const properties: FluidTypographyProperties = { fontSize };

	if (token.lineHeight !== undefined) {
		properties.lineHeight = isFlowRange(token.lineHeight)
			? createFluidValue(token.lineHeight, viewport)
			: token.lineHeight;
	}

	if (token.letterSpacing !== undefined) {
		assertNonEmptyString(token.letterSpacing, 'token.letterSpacing');
		properties.letterSpacing = token.letterSpacing;
	}

	return properties;
}

export { createFluidTypographyToken, createFluidValue, createModularScaleValue };
