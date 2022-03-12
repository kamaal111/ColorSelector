<template>
	<AppHeader />
	<HomeContent />
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import HomeContent from '../components/home-screen/HomeContent.vue';

export default {
	name: 'HomeScreen',
	components: {
		AppHeader,
		HomeContent,
	},
};
</script>
