<template>
  <div>
    <div class="center">
      <Botones></Botones>
    </div>
    <div>
      <v-alert
        type="success"
        v-model="alert1"
        color="green"
        dark
        border="top"
        transition="scale-transition"
        dismissible
      >El libro se ha agregado a la lista</v-alert>
    </div>
    <div>
      <v-alert
        type="warning"
        v-model="alert2"
        color="orange"
        dark
        border="top"
        transition="scale-transition"
        dismissible
      >EL libro ya está en la lista</v-alert>
    </div>
    <v-data-table :headers="headers" :items="libros" class="elevation-1">
      <img alt="Vue logo" src="../assets/LogoV1.png" />

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de libros</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <!--
          <v-icon small color="green" @click="editItem(item)" md-src="../assets/library_add-24px.svg">  </v-icon>

          <v-icon small color="red" @click="editItem(item)">mdi-delete</v-icon>

          <v-icon small @click="editItem(item)">mdi-star</v-icon>
        -->
        <v-btn small color="green" dark @click="leido(item)">Leido</v-btn>
        <v-btn small color="blue" dark @click="lista(item)">Lista</v-btn>
        <v-btn small color="red" dark @click="favorito(item)">Fav</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
//FALTARIA AÑADIR FUNCION PRE RENDER (EN PLANTILLA TAL VEZ)
import Vue from "vue";
import LibroControl from "../controllers/libroControl";
import UsuarioControl from "../controllers/usuarioControl";
import Botones from "../components/Botones";
//import axios from 'axios'
export default {
  components: {
    Botones
  },
  data() {
    return {
      alert1: false,
      alert2: false,
      //userName: Vue.prototype.$usuario.nombreUsuario,
      //userID: Vue.prototype.$usuario.idUsuario,
      headers: [
        {
          text: "Titulo",
          value: "titulo"
        },
        {
          text: "Autor",
          value: "autor"
        },
        {
          text: "Género",
          value: "genero"
        },
        {
          text: "Idioma",
          value: "idioma"
        },
        {
          text: "link de descaga",
          value: "linkDescarga"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      libros: []
    };
  },
  mounted: async function() {
    if (!Vue.prototype.$usuario) {
      console.log("hay que iniciar sesión");
      this.$router.push("/login");
    } else {
      console.log("Pidiendo todos los libros a la base de datos");
      //this.libros=LibroControl.getAll();

      LibroControl.getAll()
        .then(res => {
          this.libros = res.data;
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },

  methods: {
    leido(item) {
      console.log("Añadiendo libro de la lista de favoritos");
      console.log(item.idLibro);
      UsuarioControl.addLeido( Vue.prototype.$usuario.idUsuario, item.idLibro)
        .then(res => {
          console.log("Libro añadido de la lista con exito");
          console.log(res.message);

          this.showAlert(1);
        })
        .catch(err => {
          this.showAlert(-1);
          console.log(err.message);
        });
    },
    favorito(item) {
      console.log("Añadiendo libro de la lista de favoritos");
      console.log(item.idLibro);
      UsuarioControl.addFavorito(Vue.prototype.$usuario.idUsuario, item.idLibro)
        .then(res => {
          console.log("Libro añadido de la lista con exito");
          console.log(res.message);
          this.showAlert(1);
        })
        .catch(err => {
          this.showAlert(-1);
          console.log(err.message);
        });
    },
    lista(item) {
      console.log("Añadiendo libro de la lista de favoritos");
      UsuarioControl.addLista(
        Vue.prototype.$usuario.idUsuario,
        item.idLibro /*Vue.prototype.$usuario.idUsuario*/
      )
        .then(res => {
          console.log("Libro Añadido de la lista con exito");
          console.log(res.message);
          console.log(res.data);
          console.log(res);
          this.showAlert(1);
        })
        .catch(err => {
          this.showAlert(-1);
          console.log(err.message);
        });
    },
    showAlert(i) {
      if (i == 1) {
        //Success
        this.alert1 = true;
        setTimeout(() => (this.alert1 = false), 2000);
      } else if (i == -1) {
        //Fail
        this.alert2 = true;
        setTimeout(() => (this.alert2 = false), 2000);
      }
    }
  }
};
</script>

<style scoped>
.center {
  background-color: bisque;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inside {
  background-color: aquamarine;
  width: 300px;
}
.fondo {
  background: lightcoral;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>