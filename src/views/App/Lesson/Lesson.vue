<template>
  <Crud ref-d-b="/lessons" title="Atividades" :headers="headers" v-model="value" :is-valid="isValid">
    <v-form v-model="isValid" style="width: 100%;">
      <v-col cols="12">
        <v-text-field
                min="0"
                max="100"
                type="number"
                label="Nota final"
                v-model="value.notaFinal"
                :rules="[rules.required]"
        />
      </v-col>
      <v-col cols="12">
        <v-select label="Módulo" v-model="value.modulo" :items="modules" :rules="[rules.required]"/>
      </v-col>
      <v-col cols="12">
        <v-select multiple label="Perguntas" v-model="value.perguntas" :items="questions" :rules="[rules.required]"/>
      </v-col>
    </v-form>
  </Crud>
</template>

<script>

  import { required, greaterThan } from "../../../utils/rules"
  import Crud from "../../../components/Crud/Crud"

  export default {
    name: "Lessons",
    watch: {
      value(current){
        if(!Array.isArray(current.perguntas)) {
          this.value.perguntas = Object.values(current.perguntas)
        }
      }
    },
    data: () => ({
      isValid: false,
      questions: [],
      modules: [],
      headers: [
        {text: 'Nota final', value: 'notaFinal'},
        {text: 'Módulo', value: 'modulo'},
        {text: 'Ações', value: 'action', sortable: false}
      ],
      value: {
        id: null,
        notaFinal: 0,
        perguntas: [],
        modulo: '',
      },
      rules: {
        required,
        greaterThan,
      },
    }),
    components: {
      Crud,
    },
    created() {
      this.$database.ref('/modules').once('value', snapshot => {
        this.modules = Object.values(snapshot.val()).map(({nome}) => nome)
      })
      this.$database.ref('/questions').once('value', snapshot => {
        this.questions = Object.values(snapshot.val()).map(({pergunta}) => pergunta)
      })
    }
  }
</script>
