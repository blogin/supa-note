import firebase from "firebase";
import { Message } from 'element-ui';
import './note'

export default {
  state: {
    userId: null,
  },
  getters: {
    userId (state){
      return state.userId
    }
  },
  mutations: {
    setUserId(state, payload){
      state.userId = payload
    }
  },
  actions: {
    async logInCheck ({commit}, payload) {      
      await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.pass)
        .then(() => {
          Message(({
            dangerouslyUseHTMLString: true,
            message: '<span style="font-size:17px;">Вы успешно вошли</span>',
            type: 'success',
            showClose: true,
            duration: 2000
          }))
          commit("setUserId",firebase.auth().currentUser.uid)

          
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
        });
      },
      async RegisterUser ({commit}, payload) {    
        debugger  
        await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.pass)
        .then(() => {
            Message(({
              dangerouslyUseHTMLString: true,
              message: '<span style="font-size:17px;">Вы успешно зарегистрировались</span>',
              type: 'success',
              showClose: true,
              duration: 2000
            }))
            commit("setUserId",firebase.auth().currentUser.uid)
        })
          .catch(error => {
            Message(({
              dangerouslyUseHTMLString: true,
              message: `<span style="font-size:17px;">${error.message}</span>`,
              type: 'error',
              showClose: true,
              duration: 4000
            }))
            commit("setBtnLoadingReg", false)
          });
        }

    
  }
}