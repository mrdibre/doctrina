import Vue from 'vue'
import App from './Main.vue'

import store from './store'
import router from './router'
import './registerServiceWorker'
import firebase from './lib/firebase'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.prototype.$database = firebase.database()
Vue.prototype.$auth = firebase.auth()

Vue.mixin({
  computed: {
    $authUser(){
      return this.$store.state.authUser
    },
    $user(){
      return this.$store.state.user
    }
  },
})

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
