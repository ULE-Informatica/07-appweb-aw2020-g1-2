<template>
  <v-app>
    <Barra />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
    
 
</template>



<script>
import Barra from "@/views/Barra.vue"

export default {
  name: "App",
  components: {
      Barra
    },
  data(){
    return {
    }
  },
};
</script>