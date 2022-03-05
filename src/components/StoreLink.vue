<template>
  <a class="store-link" href="https://apple.co/3gLJDFa" target="_blank">
    <img :src="link" />
  </a>
</template>

<script>
export default {
  name: "StoreLink",
  props: {
    link: String,
  },
};
</script>

<style scoped>
.store-link {
  margin: 0 8px;
}
</style>
