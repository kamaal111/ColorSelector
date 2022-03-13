import { hexToRGB, getRandomHexColor } from '@/utils/colors';

describe('hexToRGB', () => {
	it.each([
		['ffffff', { r: 255, g: 255, b: 255 }],
		['#ffffff', { r: 255, g: 255, b: 255 }],
		['#26619c', { r: 38, g: 97, b: 156 }],
		['#000', { r: 0, g: 0, b: 0 }],
	])('transforms hex to rgb', (hex, rgb) => {
		expect(hexToRGB(hex)).toEqual(rgb);
	});

	it.each([['#2661'], ['#1111111']])(
		'does not transform hex to rgb, because hex is invalid',
		(hex) => {
			expect(hexToRGB(hex)).toBeNull();
		}
	);
});

describe('getRandomHexColor', () => {
	it('gets a random color', () => {
		const randomHex = getRandomHexColor();
		expect(randomHex[0]).toEqual('#');
		expect(randomHex.length).toEqual(7);
	});
});
