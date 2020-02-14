<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="Email" name="email" prepend-icon="mdi-email" type="email" v-model="email"/>
                <v-text-field id="password" label="Senha" name="password" prepend-icon="mdi-lock" type="password" v-model="password"/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text to="/auth/register">Cadastrar</v-btn>
              <v-spacer />
              <v-btn
                color="primary"
                outlined
                @click="login"
                :disabled='!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email) || password.length < 8'
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: "Login",
    data: () => ({
      email: '',
      password: '',
    }),
    methods: {
      login(){
        this.$auth.signInWithEmailAndPassword(this.email, this.password)
          .then(response => {
            this.$router.replace('/')
          })
          .catch(err => console.log(err))
      }
    },
  }
</script>
