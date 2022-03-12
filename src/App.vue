<template>
	<AppHeader />
	<component :is="currentView" />
	<AppFooter />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import HomeScreen from './screens/HomeScreen.vue';
import EditScreen from './screens/EditScreen.vue';

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

function makePath() {
	const pathComponents = window.location.pathname.split('/').slice(2);
	const path = pathComponents[0];
	if (path === undefined || path.length === 0) return '/';
	if (path[0] !== '/') return `/${path}`;
	return path;
}

const currentPath = ref(makePath());

const routes = {
	'/': HomeScreen,
	'/edit': EditScreen,
};

function currentView() {
	const { value } = currentPath;
	if (Object.keys(routes).includes(value)) return HomeScreen;
	return routes[value as keyof typeof routes];
}

function makeAppStoreTagContent(tag: Element) {
	let hasChanges = false;
	const appStoreTagContent: string[] = [];

	const contentArray = tag.getAttribute('content')?.split(',') ?? [];
	for (let index = 0; index < contentArray.length; index += 1) {
		const value = contentArray[index];
		const keyValue = value.trim().split('=');
		if (keyValue.length !== 2) continue;

		let itemsToPush;
		const [key] = keyValue;
		if (key === 'app-argument') {
			const { href } = window.location;
			if (href !== keyValue[1]) hasChanges = true;
			itemsToPush = [key, href];
		} else {
			itemsToPush = keyValue;
		}
		appStoreTagContent.push(itemsToPush.join('='));
	}

	return { hasChanges, appStoreTagContent };
}

function setAppStoreTag() {
	const appStoreTag = document.querySelector('meta[name="apple-itunes-app"]');
	if (appStoreTag == null) return;

	const { hasChanges, appStoreTagContent } = makeAppStoreTagContent(appStoreTag);

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

export default defineComponent({
	name: 'App',
	data: () => ({
		currentPath,
	}),
	computed: {
		currentView,
	},
	setup,
	components: {
		AppHeader,
		AppFooter,
	},
});
</script>

<style lang="scss">
@use 'sass:map';

@import 'styles/variables';

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	margin-top: 32px;
}

@media (prefers-color-scheme: no-preference) {
	* {
		background-color: map.get($background-colors, 'light');
	}

	#app {
		color: map.get($text-colors, 'light');
	}
}

@media (prefers-color-scheme: light) {
	* {
		background-color: map.get($background-colors, 'light');
	}

	#app {
		color: map.get($text-colors, 'light');
	}
}

@media (prefers-color-scheme: dark) {
	* {
		background-color: map.get($background-colors, 'dark');
	}

	#app {
		color: map.get($text-colors, 'dark');
	}
}
</style>
