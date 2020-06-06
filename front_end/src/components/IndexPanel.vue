<template>
<v-expansion-panel class="navegacion-item" hover>
  <div class="indexPanel">
    
      <v-btn color="red darken-3" class="navegacion-item" centered
          
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          
          
          {{ item.title }}
          
        </v-btn>
    
  </div>
</v-expansion-panel>
</template>

<script>
export default {
 name: "App",
  data(){
    return {
      sidebar: false,
      menuItems: [
          { title: 'Login', path: '/login'},
          { title: 'Registrarse', path: '/register' },
          
     ]
    }
  },
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
.navegacion-item {
  
  margin: 10px 10px;
  width: 200px;
  background-color: red;
  text-align: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}
</style>
