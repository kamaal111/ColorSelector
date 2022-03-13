import '../mocks';

import HomeScreen from '@/screens/HomeScreen.vue';
import EditScreen from '@/screens/EditScreen.vue';

import { currentView } from '@/routes';

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
