<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-form v-model="isValid">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Cadastro</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                        label="Nome"
                        name="name"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="name"
                        :rules="[rules.required, rules.greaterThan(6)]"
                        :disabled="creating"
                />
                <v-text-field
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
                        type="email"
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        :disabled="creating"
                />
                <v-text-field
                        id="password"
                        label="Senha"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        :rules="[rules.required, rules.password]"
                        :disabled="creating"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text to="/auth/login" :disabled="creating">Login</v-btn>
                <v-spacer/>
                <v-btn
                        outlined
                        type="submit"
                        color="primary"
                        @click="register"
                        :disabled="creating || !isValid"

                >
                  Cadastrar
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

  import {email, greaterThan, password, required} from "../../../utils/rules"

  const REF = '/users'

  export default {
    name: "Register",
    data: () => ({
      isValid: '',
      creating: false,
      name: '',
      email: '',
      password: '',
      rules: {
        required,
        password,
        email,
        greaterThan
      }
    }),
    methods: {
      register() {
        this.creating = true
        this.$auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(({user}) => {
            return this.$database.ref(`${REF}/${user.uid}`).set({
              name: this.name,
              isAdmin: false,
            })
          })
          .then(() => {
            this.name = ''
            this.email = ''
            this.password = ''
            this.$router.replace('/auth/login')
          })
          .catch(err => console.log(err))
          .finally(() => this.creating = false)
      }
    }
  }
</script>
