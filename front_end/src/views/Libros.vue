<template>
  <div>
    <div class="center">
      <Botones></Botones>
    </div>
    <v-data-table :headers="headers" :items="libros" sort-by="Titulo" class="elevation-1">
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
          <v-btn small color="green" dark @click="leido(item)"> Leido </v-btn>
          <v-btn small color="blue" dark @click="lista(item)"> Lista </v-btn>
          <v-btn small color="red" dark @click="favorito(item)"> Fav </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
//FALTARIA AÑADIR FUNCION PRE RENDER (EN PLANTILLA TAL VEZ)
//import Vue from "vue"
import LibroControl from "../controllers/libroControl"
import UsuarioControl from "../controllers/usuarioControl"
import Botones from "../components/Botones"
//import axios from 'axios'
export default {
    components: {
      Botones
    },
    data () {
        return {
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
        }
    },
    mounted: async function () {
        console.log("Pidiendo todos los libros a la base de datos")
        //this.libros=LibroControl.getAll();
        
        LibroControl.getAll()
        .then( res => {
            this.libros = res.data;
        }).catch( err => {
          console.log(err.message)
        })
    },
    methods: {
    leido(item) {
      console.log("Añadiendo libro de la lista de favoritos");
      console.log(item.idLibro)
      UsuarioControl
        .addLeido(1, item.idLibro)
        .then(res => {
          console.log("Libro añadido de la lista con exito");
          console.log(res.message);         
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    favorito(item) {
      console.log("Añadiendo libro de la lista de favoritos");
      console.log(item.idLibro)
      UsuarioControl
        .addFavorito(1, item.idLibro)
        .then(res => {
          console.log("Libro añadido de la lista con exito");
          console.log(res.message);     
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    lista(item) {
      console.log("Añadiendo libro de la lista de favoritos");
      UsuarioControl
        .addLista(1, item.idLibro, /*Vue.prototype.$usuario.idUsuario*/)
        .then(res => {
          console.log("Libro Añadido de la lista con exito");
          console.log(res.message);       
        })
        .catch(err => {
          console.log(err.message);
        });
    }

  }
}
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

</style>