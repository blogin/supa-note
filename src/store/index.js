import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import modal from './modules/modal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    modal
  }
})
