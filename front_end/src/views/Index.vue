<template>
  <div class="index">
    <div class="center">
    <img alt="Vue logo" src="../assets/logo.png" />
    
    <Nav></Nav>
    </div>
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
    background-color: bisque;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center {

    background-color: aquamarine;
    width: 300px;
  }

</style>
