<template>
  <div>
    <div class="center">
      <Botones></Botones>
    </div>
    <v-data-table :headers="headers" :items="libros" sort-by="Titulo" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Libros leídos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- boton crear nuevo libro 
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo libro</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.titulo" label="Titulo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.autor" label="Autor"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.genero" label="Genero"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.idioma" label="Idioma"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.comentario" label="Comentario"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fecha" label="Fecha"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nota" label="Nota"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

          -->
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
import listaControl from "../controllers/leidoControl";
import Botones from "../components/Botones"
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
        sortable: false,
        value: "libro.titulo"
      },
      { text: "Autor", value: "libro.autor" },
      { text: "Género", value: "libro.genero" },
      { text: "Idioma", value: "libro.idioma" },
      { text: "Comentario", value: "comentario" },
      { text: "Fecha", value: "fecha" },
      { text: "Nota", value: "nota" },
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
      Fecha: "",
      Nota: ""
    },
    defaultItem: {
      Titulo: "",
      Autor: "",
      Género: "",
      Idioma: "",
      Comentario: "",
      Fecha: "",
      Nota: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  mounted: async function() {
    console.log("Pidiendo todos los libros a la base de datos");
    //this.libros=LibroControl.getAll();

    usuarioControl
      .getLeidos(1)
      .then(res => {
        this.libros = res.data;
      })
      .catch(err => {
        console.log(err.message);
      });
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