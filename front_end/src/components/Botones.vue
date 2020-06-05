<template>
 <div>
   <v-nav>
  <v-app-bar app color="red darken-3" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/LogoV1.png"
          transition="scale-transition"
          width="200"
        />

      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only" color="red darken-3" >
        <v-btn
          
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>


    </v-app-bar>

    <v-footer height="50px" color="red darken-3" dark absolute>
        
    </v-footer>
 </v-nav>
 </div>
</template>

<script>
//import App from "../App"
/*Codigo template Campero
<div class="bloque">
    <router-link to="/home" class="navegation-item"> Home </router-link>
    <router-link to="/books" class="navegation-item"> Ver Libros </router-link>
    <router-link to="/myList" class= "navegation-item"> Mi lista de libros </router-link>
    <router-link to="/read" class= "navegation-item"> Mi lista de leidos </router-link>
    <router-link to="/favs" class= "navegation-item"> Mi lista de favoritos </router-link>
  </div>
*/

/*
<v-app>
  <v-app-bar app color="red darken-3" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="../assets/LogoV1.png"
          transition="scale-transition"
          width="200"
        />

      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only" color="red darken-3" >
        <v-btn
          
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>


    </v-app-bar>


 </v-app>
*/
//import But from "../App.vue"
export default {
  name: "App",
  data(){
    return {
      sidebar: false,
      menuItems: [
          { title: 'Libros', path: '/books' },
          { title: 'Lista', path: '/myList' },
          { title: 'Favoritos', path: '/favs' },
          { title: 'Leidos', path: '/read' }
     ]
    }
  },
};

</script>

<style scoped lang="scss">
.navegation-item {
  margin-left: 20px;
}
</style>