import HomeScreen from '../screens/HomeScreen.vue';
import EditScreen from '../screens/EditScreen.vue';

const routes = {
	'/': HomeScreen,
	'/edit': EditScreen,
};

export function makePath(pathname: string) {
	const pathComponents = pathname.replaceAll(' ', '').split('/').slice(2);
	const path = pathComponents[0];
	if (path == null || path.length === 0) return '/';
	return `/${path}`;
}

export function currentView(currentPath: string) {
	if (!Object.keys(routes).includes(currentPath)) return HomeScreen;
	return routes[currentPath as keyof typeof routes];
}

export default { makePath, currentView };
