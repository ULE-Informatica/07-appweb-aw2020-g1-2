<template>
  <div>
    <h1>{{ header }}</h1>

    <div class="error" v-if="errors.length">
      <p>
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
        </ul>
      </p>
    </div>

    <form @submit.prevent="createManager(username, password)">
      <label class="form" for='username'>Username:</label>
      <input class="form" type="text" v-model="username">
      <label class="form" for='email'>Email:</label>
      <input class="form" type="text" v-model="email">
      <label class="form" for='password'>Password:</label>
      <input class="form" type="text" v-model="password">
      <label class="form" for='confirm password'>Confirm Password:</label>
      <input class="form" type="text" v-model="confirmedPw">
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import UserControl from '../Contollers/userService'
export default {
  data () {
    return {
      header: 'Register',
      username: null,
      email: null,
      password: null,
      confirmedPw: null,
      errors: []
    }
  },
  methods: {
    async createManager (username, password) { //HABRÁ QUE TENER UN CONTROLADOR EN EL BACK_END QUE HAGA EL REGISTER EN LA BASE DE DATOS
      this.errors = []
      if (!this.username) {
        this.errors.push('Name required.')
        return
      }
      if (!this.email) {
        this.errors.push('Email required.')
        return
      }
      if (!this.password) {
        this.errors.push('Password required.')
        return
      }
      if (!this.confirmedPw || this.confirmedPw !== this.password) {
        this.errors.push('Please enter the same password again.')
        return
      }
      try {
        await UserControl.register({
          email: email,
          username: username,
          password: password
        })
        alert('Manager has successfully registered')
      } catch (err) {
        alert(err)
      }
    }
  }
}
</script>

<style scoped lang='scss'>

* {
  font-size: 16px;
}

.error{
  color: red;
  ul {
    list-style: none;
  }
}

form {
  width: 30em;
  height: 20em;
  margin: auto;
  button {
    display: block;
    margin: auto;
    width: 10em;
  }
  .form {
    margin-bottom: 1em;
    width: 10em;
    display: inline-block;
    line-height: 1.5em;
  }
}

h1 {
  font-size: 3em;
}

</style>
