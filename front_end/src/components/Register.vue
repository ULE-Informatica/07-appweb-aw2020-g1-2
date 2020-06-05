<template>
<div style="margin-top: 20px">
  <v-form v-model="valid">
    <v-container>
      <v-col>
        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            :counter="50"
            label="Usuario"
            required
                  @change="error=false"

          ></v-text-field>
        </v-row>
        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
                  @change="error=false"

          ></v-text-field>
        </v-row>
        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            :counter="20"
            label="Contraseña"
            required
            @click:append="show = !show"
          ></v-text-field>
        </v-row>
        <v-row
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="passwordConfirm"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules, passwordConfirmationRule]"
            :type="show2 ? 'text' : 'password'"
            :counter="20"
            label="Repita contraseña"
            required
            @click:append="show2 = !show2"
          ></v-text-field>
        </v-row>
      </v-col>
          <v-btn class="mr-4" v-on:click="submit">Registrar</v-btn>
          <v-alert
            :value="error"
            type="error"
            transition="scale-transition"
          >
            El usuario o el correo ya se encuentra registrado
          </v-alert>
    </v-container>
  </v-form>
</div>
</template>

<script>
var indexControl = require("./../controllers/indexControl");
export default {
  data: () => ({
    success: false,
    error: false,
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
    }
  },
  methods: {
    submit: async function() {
      console.log("Creando el usuario");

      indexControl
        .registrar(this.username, this.password, this.email)
        .then( res => {
          if(!res){
            console.log("error");
            this.error=true;
          }else{
            console.log("Registro correcto");
            this.$router.push("Home");
          }            
        })
        .catch(err => {
          console.log(err.data);
          if(err.data==undefined){
            console.log("error");
            console.log("error");
            console.log("error");
            this.error=true;
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
  background-color:grey;
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
