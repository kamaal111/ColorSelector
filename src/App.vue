<template>
	<component :is="currentView" />
</template>

<script>
import HomeScreen from './screens/HomeScreen.vue';

const routes = {
	'/': HomeScreen,
};

function currentView() {
	return routes[this.currentPath ?? '/'] ?? HomeScreen;
}

function makePath() {
	const path = window.location.pathname.split('/').slice(2).join('/');
	if (path.length == 0) return '/';
	return path;
}

function mounted() {
	window.addEventListener('hashchange', () => {
		const path = makePath();
		this.currentPath = path;
	});
}

export default {
	data: () => ({
		currentPath: makePath(),
	}),
	computed: {
		currentView,
	},
	mounted,
	name: 'App',
	components: {
		HomeScreen,
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
