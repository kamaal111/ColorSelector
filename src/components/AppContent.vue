<template>
  <div id="content">
    <img id="qr-code" :src="getQRCodeSource()" />
    <div id="store-links">
      <a href="https://apple.co/3gLJDFa" target="_blank">
        <img :src="getAppStoreSource()" />
      </a>
      <a href="https://apple.co/3gLJDFa" target="_blank">
        <img :src="getMacStoreSource()" />
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import AppStoreDarkSVG from "../assets/app-store-black.svg";
import AppStoreLightSVG from "../assets/app-store-white.svg";
import MacStoreDarkSVG from "../assets/mac-store-black.svg";
import MacStoreLightSVG from "../assets/mac-store-white.svg";
import QRCodeDarkImage from "../assets/qr-code-dark.jpg";
import QRCodeLightImage from "../assets/qr-code-light.jpg";

const darkModeMatch = matchMedia("(prefers-color-scheme: dark)");
const isDarkMode = ref(darkModeMatch.matches);

darkModeMatch.addEventListener("change", (event) => {
  if (isDarkMode.value == event.matches) return;
  isDarkMode.value = event.matches;
});

const assets = {
  dark: {
    qrCode: QRCodeDarkImage,
    appStore: AppStoreDarkSVG,
    macStore: MacStoreDarkSVG,
  },
  light: {
    qrCode: QRCodeLightImage,
    appStore: AppStoreLightSVG,
    macStore: MacStoreLightSVG,
  },
};

const getCurrentAssets = () => {
  if (isDarkMode.value) return assets.dark;
  return assets.light;
};

const getQRCodeSource = () => getCurrentAssets().qrCode;
const getAppStoreSource = () => getCurrentAssets().appStore;
const getMacStoreSource = () => getCurrentAssets().macStore;

export default {
  methods: {
    getQRCodeSource,
    getAppStoreSource,
    getMacStoreSource,
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

#store-links {
  margin: 16px auto;
}

#store-links a {
  margin: 0 8px;
}
</style>
