<template>
	<component :is="currentView" />
	<AppFooter />
</template>

<script>
import { ref, onMounted } from 'vue';

import HomeScreen from './screens/HomeScreen.vue';
import EditScreen from './screens/EditScreen.vue';
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
	'/edit': EditScreen,
};

function currentView() {
	return routes[currentPath.value] ?? HomeScreen;
}

function setup() {
	onMounted(() => {
		window.addEventListener('hashchange', () => {
			const path = makePath();
			currentPath.value = path;
		});
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
