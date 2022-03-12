<template>
	<div id="content">
		<span id="app-preview-section">
			<img id="mac-home-screen" :src="macHomeScreenSource" />
			<img id="iphone-home-screen" :src="iPhoneHomeScreenSource" />
		</span>
		<StoreLinks :isDarkMode="isDarkMode" />
	</div>
</template>

<script>
import { ref } from 'vue';

import StoreLinks from '../StoreLinks.vue';

import IPhoneHomeScreenDark from '../../assets/iphone-home-screen-dark.png';
import IPhoneHomeScreenLight from '../../assets/iphone-home-screen-light.png';
import MacHomeScreenDark from '../../assets/mac-home-screen-dark.png';
import MacHomeScreenLight from '../../assets/mac-home-screen-light.png';

const darkModeMatch = matchMedia('(prefers-color-scheme: dark)');
const isDarkMode = ref(darkModeMatch.matches);

darkModeMatch.addEventListener('change', ({ matches }) => {
	if (isDarkMode.value == matches) return;
	isDarkMode.value = matches;
});

const assets = {
	dark: {
		iPhoneHomeScreen: IPhoneHomeScreenDark,
		macHomeScreen: MacHomeScreenDark,
	},
	light: {
		iPhoneHomeScreen: IPhoneHomeScreenLight,
		macHomeScreen: MacHomeScreenLight,
	},
};

function getCurrentAssets() {
	if (isDarkMode.value) return assets.dark;
	return assets.light;
}

function iPhoneHomeScreenSource() {
	return getCurrentAssets().iPhoneHomeScreen;
}

function macHomeScreenSource() {
	return getCurrentAssets().macHomeScreen;
}

export default {
	data: () => ({
		isDarkMode,
	}),
	computed: {
		iPhoneHomeScreenSource,
		macHomeScreenSource,
	},
	components: {
		StoreLinks,
	},
	name: 'HomeContent',
};
</script>

<style scoped>
#content {
	display: flex;
	flex-direction: column;
	margin: -16px auto 64px;
}

#mac-home-screen {
	width: 400px;
	height: 400px;
	margin: auto;
}

#iphone-home-screen {
	height: 300px;
	width: calc(300px / 1.85);
	margin: 75px auto;
}

@media only screen and (max-width: 768px) {
	#mac-home-screen {
		width: 60vw;
		height: 60vw;
	}

	#iphone-home-screen {
		height: 40vw;
		width: calc(40vw / 1.85);
		margin: 10vw auto;
	}
}
</style>
