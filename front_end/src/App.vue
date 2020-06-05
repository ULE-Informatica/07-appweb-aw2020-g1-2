<template>

<v-app>
  <v-app-bar app color="red darken-3" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/LogoV1.png"
          transition="scale-transition"
          width="200"
        />

      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only" color="red darken-3">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

    </v-app-bar>

   <v-content>
      <router-view />
    </v-content>
</v-app>
    
 
</template>


<script>
//import HelloWorld from "./components/HelloWorld.vue";
/*
export default {
  name: "App",

  components: {
    //HelloWorld
    
  },

  data: () => ({
    //
  })
};*/

export default {
  name: "App",
  data(){
    return {
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/' },
          { title: 'Registrarse', path: '/register' },
          { title: 'Login', path: '/login' }
     ]
    }
  },
};
</script>