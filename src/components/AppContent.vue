<template>
  <div id="content">
    <img id="qr-code" :src="getQRCodeSource()" />
    <button @click="appStoreButtonClick">
      <img :src="appStoreSVG" />
    </button>
  </div>
</template>

<script>
import { ref } from "vue";

import AppStoreSVG from "../assets/app-store-black.svg";
import QRCodeDarkImage from "../assets/qr-code-dark.jpg";
import QRCodeLightImage from "../assets/qr-code-light.jpg";

const darkModeMatch = matchMedia("(prefers-color-scheme: dark)");
const isDarkMode = ref(darkModeMatch.matches);

matchMedia("(prefers-color-scheme: dark)").addEventListener(
  "change",
  (event) => {
    isDarkMode.value = event.matches;
  }
);

const getQRCodeSource = () => {
  if (isDarkMode.value) return QRCodeDarkImage;
  return QRCodeLightImage;
};

const appStoreButtonClick = () => {
  console.log("yipiiii clicked");
};

export default {
  data: () => ({
    appStoreSVG: AppStoreSVG,
  }),
  methods: {
    getQRCodeSource,
    appStoreButtonClick,
  },
  name: "AppContent",
};
</script>

<style scoped>
#content {
  display: flex;
  flex-direction: column;
  margin: auto;
}

#qr-code {
  height: 200px;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}

button {
  border: 0;
  user-select: none;
  margin: 16px;
}
</style>
