<template>
  <AppHeader title="Color Selector" />
  <AppContent />
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppContent from "./components/AppContent.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppContent,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 32px;
}

@media (prefers-color-scheme: no-preference) {
  * {
    background-color: #ffffff;
  }

  #app {
    color: #2c3e50;
  }
}

@media (prefers-color-scheme: light) {
  * {
    background-color: #ffffff;
  }

  #app {
    color: #2c3e50;
  }
}

@media (prefers-color-scheme: dark) {
  * {
    background-color: #000000;
  }

  #app {
    color: #f2fafa;
  }
}
</style>
