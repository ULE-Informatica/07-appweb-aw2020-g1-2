<template>
  <div class="bloque">
    <router-link to="/home" class="navegacion-item"> Home </router-link>
    <router-link to="/books" class="navegacion-item"> Ver Libros </router-link>
    <router-link to="/myList" class= "navegation-item"> Mi lista de libros </router-link>
    <router-link to="/read" class= "navegation-item"> Mi lista de leidos </router-link>
    <router-link to="/favs" class= "navegation-item"> Mi lista de favoritos </router-link>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.navegation-item {
  margin-left: 10px;
}
</style>