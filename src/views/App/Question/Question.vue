<template>
  <Crud ref-d-b="/questions" title="Perguntas" :headers="headers" v-model="value" :is-valid="isValid">
    <v-form v-model="isValid" style="width: 100%;">
      <v-col cols="12">
        <v-text-field
                label="Pergunta"
                v-model="value.pergunta"
                :rules="[rules.required, rules.greaterThan(10)]"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
                label="Resposta A"
                v-model="value.respA"
                :rules="[rules.required, rules.greaterThan(1)]"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
                label="Resposta B"
                v-model="value.respB"
                :rules="[rules.required, rules.greaterThan(1)]"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
                label="Resposta C"
                v-model="value.respC"
                :rules="[rules.required, rules.greaterThan(1)]"
        />
      </v-col>
      <v-col cols="12" v-if="optionCorrectAnswer">
        <v-select
                label="Resposta correta"
                :items="optionCorrectAnswer"
                v-model="value.respCorreta"
                :rules="[rules.required, rules.greaterThan(1)]"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
                type="number"
                label="Resposta C"
                v-model="value.pontosPergunta"
                :rules="[rules.required]"
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
        {text: 'Pergunta', value: 'pergunta'},
        {text: 'Pontos', value: 'pontosPergunta'},
        {text: 'Resposta Correta', value: 'respCorreta'},
        {text: 'Ações', value: 'action', sortable: false}
      ],
      value: {
        id: null,
        pergunta: '',
        respA: '',
        respB: '',
        respC: '',
        respCorreta: '',
        pontosPergunta: 0,
      },
      rules: {
        required,
        greaterThan,
      },
    }),
    computed: {
      optionCorrectAnswer(){
        return this.value.respA.length && this.value.respB.length && this.value.respC.length && [this.value.respA, this.value.respB, this.value.respC]
      }
    },
    components: {
      Crud,
    },
  }
</script>
