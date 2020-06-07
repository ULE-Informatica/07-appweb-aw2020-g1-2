<template>
  <div>
    <div class="center">
      <Botones></Botones>
    </div>
    <v-data-table :headers="headers" :items="libros" class="elevation-1">
      <img alt="Vue logo" src="../assets/LogoV1.png" />

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Mi lista de libros</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.comentario="{ item }">
        <v-edit-dialog
          :return-value.sync="item.comentario"
          lazy
          @save="save(item)"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ item.comentario }}
          <template v-slot:input>
            <v-text-field
              v-model="item.comentario"
              label="Escribe un comentario..."
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="red" dark @click="deleteItem(item)">
          Eliminar
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import usuarioControl from "../controllers/usuarioControl";
import listaControl from "../controllers/listaControl";
import Botones from "../components/Botones";
import Vue from "vue";
export default {
  components: {
    Botones
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Titulo",
        align: "start",
        value: "libro.titulo"
      },
      { text: "Autor", value: "libro.autor" },
      { text: "Género", value: "libro.genero" },
      { text: "Idioma", value: "libro.idioma" },
      { text: "Comentario", value: "comentario" },
      { text: "Fecha", value: "fecha" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    libros: [],
    editedIndex: -1,
    editedItem: {
      Titulo: "",
      Autor: "",
      Género: "",
      Idioma: "",
      Comentario: "",
      Fecha: ""
    },
    defaultItem: {
      Titulo: "",
      Autor: "",
      Género: "",
      Idioma: "",
      Comentario: "",
      Fecha: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  mounted: async function() {
    if (!Vue.prototype.$usuario) {
      console.log("hay que iniciar sesión");
      this.$router.push("/login");
    } else {
      console.log("Pidiendo todos los libros a la base de datos");
      //this.libros=LibroControl.getAll();

      usuarioControl
        .getLista(Vue.prototype.$usuario.idUsuario)
        .then(res => {
          this.libros = res.data;
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    deleteItem(item) {
      console.log("Eliminando libro de la lista de favoritos");
      listaControl
        .remove(item.id)
        .then(res => {
          console.log("Libro eliminado de la lista con exito");
          console.log(res.message);
          const index = this.libros.indexOf(item);
          this.libros.splice(index.id, 1);
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    save(item) {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
      listaControl
        .edit(item)
        .then(res => {
          console.log("Comentario actualizado correctamente");
          console.log(res);
        })
        .catch(err => {
          console.log("Error al actualizar el comentario " + err.message);
        });
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
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
</style>