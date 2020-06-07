<template>
 <div class="fondo">
   <div class="d-flex align-center">
      <v-img class="center">
        <img alt="Vue logo" src="../assets/LogoV1.png" class="imagen" width="400px" border-radious="50%"/>
      </v-img>
   </div>
  <div class="login-box">
  <v-form style="margin-top: 20px" class="login-box">
    <v-text-field
      v-model="username"
      :rules="[rules.required, rules.min]"
      :counter="50"
      label="Username"
      required
      @change="error=false"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      value
      hint="At least 4 characters"
      counter
      @click:append="show = !show"
      @change="error=false"
    ></v-text-field>

    <v-btn rounded class="mr-4" color="red darken-3" v-on:click="submit">Ingresar</v-btn>
    <v-alert
            :value="error"
            type="error"
            transition="scale-transition"
          >
            Usuario o contraseña invalidos
          </v-alert>
  </v-form>
  </div>
 </div>
</template>

<script>
var control = require("./../controllers/indexControl");
//const axios = require('axios').default;
export default {
  data() {
    return {
      error: false,
      header: "Login",
      username: "",
      show: false,
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 4 || "Min 4 characters"
      }
    };
  },
  mounted: () => {},
  methods: {
    submit: async function() {
      console.log("Verificando el usuario");

      control
        .verificar(this.username, this.password)
        .then( () => {
            console.log("Credenciales correctas");
            this.$router.push("Home");

        })
        .catch(err => {
          console.log(err.message)
          this.error=true;
        });

      //this.$router.push('Home')
    }
  }
};

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
/*
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
*/
.fondo{
    background: lightcoral;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
.imagen{
    display: block; 
    margin-left: auto; 
    margin-right: auto;
  }
form {
  background-color: gray;
  width: 30em;
  height: 12em;
  margin: auto;
  padding: 10px;
  border: 2px solid black;
  
  border-radius: 4px;
  button {
    display: block;
    margin: auto;
    margin-top: 50px;
    width: 10em;
  }
  .form {
    margin-bottom: 1em;
    width: 10em;
    display: inline-block;
    line-height: 1.5em;
  }
  /////////////////////////////////////////////////////////
  
///////////////////////////////////////////////
}
</style>
