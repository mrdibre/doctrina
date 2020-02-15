<template>
  <Crud ref-d-b="/professors" title="Professores" :headers="headers" v-model="value" :is-valid="isValid">
    <v-form v-model="isValid" style="width: 100%;">
      <v-col cols="12">
        <v-text-field
                label="Nome"
                v-model="value.nome"
                :rules="[rules.required, rules.greaterThan(3)]"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
                label="Email"
                type="email"
                v-model="value.email"
                :rules="[rules.required, rules.email]"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
                label="Senha"
                type="password"
                v-model="value.senha"
                :rules="[rules.required, rules.greaterThan(8)]"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
                label="Instituição"
                v-model="value.instituicao"
                :rules="[rules.required, rules.greaterThan(3)]"
        />
      </v-col>
    </v-form>
  </Crud>
</template>

<script>

  import { required, greaterThan, email } from "../../../utils/rules"
  import Crud from "../../../components/Crud/Crud"

  export default {
    name: "Professor",
    data: () => ({
      isValid: false,
      lessons: [],
      headers: [
        {text: 'Nome', value: 'nome'},
        {text: 'Email', value: 'email'},
        {text: 'Senha', value: 'senha'},
        {text: 'Instituição', value: 'instituicao'},
        {text: 'Ações', value: 'action'}
      ],
      value: {
        id: null,
        nome: '',
        email: '',
        senha: '',
        instituicao: '',
        disciplinas: [],
      },
      rules: {
        email,
        required,
        greaterThan,
      },
    }),
    watch: {
      value(current){
        if(!Array.isArray(current.disciplinas)) {
          this.value.disciplinas = Object.values(current.disciplinas)
        }
      }
    },
    components: {
      Crud,
    },
    created() {
      this.$database.ref('/professors').once('value').then(snapshot => {
        this.lessons = Object.values(snapshot.val()).map(({nome}) => nome)
      })
    }
  }
</script>
