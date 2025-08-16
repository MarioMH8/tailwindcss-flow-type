import { DEFAULT_OPTIONS } from '../options';

export default function calculateModularScale(value: number, options = DEFAULT_OPTIONS): string {
	const sFtMin = options.settings.fontSizeMin;
	const sFtMax = options.settings.fontSizeMax;
	const sFtRMin = options.settings.ratioMin;
	const sFtRMax = options.settings.ratioMax;
	const sFtSMin = options.settings.screenMin;
	const sFtSMax = options.settings.screenMax;

	const sFtUnit = options.settings.unit;

	const minValue = sFtMin * sFtRMin ** value;
	const maxValue = sFtMax * sFtRMax ** value;

	const ftMin = value < 0 ? Math.max(minValue, maxValue) : Math.min(minValue, maxValue);
	const ftMax = Math.max(minValue, maxValue);

	return `clamp(${ftMin.toString()}${sFtUnit}, calc(${ftMin.toString()}${sFtUnit} + ((${ftMax.toString()} - ${ftMin.toString()}) * ((100vw - ${sFtSMin.toString()}${sFtUnit}) / (${sFtSMax.toString()} - ${sFtSMin.toString()})))), ${ftMax.toString()}${sFtUnit})`;
}
