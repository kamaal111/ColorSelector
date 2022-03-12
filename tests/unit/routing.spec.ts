import '../mocks';

import HomeScreen from '../../src/screens/HomeScreen.vue';
import EditScreen from '../../src/screens/EditScreen.vue';

import { currentView, makePath } from '../../src/utils/routing';

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

describe('currentView', () => {
	it.each([
		['/', HomeScreen],
		['/edit', EditScreen],
	])('%s returns a known screen', (path, result) => {
		const view = currentView(path);
		expect(view).toBe(result);
	});

	it.each([['edit'], ['']])(
		'%s is not a known path so it returns the Home Screen',
		(path) => {
			const view = currentView(path);
			expect(view).toBe(HomeScreen);
		}
	);
});
