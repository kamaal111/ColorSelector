import HomeScreen from './screens/HomeScreen.vue';
import EditScreen from './screens/EditScreen.vue';

const routes = {
	'/': HomeScreen,
	'/edit': EditScreen,
};

export function currentView(currentPath: string) {
	if (!Object.keys(routes).includes(currentPath)) return routes['/'];
	return routes[currentPath as keyof typeof routes];
}

export default { currentView };
