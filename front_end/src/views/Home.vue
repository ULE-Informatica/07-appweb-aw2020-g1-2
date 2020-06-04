<template>
<div>
  <div class="center">
    <img alt="Vue logo" src="../assets/LogoV1.png" />    
  </div>
  <div class="center">
    <h1>{{ userName }} home page</h1>
  </div>
  <div class="center">
    <Botones></Botones>
  </div>
</div>
</template>

<script>
//FALTARIA AÑADIR FUNCION PRE RENDER (EN PLANTILLA TAL VEZ)
// @ is an alias to /src
import Vue from "vue";
import Botones from "../components/Botones"
export default {
  name: "Home",
  components: {
      Botones
  },
  data() {
    return {     
      userName: Vue.prototype.$usuario.nombreUsuario
    };
  }
};
</script>

<style scoped>
  .center {
    background-color: bisque;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inside {

    background-color: aquamarine;
    width: 300px;
  }

</style>
