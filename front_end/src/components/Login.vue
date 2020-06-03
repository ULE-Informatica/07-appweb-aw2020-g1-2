<template>
  <form>
    <v-text-field
      v-model="username"
      :rules="[rules.required, rules.min]"
      :counter="10"
      label="Username"
      required
      @input="$v.username.$touch()"
      @blur="$v.username.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      value=""
      hint="At least 8 characters"
      counter
      @click:append="show = !show"
          ></v-text-field>

    <v-btn class="mr-4" @click="submit">Submit</v-btn>
  </form>
</template>

<script>
const axios = require('axios').default;
  export default {
    data () {
      return {
        header: 'Login',
        username: '',
        show: false,
        password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
      }
    },
    mounted:()  => {
      axios
        .get('http://localhots:3000/data/authentication')
        .then(res => {
          console.log(res.data);

        })
        .catch(e =>{
          console.log(e.response);
        })
    },
    methods: {
      submit () {
        this.$v.$touch()
        
      },
    },
  }

/*
import UserControl from '../Contollers/UserControl'
export default {
  data () {
    return {
      header: 'Login',
      username: '',
      password: ''
    }
  },
  methods: {
    async loginManager (username, password) {//HABRÁ QUE TENER UN CONTROLADOR EN EL BACK_END QUE HAGA EL LOGIN EN LA BASE DE DATOS
      try {
        await UserControl.login({
          username: username,
          password: password
        })
        alert('Logged in')
        this.$store.commit('toggleLoggedin')
      } catch (e) {
        console.log(e)
        alert('error logging in')
      }
    }
  }
}
*/
</script>

<style scoped lang='scss'>
* {
  font-size: 16px;
}

h1 {
  font-size: 3em;
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
</style>
