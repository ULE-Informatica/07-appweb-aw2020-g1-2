<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Nav></Nav>
    <div>
      <h1>{{ userName }} Home</h1>
    </div>
  </div>
</template>

<script>
//FALTARIA AÑADIR FUNCION PRE RENDER (EN PLANTILLA TAL VEZ)
// @ is an alias to /src
import Vue from "vue";
export default {
  name: "Home",
  components: {

  },
  data() {
    return {     
      userName: Vue.prototype.$usuario.nombreUsuario
    };
  }
};
</script>
