interface TailwindFluidTypeOptionsSettings {
	extendValues: boolean;
	fontSizeMax: number;
	fontSizeMin: number;
	ratioMax: number;
	ratioMin: number;
	screenMax: number;
	screenMin: number;
	unit: string;
}

interface TailwindFluidTypeOptionsValueObject {
	fontSize: number | string;
	letterSpacing?: number | string | undefined;
	lineHeight?: number | string | undefined;
}

interface TailwindFluidTypeOptionsValues {
	'2xl': TailwindFluidTypeOptionsValueObject;
	'3xl': TailwindFluidTypeOptionsValueObject;
	'4xl': TailwindFluidTypeOptionsValueObject;
	'5xl': TailwindFluidTypeOptionsValueObject;
	'6xl': TailwindFluidTypeOptionsValueObject;
	'7xl': TailwindFluidTypeOptionsValueObject;
	'8xl': TailwindFluidTypeOptionsValueObject;
	'9xl': TailwindFluidTypeOptionsValueObject;
	base: TailwindFluidTypeOptionsValueObject;
	lg: TailwindFluidTypeOptionsValueObject;
	sm: TailwindFluidTypeOptionsValueObject;
	xl: TailwindFluidTypeOptionsValueObject;
	xs: TailwindFluidTypeOptionsValueObject;
}

interface TailwindFluidTypeOptions {
	settings: TailwindFluidTypeOptionsSettings;
	values: Partial<TailwindFluidTypeOptionsValues>;
}

const TAILWIND_FLUID_TYPES_SIZES = [
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'8xl',
	'9xl',
	'base',
	'lg',
	'sm',
	'xl',
	'xs',
] as const;

type TailwindFluidTypeSizes = (typeof TAILWIND_FLUID_TYPES_SIZES)[number];

type TailwindFluidTypeFontSizes = TailwindFluidTypeSizes;
type TailwindFluidTypeLineHeight = `${TailwindFluidTypeSizes}LineHeight`;
type TailwindFluidTypeLetterSpacing = `${TailwindFluidTypeSizes}LetterSpacing`;

type TailwindFluidTypeOptionsFlat = Partial<
	Record<TailwindFluidTypeFontSizes | TailwindFluidTypeLetterSpacing | TailwindFluidTypeLineHeight, number | string>
> &
	Partial<TailwindFluidTypeOptionsSettings>;

export { TAILWIND_FLUID_TYPES_SIZES };

export type {
	TailwindFluidTypeOptions,
	TailwindFluidTypeOptionsFlat,
	TailwindFluidTypeOptionsSettings,
	TailwindFluidTypeOptionsValues,
};
