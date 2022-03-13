export function hexToRGB(hex: string) {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	const newHex = hex.replace(
		shorthandRegex,
		(_m, r, g, b) => r + r + g + g + b + b
	);

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
	if (result == null) return null;

	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
	};
}

export default { hexToRGB };
