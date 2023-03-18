export function decimalToHex(decimal: number) {
	const hex = decimal.toString(16);
	if (hex.length === 1) return `0${hex}`;
	return hex;
}

export default { decimalToHex };
