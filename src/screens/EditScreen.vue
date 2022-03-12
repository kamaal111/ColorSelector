<template>
	<div id="color-preview" :style="previewStyle" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const red = ref(152);
const green = ref(129);
const blue = ref(123);

function previewStyle() {
	return `background-color: rgba(${red.value},${green.value},${blue.value},1)`;
}

export default defineComponent({
	name: 'EditScreen',
	computed: {
		previewStyle,
	},
});
</script>

<style lang="scss" scoped>
@use 'sass:map';

@import '../styles/variables';

$color-preview-size: 200px;

#color-preview {
	width: $color-preview-size;
	height: $color-preview-size;
	border-radius: map.get($sizes, 'medium');
	margin: 0 auto;
}
</style>
