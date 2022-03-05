<template>
  <div id="content">
    <img id="iphone-home-screen" :src="iPhoneHomeScreenSource" />
    <StoreLinks :isDarkMode="isDarkMode" />
  </div>
</template>

<script>
import { ref } from "vue";

import StoreLinks from "./StoreLinks.vue";

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
    iPhoneHomeScreen: IPhoneHomeScreenDark,
    macHomeScreen: MacHomeScreenDark,
  },
  light: {
    iPhoneHomeScreen: IPhoneHomeScreenLight,
    macHomeScreen: MacHomeScreenLight,
  },
};

function getCurrentAssets() {
  if (isDarkMode.value) return assets.dark;
  return assets.light;
}

function iPhoneHomeScreenSource() {
  return getCurrentAssets().iPhoneHomeScreen;
}

export default {
  data: () => ({
    isDarkMode,
  }),
  computed: {
    iPhoneHomeScreenSource,
  },
  components: {
    StoreLinks,
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
</style>
