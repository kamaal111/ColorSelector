<template>
	<HomeContent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HomeContent from '../components/home-screen/HomeContent.vue';

export default defineComponent({
	name: 'HomeScreen',
	components: {
		HomeContent,
	},
});
</script>
