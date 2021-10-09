import Axios from 'axios'
import { Message } from 'element-ui';
import router from '../../router/index'

Axios.defaults.baseURL = "https://supa-note-default-rtdb.europe-west1.firebasedatabase.app/";

export default {
  state: {
    predefineColors: [
      "#fff",
      "#F9EBEA",
      "#EBDEF0",
      "#A9CCE3",
      "#A3E4D7",
      "#F9E79F",
    ],
    listOfNotes: null, 
    btnLoading: false, 
    showNavBar: false
  },
  getters: {
    predefineColors(state) {
      return state.predefineColors
    },
    listOfNotes(state) {
      return state.listOfNotes
    },
    btnLoading(state) {
      return state.btnLoading
    },
    showNavBar(state) {
      return state.showNavBar
    },
  },
  mutations:{
    setListOfNotes(state,payload){
      state.listOfNotes = payload
    },
    setBtnLoading(state,payload){
      state.btnLoading = payload
    },
    setShowNavBar(state,payload){
      state.showNavBar = payload
    },
  },
  actions:{
    async getListOfNotes ({commit}, payload){
      await Axios.get(`${payload}.json`)
        .then(resp => {
          debugger
          commit("setListOfNotes", resp.data)
          commit("setBtnLoading", false)
          commit("setShowNavBar", true)
          router.push("/home")
        })
        .catch(error => {
          Message(({
            dangerouslyUseHTMLString: true,
            message: `<span style="font-size:17px;">${error.message}</span>`,
            type: 'error',
            showClose: true,
            duration: 4000
          }))
          commit("setBtnLoading", false)
        })
    }
  }
}