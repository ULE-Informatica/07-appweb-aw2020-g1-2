<template>
  <v-data-table
    :headers="headers"
    :items="libros"
    sort-by="Titulo"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Libros leídos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
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
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import usuarioControl from "../controllers/usuarioControl"

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: "Titulo",
          align: 'start',
          sortable: false,
          value: "libros[0].titulo"
        },
        {text: "Autor"
        //value: "libros[0].autor"
        },
        { text: "Género", value: "libros[0].genero"},
        { text: "Idioma", value: "libros[0].idioma" },
        { text: "Comentario", value: "libros[0].comentario" },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      libros: [],
      editedIndex: -1,
      editedItem: {
        Titulo: '',
        Autor: '',
        Género: '',
        Idioma: '',
        Comentario: '',
      },
      defaultItem: {
        Titulo: '',
        Autor: '',
        Género: '',
        Idioma: '',
        Comentario: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    mounted: async function () {
        console.log("Pidiendo todos los libros a la base de datos")
        //this.libros=LibroControl.getAll();
        
        usuarioControl.getLeidos(1)
        .then( res => {
            this.libros = res.data;
        }).catch( err => {
          console.log(err.message)
        })
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>