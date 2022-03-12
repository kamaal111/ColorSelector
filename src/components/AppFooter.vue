<template>
	<footer>
		<p>Ⓒ {{ currentYear }} Kamaal Farah</p>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export default defineComponent({
	data: () => ({
		currentYear,
	}),
	name: 'AppFooter',
});
</script>

<style lang="scss" scoped>
footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	justify-content: center;
}
</style>
