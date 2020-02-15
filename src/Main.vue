<template>
  <v-app>
    <v-scroll-y-reverse-transition mode="out-in" v-if="canRender">
      <router-view/>
    </v-scroll-y-reverse-transition>
    <v-content v-else class="fill-height">
      <v-row class="d-flex justify-center align-center ma-0 fill-height">
        <v-col cols="12" sm="12" md="10" lg="8">
          <v-container class="fill-height d-flex justify-center align-center pa-2 py-10" fluid>
            <v-progress-circular
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
            />
          </v-container>
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'Main',
    data: () => ({
      canRender: false,
    }),
    watch: {
      $route: {
        immediate: true,
        handler(current){
          const isNotAuthRoute = current.matched.some(({meta: {requiresAuth}}) => !!requiresAuth)
          const isNotAuthenticated = !this.$auth.currentUser

          if(isNotAuthRoute && isNotAuthenticated){
            this.$router.replace('/auth/login')
          }

        }
      }
    },
    created() {
      this.$auth.onAuthStateChanged(authUser => {

        if(!authUser) {
          this.canRender = true
          return this.$router.replace('/auth/login')
        }

        this.$database.ref(`/users/${authUser.uid}`).once('value', snapshot => {
          this.$store.commit('setAuthUser', authUser)
          this.$store.commit('setUser', snapshot)
          this.canRender = true

          return this.$router.replace('/')
        })
      })
    }
  }
</script>
