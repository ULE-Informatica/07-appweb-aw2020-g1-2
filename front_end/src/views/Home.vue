<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Nav></Nav>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Navegacion.vue";

export default {
  name: "Home",
  components: {
    Nav
  }
};
</script>