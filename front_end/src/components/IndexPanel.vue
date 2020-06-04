<template>
  <div class="indexPanel">
    <router-link to="/login" class="navegacion-item">Login</router-link>
    <router-link to="/register" class="navegacion-item">Register</router-link>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
.navegacion-item {
  display: inline-block;
  margin: 10px 10px;
  &:hover {
    cursor: pointer;
  }
}
</style>
