<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Cadastro</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="Nome" name="name" prepend-icon="mdi-account" type="text" v-model="name"/>
                <v-text-field label="Email" name="email" prepend-icon="mdi-email" type="email" v-model="email"/>
                <v-text-field id="password" label="Senha" name="password" prepend-icon="mdi-lock" type="password"
                              v-model="password"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text to="/auth/login">Login</v-btn>
              <v-spacer/>
              <v-btn
                      outlined
                      color="primary"
                      @click="register"
                      :disabled='!name || !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) || password.length < 8'
              >
                Cadastrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: "Register",
    data: () => ({
      name: '',
      email: '',
      password: ''
    }),
    methods: {
      register() {
        this.$auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(result => result.user.updateProfile({
            displayName: this.name
          }))
          .then(data => {
            this.name = ''
            this.email = ''
            this.password = ''
            this.$router.replace('/auth/login')
          })
          .catch(err => console.log(err))
      }
    },
    created() {
      console.log(this)
    }
  }
</script>
