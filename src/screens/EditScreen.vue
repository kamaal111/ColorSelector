<template>
	<div id="content">
		<div id="color-preview" :style="colorPreviewStyle" />
		<div id="copyable-text-section">
			<button class="copyable-text" @click="$emit('hexPress')">
				📋 Hex: {{ currentHex }}
			</button>
			<button class="copyable-text" @click="$emit('rgbPress')">
				📋 RGB: {{ currentRGB }}
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { getParamObject } from '../utils/routing';

const colorNames = ref({});
const red = ref(152);
const green = ref(129);
const blue = ref(123);

function colorPreviewStyle() {
	return `background-color: rgba(${red.value},${green.value},${blue.value},1)`;
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

function getHexFromPath() {
	const { hex } = getParamObject<{ hex?: string }>(
		window.location.search.slice(1)
	);

	if (hex != null) return hex;

	let colorsNamesObject = {};
	if (Object.values(colorNames.value).length === 0) {
		colorsNamesObject = require('../assets/color-names.json');
		colorNames.value = colorsNamesObject;
	} else {
		colorsNamesObject = colorNames.value;
	}

	const allHexCodes = Object.keys(colorsNamesObject);
	const index = Math.floor(Math.random() * allHexCodes.length);
	return allHexCodes[index] ?? '#ffffff';
}

function setup() {
	const hex = getHexFromPath();

	const rgb = hexToRGB(hex);
	if (rgb == null) return;

	red.value = rgb.r;
	green.value = rgb.g;
	blue.value = rgb.b;
}

function currentRGB() {
	return `${red.value},${green.value},${blue.value}`;
}

function decimalToHex(decimal: number) {
	const hex = decimal.toString(16);
	if (hex.length === 1) return `0${hex}`;
	return hex;
}

function currentHex() {
	const r = decimalToHex(red.value);
	const g = decimalToHex(green.value);
	const b = decimalToHex(blue.value);

	const hex = `#${r}${g}${b}`;
	return hex;
}

async function hexPressEvent() {
	const hex = currentHex();
	await navigator.clipboard.writeText(hex);
	return true;
}

async function rgbPressEvent() {
	const rgb = currentRGB();
	await navigator.clipboard.writeText(rgb);
	return true;
}

export default defineComponent({
	name: 'EditScreen',
	computed: {
		colorPreviewStyle,
		currentRGB,
		currentHex,
	},
	setup,
	emits: {
		hexPress: hexPressEvent,
		rgbPress: rgbPressEvent,
	},
});
</script>

<style lang="scss" scoped>
@use 'sass:map';

@import '../styles/variables';

$color-preview-size: 200px;

#content {
	margin-bottom: 64px;
}

#color-preview {
	width: $color-preview-size;
	height: $color-preview-size;
	border-radius: map.get($sizes, 'medium');
	margin: 0 auto;
}

#copyable-text-section {
	margin-top: map.get($sizes, 'medium');
	display: flex;
	flex-direction: column;
}

.copyable-text {
	border-color: transparent;
	font-size: 15px;
	font-weight: 600;
	margin: 0 auto;
	cursor: pointer;
}

@media (prefers-color-scheme: no-preference) {
	$copyable-text-color: map.get($accent-colors, 'light');

	.copyable-text {
		color: $copyable-text-color;
	}

	.copyable-text:active {
		color: darken($copyable-text-color, 20%);
	}
}

@media (prefers-color-scheme: light) {
	$copyable-text-color: map.get($accent-colors, 'light');

	.copyable-text {
		color: $copyable-text-color;
	}

	.copyable-text:active {
		color: darken($copyable-text-color, 20%);
	}
}

@media (prefers-color-scheme: dark) {
	$copyable-text-color: map.get($accent-colors, 'dark');

	.copyable-text {
		color: $copyable-text-color;
	}

	.copyable-text:active {
		color: darken($copyable-text-color, 20%);
	}
}
</style>
