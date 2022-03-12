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

function getHexFromPath() {
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
		hex = allHexCodes[index] ?? '#ffffff';
	}

	return hex;
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
	const hex = getHexFromPath();
	if (hex[0] !== '#') return `#${hex}`;
	return hex;
}

function hexPress() {
	console.log('hex');
	return true;
}

function rgbPress() {
	console.log('rgb');
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
		hexPress,
		rgbPress,
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
