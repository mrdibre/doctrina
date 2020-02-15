<template>
  <Crud ref-d-b="/subjects" title="Disciplinas" :headers="headers" v-model="value" :is-valid="isValid">
    <v-form v-model="isValid" style="width: 100%;">
      <v-col cols="12">
        <v-text-field
                label="Nome"
                v-model="value.nome"
                :rules="[rules.required, rules.greaterThan(3)]"
        />
      </v-col>
      <v-col cols="12">
        <v-select
                type="email"
                label="Professor"
                :items="professors"
                v-model="value.professor"
        />
      </v-col>
      <v-col cols="12">
        <v-select
                label="Modulo"
                :items="modules"
                v-model="value.modulo"
        />
      </v-col>
    </v-form>
  </Crud>
</template>

<script>

  import { required, greaterThan, email } from "../../../utils/rules"
  import Crud from "../../../components/Crud/Crud"

  export default {
    name: "Subject",
    data: () => ({
      isValid: false,
      professors: [],
      modules: [],
      headers: [
        {text: 'Nome', value: 'nome'},
        {text: 'Módulo', value: 'modulo'},
        {text: 'Professor', value: 'professor.nome'},
        {text: 'Ações', value: 'action'}
      ],
      value: {
        id: null,
        nome: '',
        modulo: '',
        professor: '',
      },
      rules: {
        email,
        required,
        greaterThan,
      },
    }),
    components: {
      Crud,
    },
    created() {
      this.$database.ref('/professors').once('value').then(snapshot => {
        this.professors = Object.values(snapshot.val()).map(({nome}) => nome)
      })
      this.$database.ref('/modules').once('value').then(snapshot => {
        this.modules = Object.values(snapshot.val()).map(({nome}) => nome)
      })
    }
  }
</script>
