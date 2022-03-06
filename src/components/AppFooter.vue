<template>
	<footer>
		<p>Ⓒ {{ currentYear }} Kamaal Farah</p>
	</footer>
</template>

<script>
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export default {
	data: () => ({
		currentYear,
	}),
	name: 'AppFooter',
};
</script>

<style scoped>
footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	justify-content: center;
}
</style>
