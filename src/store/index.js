import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    authUser: {},
  },
  mutations: {
    setAuthUser(state, user){
      state.authUser = user
    },
    setUser(state, user){
      state.user = user
    }
  }
})