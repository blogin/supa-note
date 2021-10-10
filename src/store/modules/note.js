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
    listOfNotes: [], 
    initCopyListOfNotes: [], 
    btnLoading: false, 
    btnLoadingReg: false, 
    showNavBar: false
  },
  getters: {
    predefineColors(state) {
      return state.predefineColors
    },
    listOfNotes(state) {
      return state.listOfNotes
    },
    initCopyListOfNotes(state) {
      return state.initCopyListOfNotes
    },
    btnLoading(state) {
      return state.btnLoading
    },
    btnLoadingReg(state) {
      return state.btnLoadingReg
    },
    showNavBar(state) {
      return state.showNavBar
    },
  },
  mutations:{
    setListOfNotes(state,payload){
      state.listOfNotes = payload
      state.initCopyListOfNotes = payload
    },
    setInitListOfNotes(state,payload){
      state.initCopyListOfNotes = payload
    },
    setBtnLoading(state,payload){
      state.btnLoading = payload
    },
    setBtnLoadingReg(state,payload){
      state.btnLoadingReg = payload
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
          resp.data ? commit("setListOfNotes", resp.data) : null;
          resp.data ? commit("setInitListOfNotes", resp.data) : null;
          commit("setBtnLoading", false)
          commit("setBtnLoadingReg", false)
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
    },
    async putListOfNotes ({commit}, payload){
      debugger
      await Axios.put(`${payload.user}.json`,payload.list)
        .then(resp => {
          
          Message(({
            dangerouslyUseHTMLString: true,
            message: `<span style="font-size:17px;">Заметка успешно добавлена</span>`,
            type: 'success',
            showClose: true,
            duration: 2000
          }))
          console.log(resp.data)
        })
        .catch(error => {
          Message(({
            dangerouslyUseHTMLString: true,
            message: `<span style="font-size:17px;">${error.message}</span>`,
            type: 'error',
            showClose: true,
            duration: 4000
          }))
        })
    }
  }
}