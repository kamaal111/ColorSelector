<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<script>
import { ref } from "vue";

const count = ref(0);

const increment = () => {
  count.value += 1;
};

export default {
  data: () => ({
    count,
  }),
  methods: {
    increment,
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
