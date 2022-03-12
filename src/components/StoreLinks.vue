<template>
	<div id="store-links">
		<span v-for="source of appStoreSources" :key="source">
			<StoreLink :link="source" />
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import StoreLink from './StoreLink.vue';

import AppStoreDarkSVG from '../assets/app-store-black.svg';
import AppStoreLightSVG from '../assets/app-store-white.svg';
import MacStoreDarkSVG from '../assets/mac-store-black.svg';
import MacStoreLightSVG from '../assets/mac-store-white.svg';

const assets = {
	dark: [AppStoreDarkSVG, MacStoreDarkSVG],
	light: [AppStoreLightSVG, MacStoreLightSVG],
};

function appStoreSources<T extends boolean>(this: {
	isDarkMode: T;
	appStoreSources: () => T extends true
		? typeof assets.dark
		: typeof assets.light;
}) {
	if (this.isDarkMode) return assets.dark;
	return assets.light;
}

export default defineComponent({
	name: 'StoreLinks',
	props: {
		isDarkMode: Boolean,
	},
	components: {
		StoreLink,
	},
	computed: {
		appStoreSources,
	},
});
</script>

<style lang="scss" scoped>
#store-links {
	margin: 16px auto;
}
</style>
