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
    btnLoading: false, 
    btnLoadingReg: false, 
    showNavBar: false,
    colorFilter: null,
    searchFilter: '',
  },
  getters: {
    predefineColors(state) {
      return state.predefineColors
    },
    colorFilter(state) {
      return state.colorFilter
    },
    searchFilter(state) {
      return state.searchFilter
    },
    listOfNotes(state) {
      return state.listOfNotes
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
    },
    setColorFilter(state,payload){
      state.colorFilter = payload
    },
    setSearchFilter(state,payload){
      state.searchFilter = payload
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
          if(payload.core == 'add'){
            Message(({
              dangerouslyUseHTMLString: true,
              message: `<span style="font-size:17px;">Заметка успешно добавлена</span>`,
              type: 'success',
              showClose: true,
              duration: 1000
            }))
          }
          if(payload.core == 'add-arch'){
            Message(({
              dangerouslyUseHTMLString: true,
              message: `<span style="font-size:17px;">Заметка успешно добавлена в Архив</span>`,
              type: 'success',
              showClose: true,
              duration: 1000
            }))
          }
          if(payload.core == 'del'){
            Message(({
              dangerouslyUseHTMLString: true,
              message: `<span style="font-size:17px;">Заметка успешно удалена</span>`,
              type: 'success',
              showClose: true,
              duration: 1000
            }))
          }
          if(payload.core == 'save'){
            Message(({
              dangerouslyUseHTMLString: true,
              message: `<span style="font-size:17px;">Заметка успешно сохранена</span>`,
              type: 'success',
              showClose: true,
              duration: 1000
            }))
          }
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