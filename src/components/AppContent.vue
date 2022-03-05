<template>
  <div id="content">
    <img id="iphone-home-screen" :src="getIPhoneHomeScreenSource()" />
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
import IPhoneHomeScreenDark from "../assets/iphone-home-screen-dark.png";
import IPhoneHomeScreenLight from "../assets/iphone-home-screen-light.png";

const darkModeMatch = matchMedia("(prefers-color-scheme: dark)");
const isDarkMode = ref(darkModeMatch.matches);

darkModeMatch.addEventListener("change", (event) => {
  if (isDarkMode.value == event.matches) return;
  isDarkMode.value = event.matches;
});

const assets = {
  dark: {
    appStore: AppStoreDarkSVG,
    macStore: MacStoreDarkSVG,
    iPhoneHomeScreen: IPhoneHomeScreenDark,
  },
  light: {
    appStore: AppStoreLightSVG,
    macStore: MacStoreLightSVG,
    iPhoneHomeScreen: IPhoneHomeScreenLight,
  },
};

const getCurrentAssets = () => {
  if (isDarkMode.value) return assets.dark;
  return assets.light;
};

const getAppStoreSource = () => getCurrentAssets().appStore;
const getMacStoreSource = () => getCurrentAssets().macStore;
const getIPhoneHomeScreenSource = () => getCurrentAssets().iPhoneHomeScreen;

export default {
  methods: {
    getAppStoreSource,
    getMacStoreSource,
    getIPhoneHomeScreenSource,
  },
  name: "AppContent",
};
</script>

<style scoped>
#content {
  display: flex;
  flex-direction: column;
  margin: -16px auto auto;
}

#iphone-home-screen {
  height: 320px;
  width: calc(320px / 1.85);
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
