<template>
  <div id="content">
    <img id="iphone-home-screen" :src="getIPhoneHomeScreenSource()" />
    <div id="store-links">
      <span v-for="source of appStoreSources" :key="source">
        <a class="store-link" href="https://apple.co/3gLJDFa" target="_blank">
          <img :src="source" />
        </a>
      </span>
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
import MacHomeScreenDark from "../assets/mac-home-screen-dark.png";
import MacHomeScreenLight from "../assets/mac-home-screen-light.png";

const darkModeMatch = matchMedia("(prefers-color-scheme: dark)");
const isDarkMode = ref(darkModeMatch.matches);

darkModeMatch.addEventListener("change", ({ matches }) => {
  if (isDarkMode.value == matches) return;
  isDarkMode.value = matches;
});

const assets = {
  dark: {
    appStore: AppStoreDarkSVG,
    macStore: MacStoreDarkSVG,
    iPhoneHomeScreen: IPhoneHomeScreenDark,
    macHomeScreen: MacHomeScreenDark,
  },
  light: {
    appStore: AppStoreLightSVG,
    macStore: MacStoreLightSVG,
    iPhoneHomeScreen: IPhoneHomeScreenLight,
    macHomeScreen: MacHomeScreenLight,
  },
};

const getCurrentAssets = () => {
  if (isDarkMode.value) return assets.dark;
  return assets.light;
};

const getIPhoneHomeScreenSource = () => getCurrentAssets().iPhoneHomeScreen;

const appStoreSources = () => {
  const { appStore, macStore } = getCurrentAssets();
  return [appStore, macStore];
};

export default {
  methods: {
    getIPhoneHomeScreenSource,
  },
  computed: {
    appStoreSources,
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

.store-link {
  margin: 0 8px;
}
</style>
