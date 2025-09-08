const REGEX_NUMBER = /^[+-]?(?:[0-9]+(?:[.][0-9]*)?|[.][0-9]+)$/;

export default function isNumber(value: unknown): boolean {
	return REGEX_NUMBER.test(String(value));
}
