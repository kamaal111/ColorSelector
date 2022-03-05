<template>
	<div id="header">
		<h1>{{ title }}</h1>
	</div>
</template>

<script>
export default {
	name: 'AppHeader',
	props: {
		title: String,
	},
};
</script>

<style scoped></style>
