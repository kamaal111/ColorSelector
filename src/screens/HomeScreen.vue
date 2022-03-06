<template>
	<HomeHeader />
	<HomeContent />
</template>

<script>
import HomeHeader from '../components/home-screen/HomeHeader.vue';
import HomeContent from '../components/home-screen/HomeContent.vue';

export default {
	name: 'HomeScreen',
	components: {
		HomeHeader,
		HomeContent,
	},
};
</script>
