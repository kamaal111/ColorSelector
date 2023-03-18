<template>
	<a
		class="store-link"
		href="https://apple.co/3gLJDFa"
		target="_blank"
		rel="noreferrer"
	>
		<img :src="link" alt="store link" />
	</a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'StoreLink',
	props: {
		link: String,
	},
});
</script>

<style lang="scss" scoped>
@use 'sass:map';

@import '../styles/variables';

.store-link {
	margin: 0 map.get($sizes, 'small');
}
</style>
