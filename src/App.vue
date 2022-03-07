<template>
	<component :is="currentView" />
	<AppFooter />
</template>

<script>
import { ref, onMounted } from 'vue';

import HomeScreen from './screens/HomeScreen.vue';
import AppFooter from './components/AppFooter.vue';

function makePath() {
	const pathComponents = window.location.pathname.split('/').slice(2);
	const path = pathComponents[0];
	if (path == undefined || path.length === 0) return '/';
	if (path[0] !== '/') return `/${path}`;
	return path;
}

const currentPath = ref(makePath());

const routes = {
	'/': HomeScreen,
	'/edit': HomeScreen,
};

function currentView() {
	return routes[currentPath.value] ?? HomeScreen;
}

function setAppStoreTag() {
	const appStoreTag = document.querySelector('meta[name="apple-itunes-app"]');

	let hasChanges = false;
	let appStoreTagContent = [];
	const contentArray = appStoreTag.getAttribute('content').split(',');
	for (const value of contentArray) {
		const keyValue = value.trim().split('=');
		if (keyValue.length !== 2) continue;

		let itemsToPush;
		const [key] = keyValue;
		if (key === 'app-argument') {
			const href = window.location.href;
			if (href !== keyValue[1]) hasChanges = true;
			itemsToPush = [key, window.location.href];
		} else {
			itemsToPush = keyValue;
		}
		appStoreTagContent.push(itemsToPush.join('='));
	}

	if (!hasChanges) return;
	appStoreTag.setAttribute('content', appStoreTagContent.join(', '));
}

function windowHasChanges() {
	setAppStoreTag();

	const path = makePath();
	if (path === currentPath.value) return;
	currentPath.value = path;
}

function setup() {
	setAppStoreTag();

	onMounted(() => {
		window.addEventListener('hashchange', windowHasChanges);
	});
}

export default {
	data: () => ({
		currentPath,
	}),
	computed: {
		currentView,
	},
	setup,
	name: 'App',
	components: {
		HomeScreen,
		AppFooter,
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	margin-top: 32px;
}

@media (prefers-color-scheme: no-preference) {
	* {
		background-color: #ffffff;
	}

	#app {
		color: #2c3e50;
	}
}

@media (prefers-color-scheme: light) {
	* {
		background-color: #ffffff;
	}

	#app {
		color: #2c3e50;
	}
}

@media (prefers-color-scheme: dark) {
	* {
		background-color: #000000;
	}

	#app {
		color: #f2fafa;
	}
}
</style>
