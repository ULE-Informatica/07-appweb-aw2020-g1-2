<template>
  <div class="index">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Nav></Nav>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/IndexPanel.vue";
//import Vue from "vue";
export default {
  name: "Index",
  components: {
    Nav
  },
};
</script>

<style scoped>
    .index {
            align-content: center;
    }
</style>
