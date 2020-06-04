<template>
    
  <div class="libros">
    <img alt="Vue logo" src="../assets/logo.png" />  
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
        <template v-slot:no-data>
            <v-alert :value="true" color="error" icon="warning">
                No tienes ningun libro en tu lista
            </v-alert>
        </template>
    </v-data-table>
    </div>
    
  </div>
</template>

<script>
//FALTARIA AÑADIR FUNCION PRE RENDER (EN PLANTILLA TAL VEZ)
import usuarioControl from "../controllers/usuarioControl"
//import botones from "../components/Botones"
export default {
  /*
    components: {
      botones
    },
    */
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
                    value: "libros[0].autor"                    
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
                {
                    text: "Fecha",
                    value: "fecha"
                },

            ],
            libros: []
        }
    },
    mounted: async function () {
        console.log("Pidiendo todos los libros a la base de datos")
        usuarioControl.getLista(1)
        .then( res => {
            this.libros = res.data;
        }).catch( err => {
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