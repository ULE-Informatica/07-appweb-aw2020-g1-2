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
    </v-container>
  </v-form>
</template>

<script>
var control = require("./../controllers/indexControl");
export default {
  data: () => ({
      show: false,
      show2: false,
      valid: false,
      username: '',
      
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length <= 50 || 'Username must be less than 20 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordConfirm: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v =>v.length >= 4 || 'Password must be valid',
        v =>v.length <= 20 || 'Password must be less than 20 characters',
      ]
    }),
  computed: {
    passwordConfirmationRule() {
      return () => (this.password === this.passwordConfirm) || 'Password must match'
    },
  },
  mounted: () => {},
  methods: {
    submit: async function() {
      console.log("Creando el usuario");

      control
        .registrar(this.username, this.password, this.email)
        .then( () => {
            console.log("Registro correcto correctas");
            this.$router.push("Home");

        })
        .catch(err => console.log(err.message));

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
