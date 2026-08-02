interface FlowRange {
	max: string;
	min: string;
}

interface FlowRatio {
	max: number;
	min: number;
}

interface FlowScale {
	base: FlowRange;
	ratio: FlowRatio;
	viewport: FlowRange;
}

interface FlowTypographyToken {
	letterSpacing?: string;
	lineHeight?: FlowRange | string;
	scale?: number;
	size?: FlowRange;
}

interface FluidTypographyProperties {
	fontSize: string;
	letterSpacing?: string;
	lineHeight?: string;
}

export type { FlowRange, FlowRatio, FlowScale, FlowTypographyToken, FluidTypographyProperties };
