<template>
    
  <div class="libros">
    <img alt="Vue logo" src="../assets/LogoV1.png" />  
    <botones> </botones>
    <div>
      <h1> Mi lista de libros favoritos </h1>
    </div>
    <div> 
        <v-data-table
            :headers="headers"
            :items="libros"
            :items-per-page="10"
            class="elevation-1"
        >

    </v-data-table>
    </div>
    <div>
      <v-simple-table>   
        <thead>
          <tr>
            <th class="text-left">Titulo</th>
            <th class="text-left">Autor</th>
            <th class="text-left">Genero</th>
            <th class="text-left">Idioma</th>
            <th class="text-left">Comentario</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in libros" :key="item.id">
            <td>{{ item.libros[0].titulo }}</td>
            <td>{{ item.libros[0].autor }}</td>
            <td>{{ item.libros[0].genero }}</td>
            <td>{{ item.libros[0].idioma }}</td>
            <td>{{ item.comentario }}</td>
            <td>

              <v-btn color="red" dark                
                @click="deleteItem(props.item)">Eliminar
              </v-btn>

            </td>
          </tr>
        </tbody>

      </v-simple-table>
    </div>

  </div>
</template>

<script>
//FALTARIA AÑADIR FUNCION PRE RENDER (EN PLANTILLA TAL VEZ)
//import Vue from "vue"
import usuarioControl from "../controllers/usuarioControl"
import listaControl from "../controllers/listaControl"
import botones from "../components/Botones"
//import axios from 'axios'
export default {
    components: {
      botones
    },
    data () {
        return {
            //userName: Vue.prototype.$usuario.nombreUsuario,
            //userID: Vue.prototype.$usuario.idUsuario,
            headers: [
                {
                    text: "Titulo",
                    value: "libros[0].titulo"
                },
                {
                    text: "Autor",
                    //value: "libros[0].autor"                    
                },
                {
                    text: "Género",
                    value: "libros[0].genero"
                },
                {
                    text: "Idioma",
                    value: "libros[0].idioma"
                },
                {
                    text: "Comentario",
                    value: "comentario"
                },
                 { text: 'Actions', value: 'name', sortable: false }

            ],
            libros: []
        }
    },
    mounted: async function () {
        console.log("Pidiendo todos los libros a la base de datos")
        //this.libros=LibroControl.getAll();
        
        usuarioControl.getFavoritos(1)
        .then( res => {
            this.libros = res.data;
        }).catch( err => {
          console.log(err.message)
        })
    },
    methods: {

      deleteItem (item) {
        listaControl.deleteItem(item.id)
        .then( res => {
          console.log('Libro eliminado de la lista con exito')
        }).catch( err=> {
          console.log(err.message)
        })
      },

  
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