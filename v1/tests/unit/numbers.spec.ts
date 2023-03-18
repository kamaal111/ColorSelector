import { decimalToHex } from '@/utils/numbers';

describe('decimalToHex', () => {
	it.each([
		[7, '07'],
		[10, '0a'],
		[14, '0e'],
		[16, '10'],
		[255, 'ff'],
	])('converts %i decimal to %s hex', (decimal, hex) => {
		expect(decimalToHex(decimal)).toEqual(hex);
	});
});
