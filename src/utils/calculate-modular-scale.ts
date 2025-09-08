import { DEFAULT_OPTIONS } from '../options';

export default function calculateModularScale(value: number, options = DEFAULT_OPTIONS): string {
	const sFtMin = options.fontSizeMin;
	const sFtMax = options.fontSizeMax;
	const sFtRMin = options.ratioMin;
	const sFtRMax = options.ratioMax;
	const sFtSMin = options.screenMin;
	const sFtSMax = options.screenMax;

	const sFtUnit = options.unit;

	const minValue = sFtMin * sFtRMin ** value;
	const maxValue = sFtMax * sFtRMax ** value;

	const ftMin = value < 0 ? Math.max(minValue, maxValue) : Math.min(minValue, maxValue);
	const ftMax = Math.max(minValue, maxValue);

	return `clamp(${ftMin.toString()}${sFtUnit}, calc(${ftMin.toString()}${sFtUnit} + ((${ftMax.toString()} - ${ftMin.toString()}) * ((100vw - ${sFtSMin.toString()}${sFtUnit}) / (${sFtSMax.toString()} - ${sFtSMin.toString()})))), ${ftMax.toString()}${sFtUnit})`;
}
