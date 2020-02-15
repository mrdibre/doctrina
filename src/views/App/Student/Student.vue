<template>
  <Crud ref-d-b="/students" title="Alunos" :headers="headers" v-model="value" :is-valid="isValid">
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
                label="Instituição"
                v-model="value.instituicao"
                :rules="[rules.required, rules.greaterThan(3)]"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
                label="Forma aprendizagem"
                v-model="value.formaAprendizagem"
                :rules="[rules.required, rules.greaterThan(5)]"
        />
      </v-col>
    </v-form>
  </Crud>
</template>

<script>

  import { required, greaterThan, email } from "../../../utils/rules"
  import Crud from "../../../components/Crud/Crud"

  export default {
    name: "Student",
    data: () => ({
      isValid: false,
      headers: [
        {text: 'Nome', value: 'nome'},
        {text: 'Email', value: 'email'},
        {text: 'Instituição', value: 'instituicao'},
        {text: 'Ações', value: 'action'}
      ],
      value: {
        id: null,
        nome: '',
        email: '',
        instituicao: '',
        formaAprendizagem: '',
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
  }
</script>
