<template>
  <div class="fondo"  >
    <div class="center" centered>
      <v-img class="center">
        <img alt="Vue logo" src="../assets/LogoV1.png" class="imagen" />
      </v-img>
      <Nav class="center"></Nav>
    </div>
    <h3>Bienvenido a BookedBooks, esta es una aplicación de servicio de descarga de libros online, la idea es ofrecer un servicio similar a netflix pero para la lectura de libros.</h3>
    <h3> Las prestaciones que ofrece actualmente seria registrarse en la base de datos de la aplicacion, loguearse como usuario, ver los libros existentes en la base de datos,ver una lista de tus libros, ver la lista de tus libros favoritos y una lista de libros leidos.</h3>
    <h3>Esta aplicación ha sido realizada por David Ondicol García, David Gonzalez García , Alejandro García Fernandez y Juan Miguel Frá Álvarez.
    </h3>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/IndexPanel.vue";
import Vue from "vue";
export default {
  name: "Index",
  components: {
    Nav
  },
  mounted: function () {
    
    Vue.prototype.$usuario=null;
  }
};
</script>

<style scoped>
  .index {
    background-color: bisque;
    display: flex;
    justify-content: center;
    align-items: right;
  }
  .center {
    background-color: lightcoral;
    height: unset;
    width: unset;
  }
  .imagen{
    display: block; 
    margin-left: auto; 
    margin-right: auto;
  }
  .fondo{
    background: lightcoral;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  h3{
    margin: 10px;
    margin-top: 20px;
  }

</style>
