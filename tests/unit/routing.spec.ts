import { makePath, getParamObject } from '@/utils/routing';

describe('makePath', () => {
	it.each([[''], ['/'], ['i'], ['i/2'], ['i/2/ /g']])(
		'%s converts to just as a slash',
		(input) => {
			const path = makePath(input);
			expect(path).toEqual('/');
		}
	);

	it.each([
		['/first/edit', '/edit'],
		['/first/edit/22', '/edit'],
	])('%s makes path with a slash in front of %s', (input, result) => {
		const path = makePath(input);
		expect(path).toEqual(result);
	});
});

describe('getParamObject', () => {
	it.each([['key=value=another&hello']])(
		'extracts nothing because params are invalid',
		(input) => {
			expect(getParamObject(input)).toEqual({});
		}
	);

	it.each([
		['key=value', { key: 'value' }],
		[
			'key=value&another_key=another_value',
			{ key: 'value', another_key: 'another_value' },
		],
	])('it extracts values from params', (input, result) => {
		expect(getParamObject(input)).toEqual(result);
	});
});
