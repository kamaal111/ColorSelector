<template>
	<div id="color-preview" :style="colorPreviewStyle" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

const colorNames = ref({});
const red = ref(152);
const green = ref(129);
const blue = ref(123);

function colorPreviewStyle() {
	return `background-color: rgba(${red.value},${green.value},${blue.value},1)`;
}

function getParamObject() {
	return window.location.search
		.slice(1)
		.split('&')
		.reduce((acc, keyValue) => {
			const splittedKeyValue = keyValue.split('=');
			if (splittedKeyValue.length !== 2) return acc;
			return { ...acc, [splittedKeyValue[0]]: splittedKeyValue[1] };
		}, {} as { hex?: string });
}

function hexToRGB(hex: string) {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	const newHex = hex.replace(shorthandRegex, (_m, r, g, b) => {
		return r + r + g + g + b + b;
	});

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
	if (result == null) return null;

	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
	};
}

function setup() {
	let { hex } = getParamObject();

	if (hex == null) {
		let colorsNamesObject = {};
		if (Object.values(colorNames.value).length === 0) {
			colorsNamesObject = require('../assets/color-names.json');
			colorNames.value = colorsNamesObject;
		} else {
			colorsNamesObject = colorNames.value;
		}

		const allHexCodes = Object.keys(colorsNamesObject);
		const index = Math.floor(Math.random() * allHexCodes.length);
		hex = allHexCodes[index] ?? 'ffffff';
		return;
	}

	const rgb = hexToRGB(hex);
	if (rgb == null) return;

	red.value = rgb.r;
	green.value = rgb.g;
	blue.value = rgb.b;
}

export default defineComponent({
	name: 'EditScreen',
	computed: {
		colorPreviewStyle,
	},
	setup,
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
