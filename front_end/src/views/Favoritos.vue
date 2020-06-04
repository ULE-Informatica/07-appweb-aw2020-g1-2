<template>
    
  <div class="libros">
    <img alt="Vue logo" src="../assets/LogoV1.png" />  
    <botones> </botones>
    <div>
      <h1> Mi lista de libros favoritos </h1>
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
            <td>{{ item.libro.titulo }}</td>
            <td>{{ item.libro.autor }}</td>
            <td>{{ item.libro.genero }}</td>
            <td>{{ item.libro.idioma }}</td>
            <td>{{ item.comentario }}</td>
            <td>

              <v-btn color="red" dark                
                @click="deleteItem(item)">Eliminar
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
import listaControl from "../controllers/favoritoControl"
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
                    value: "libro.titulo"
                },
                {
                    text: "Autor",
                    value: "libro.autor"                    
                },
                {
                    text: "Género",
                    value: "libro.genero"
                },
                {
                    text: "Idioma",
                    value: "libro.idioma"
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
        console.log('Eliminando libro de la lista de favoritos')
        listaControl.remove(item.id)
        .then( res => {
          console.log('Libro eliminado de la lista con exito')
          console.log(res.message) 
          const index = this.libros.indexOf(item)
          this.libros.splice(index.id, 1)
        }).catch( err=> {
          console.log(err.message)
        })
        
      },
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