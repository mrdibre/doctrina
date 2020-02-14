<template>
  <v-app>
    <v-scroll-y-reverse-transition mode="out-in">
      <router-view/>
    </v-scroll-y-reverse-transition>
  </v-app>
</template>

<script>
  export default {
    name: 'Main',
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
    }
  }
</script>
