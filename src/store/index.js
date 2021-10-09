import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import modal from './modules/modal'
import note from './modules/note'

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
    modal,
    note
  }
})
