<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-form v-model="isValid">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
                        type="email"
                        v-model="email"
                        :disabled="logging"
                        :rules="[rules.required, rules.email]"
                />
                <v-text-field
                        id="password"
                        label="Senha"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        :disabled="logging"
                        :rules="[rules.required, rules.password]"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                        text
                        color="primary"
                        to="/auth/register"
                        :disabled="logging"
                >
                  Cadastrar
                </v-btn>
                <v-spacer/>
                <v-btn
                        type="submit"
                        color="primary"
                        outlined
                        @click="login"
                        :disabled='!isValid || logging'
                        :loading="logging"
                >
                  Login
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

  import { required, email, password } from "../../../utils/rules"

  export default {
    name: "Login",
    data: () => ({
      isValid: false,
      logging: false,
      email: '',
      password: '',
      rules: {
        email,
        required,
        password,
      },
    }),
    methods: {
      login() {
        this.logging = true
        this.$auth.signInWithEmailAndPassword(this.email, this.password)
          .then(() => this.$router.replace('/'))
          .catch(err => console.log(err))
        .finally(() => this.logging = false)
      }
    }
  }
</script>
