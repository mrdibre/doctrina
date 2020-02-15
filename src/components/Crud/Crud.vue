<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table :headers="headers" :items="items" class="elevation-1" style="width: 100%;">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="60vh">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on" outlined>Adicionar</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <slot/>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="close">Cancelar</v-btn>
              <v-btn color="primary" outlined @click="save" :disabled="!isValid">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>

  export default {
    name: "Crud",
    props: {
      isValid: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      refDB: {
        type: String,
        required: true,
      },
      headers: {
        type: Array,
        required: true,
      },
      value: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      dialog: false,
      items: [],
      editedIndex: -1,
      defaultValue: {}
    }),
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Adicionar' : 'Editar'
      },
      VModel: {
        get(){
          return this.value
        },
        set(val){
          return this.$emit('input', val)
        }
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    methods: {
      initialize() {
        this.items = []
      },

      editItem(item) {
        this.editedIndex = this.items.indexOf(item)
        this.VModel = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem({id}) {
        return confirm(`Deseja mesmo remover esse item?`) && (
          this
            .$database
            .ref(`${this.refDB}/${id}`)
            .remove(removed => console.log(removed))
        )
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.VModel = Object.assign({}, this.defaultValue)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          this
            .$database
            .ref(`${this.refDB}/${this.VModel.id}`)
            .update(this.VModel)
        } else {
          this
            .$database
            .ref(this.refDB)
            .push(this.VModel)
            .then(() => this.VModel = this.defaultValue)
        }
        this.close()
      }
    },
    created() {
      this.initialize()

      this.defaultValue = Object.freeze(Object.assign({}, this.value))

      this
        .$database
        .ref(this.refDB)
        .on('value', snapshot => {
          try{
            this.items = Object.keys(snapshot.toJSON()).map((id) => ({...snapshot.toJSON()[id], id}))
          }catch (e) {
            this.items = []
          }
        })

    },
    beforeDestroy() {
      this.$database.ref(this.refDB).off('value')
    }
  }
</script>
