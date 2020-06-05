<template>
  <nav>
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

  </nav>
    
 
</template>


<script>

export default {
  name: "App",
  
  data(){
    return {
      sidebar: false,
      menuItems: [
          { title: 'Index', path: '/' },
          { title: 'Login', path: '/login' },
          { title: 'Registrarse', path: '/register' }
     ]
    }
  },
};
</script>