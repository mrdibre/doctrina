import Vue from 'vue'
import App from './Main.vue'

import router from './router'
import './registerServiceWorker'
import firebase from './lib/firebase'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.prototype.$database = firebase.database()
Vue.prototype.$auth = firebase.auth()

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
