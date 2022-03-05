<template>
  <img :src="getQRCodeSource()" />
</template>

<script>
import { ref } from "vue";

const darkModeMatch = matchMedia("(prefers-color-scheme: dark)");
const isDarkMode = ref(darkModeMatch.matches);

matchMedia("(prefers-color-scheme: dark)").addEventListener(
  "change",
  (event) => {
    isDarkMode.value = event.matches;
  }
);

const getQRCodeSource = () => {
  const images = require.context("../assets", false, /\.jpg$/);
  if (isDarkMode.value) {
    return images("./qr-code-dark.jpg");
  }
  return images("./qr-code-light.jpg");
};

export default {
  methods: {
    getQRCodeSource,
  },
  name: "AppContent",
};
</script>

<style>
button {
  font-weight: bold;
  color: red;
}
</style>
