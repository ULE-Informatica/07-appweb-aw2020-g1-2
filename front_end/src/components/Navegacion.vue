<template>
  <div class="navegacion">
<router-link to="/login">Login </router-link>
    <router-link to="/register">Register</router-link>  </div>
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
  margin: 0 10px;
  &:hover {
    cursor: pointer;
  }
}
</style>
