<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            :counter="50"
            label="Usuario"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            :counter="4"
            label="Contraseña"
            required
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="passwordConfirm"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules, passwordConfirmationRule]"
            :type="show2 ? 'text' : 'password'"
            :counter="4"
            label="Repita contraseña"
            required
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-col>
      </v-row>
          <v-btn class="mr-4" v-on:click="submit">Registrar</v-btn>
          <v-alert
            :value="errorEmail"
            type="error"
            transition="scale-transition"
          >
            El correo ya se encuentra registrado
          </v-alert>
          <v-alert
            :value="errorUser"
            type="error"
            transition="scale-transition"
          >
            El usuario ya se encuentra registrado
          </v-alert>
    </v-container>
  </v-form>
</template>

<script>
import indexControl from "../controllers/indexControl"
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
    submit: async function() {
      console.log("Creando el usuario");

      control
        .registrar(this.username, this.password, this.email)
        .then( () => {
            console.log("Registro correcto correctas");
            this.$router.push("Home");

        })
        .catch(err => {
          if (err.message=="NombreUsuario must be unique"){
            console.log("error usuario");
            this.errorUser=true;
            setTimeout(this.errorUser=false,10);
          }
          if (err.message=="Email must be unique"){
            console.log("error email");
            this.errorEmail=true;
            setTimeout(this.errorEmail=false,10);
          }
          });
        //this.$router.push('Home')
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
  background-color: cadetblue;
  width: 30em;
  height: 20em;
  margin: auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
