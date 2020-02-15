<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-img :src="logo" contain/>
      </v-list-item>

      <v-list-item color="primary" v-for="item in items" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block outlined color="primary" @click="logout">Sair</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>

  import logo from '../../assets/logo.png'

  export default {
    name: "Menu",
    data: () => ({
      logo,
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'Professores', icon: 'mdi-account-tie', to: '/professor' },
        { title: 'Alunos', icon: 'mdi-account', to: '/student' },
        { title: 'Disciplinas', icon: 'mdi-pencil-ruler', to: '/subject' },
        { title: 'Modulos', icon: 'mdi-semantic-web', to: '/module' },
        { title: 'Atividades', icon: 'mdi-book', to: '/lessons' },
        { title: 'Perguntas', icon: 'mdi-help-circle', to: '/questions' },
      ],
    }),
    methods: {
      logout(){
        this.$auth.signOut()
          .then(response => {
            this.$router.replace('/auth/login')
          })
      }
    },
  }
</script>
