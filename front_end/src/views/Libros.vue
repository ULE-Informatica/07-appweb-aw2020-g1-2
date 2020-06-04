<template>
  <div class="libros">
    <img alt="Vue logo" src="../assets/LogoV1.png" />  
    <botones> </botones>
    <div>
      <h1> Libros </h1>
    </div>
    <div> 
        <v-data-table
            :headers="headers"
            :items="libros"
            :items-per-page="10"
            class="elevation-1"
        ></v-data-table>
    </div>
  </div>
</template>

<script>
//FALTARIA AÑADIR FUNCION PRE RENDER (EN PLANTILLA TAL VEZ)
//import Vue from "vue"
import LibroControl from "../controllers/libroControl"
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
        /*
       axios.get('http://localhost:3000/data/libros')
        .then(res => {
            console.log(res.data);
            this.libros=res.data;
        }).cath(err => {
            console.log('Error inesperado ' + err)
            //reject(new Error('Error inesperado '+ err.data))
        })
        */
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