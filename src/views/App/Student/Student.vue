<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table :headers="headers" :items="students" class="elevation-1" style="width: 80%;">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Alunos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on" outlined>Novo aluno</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nome"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.password" label="Senha"/>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.institute" label="Instituição"/>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="close">Cancelar</v-btn>
              <v-btn color="primary" outlined @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <p class="title mt-2 mb-2">Nenhum aluno disponível</p>
    </template>
    <template v-slot:no-content>
      <p class="title mt-2 mb-2">Nenhum aluno disponível</p>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "Student",
    data: () => ({
      dialog: false,
      headers: [
        {text: 'Nome', value: 'name'},
        {text: 'Email', value: 'email'},
        {text: 'Instituição', value: 'institute'},
        {text: 'Ações', value: 'action', sortable: false}
      ],
      students: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        password: '',
        institute: '',
      },
      defaultItem: {
        name: '',
        email: '',
        password: '',
        institute: '',
      }
    }),
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Novo Aluno' : 'Editar Aluno'
      }
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    methods: {
      initialize() {
        this.students = [
          {
            name: 'Danielli',
            email: 'dani@iftm.com',
            password: '123',
            institute: 'IFTM',
          },
          {
            name: 'Maria',
            email: 'dani@ufu.com',
            password: '123',
            institute: 'UFU',
          },
          {
            name: 'Carlos',
            email: 'carlos@ufu.com',
            password: '123',
            institute: 'UFU',
          },
          {
            name: 'Guilherme',
            email: 'guilherme@iftm.com',
            password: '123',
            institute: 'IFTM',
          },
          {
            name: 'João',
            email: 'joao@ufu.com',
            password: '123',
            institute: 'UFU',
          }
        ]
      },

      editItem(item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.students.indexOf(item)
        confirm('Deseja mesmo remover esse professor?') && this.students.splice(index, 1)
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.students[this.editedIndex], this.editedItem)
        } else {
          this.students.push(this.editedItem)
        }
        this.close()
      }
    },
    created() {
      this.initialize()
    }
  }
</script>
