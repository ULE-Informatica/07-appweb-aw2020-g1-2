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


      
      <v-toolbar-items class="hidden-xs-only" color="red darken-3" dark>
        <v-btn 
          
          v-for="item in menuLogout"
          :key="item.title"
          :to="item.path">
          
          {{ item.title }}
          
        </v-btn>
      </v-toolbar-items>
      

    </v-app-bar>
    <v-toolbar-items class="hidden-xs-only" color="red darken-5" background-color="red" >
        <v-btn 
          color="red"

          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    
    <v-footer height="50px" color="red darken-3" dark absolute>
        
    </v-footer>
 </v-nav>
 </div>
</template>

<script>
//En vez de rehacer la barra aqui podriamos importarla de Barra al igual que App.vue , si sobra tiempo para limpiar codigo lo hare
export default {
  name: "App",
  data(){
    return {
      sidebar: false,
      menuItems: [
          { title: 'Libros', path: '/books'},
          { title: 'Lista', path: '/myList' },
          { title: 'Favoritos', path: '/favs' },
          { title: 'Leidos', path: '/read' }
     ],
     menuLogout: [
          { title: 'Log out', path: '/'},
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