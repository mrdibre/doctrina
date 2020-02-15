<template>
  <Crud ref-d-b="/modules" title="Módulos" :headers="headers" v-model="value" :is-valid="isValid">
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
                label="Link do vídeo"
                v-model="value.linkVideo"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
                counter
                auto-grow
                label="Descrição"
                v-model="value.descricao"
                :rules="[rules.required, rules.greaterThan(10)]"
        />
      </v-col>
    </v-form>
  </Crud>
</template>

<script>

  import { required, greaterThan } from "../../../utils/rules"
  import Crud from "../../../components/Crud/Crud"

  export default {
    name: "Question",
    data: () => ({
      isValid: false,
      headers: [
        {text: 'Nome', value: 'nome'},
        {text: 'Descrição', value: 'descricao'},
        {text: 'Link do vídeo', value: 'linkVideo'},
        {text: 'Ações', value: 'action', sortable: false}
      ],
      value: {
        id: null,
        nome: '',
        descricao: '',
        linkVideo: '',
      },
      rules: {
        required,
        greaterThan,
      },
    }),
    components: {
      Crud,
    },
  }
</script>
