<template>
	<HomeHeader />
	<HomeContent />
	<AppFooter />
</template>

<script>
import HomeHeader from '../components/home-screen/HomeHeader.vue';
import HomeContent from '../components/home-screen/HomeContent.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
	name: 'HomeScreen',
	components: {
		HomeHeader,
		HomeContent,
		AppFooter,
	},
};
</script>
