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
import { createToast } from 'mosha-vue-toastify';

import { getParamObject } from '../utils/routing';
import { hexToRGB, getRandomHexColor } from '../utils/colors';
import { decimalToHex } from '../utils/numbers';

const red = ref(152);
const green = ref(129);
const blue = ref(123);

function colorPreviewStyle() {
	return `background-color: rgba(${red.value},${green.value},${blue.value},1)`;
}

function assignHexToPath(hex: string) {
	window.location.search = `?hex=${hex.slice(1)}`;
}

function getHexFromPath() {
	const { hex } = getParamObject<{ hex?: string }>(
		window.location.search.slice(1)
	);

	if (hex != null) return hex;

	const randomHex = getRandomHexColor();

	assignHexToPath(randomHex);

	return randomHex;
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

function currentHex() {
	const r = decimalToHex(red.value);
	const g = decimalToHex(green.value);
	const b = decimalToHex(blue.value);

	const hex = `#${r}${g}${b}`;
	return hex;
}

async function copyEvent(text: string) {
	await navigator.clipboard.writeText(text);
	createToast(`Copied: ${text}`);
}

async function hexPressEvent() {
	const hex = currentHex();
	await copyEvent(hex);
	return true;
}

async function rgbPressEvent() {
	const rgb = currentRGB();
	await copyEvent(rgb);
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
