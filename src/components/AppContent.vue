<template>
  <div id="content">
    <img id="qr-code" :src="getQRCodeSource()" />
    <a id="app-store-button" href="https://apple.co/3gLJDFa" target="_blank">
      <img :src="getAppStoreSource()" />
    </a>
  </div>
</template>

<script>
import { ref } from "vue";

import AppStoreDarkSVG from "../assets/app-store-black.svg";
import AppStoreLightSVG from "../assets/app-store-white.svg";
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

const assets = {
  dark: {
    qrCode: QRCodeDarkImage,
    appStore: AppStoreDarkSVG,
  },
  light: {
    qrCode: QRCodeLightImage,
    appStore: AppStoreLightSVG,
  },
};

const getQRCodeSource = () => {
  if (isDarkMode.value) return assets.dark.qrCode;
  return assets.light.qrCode;
};

const getAppStoreSource = () => {
  if (isDarkMode.value) return assets.dark.appStore;
  return assets.light.appStore;
};

export default {
  methods: {
    getQRCodeSource,
    getAppStoreSource,
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
  margin: auto;
}

#app-store-button {
  margin: 16px auto;
  width: 120px;
}
</style>
