import firebase from "firebase";
import { Message } from 'element-ui';
import router from '../../router/index'

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
      console.log(state.userId)
    }
  },
  actions: {
    async logInCheck ({commit}, payload) {      
      const user =  await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.pass)
        .then(() => {
          Message(({
            dangerouslyUseHTMLString: true,
            message: '<span style="font-size:17px;">Login success</span>',
            type: 'success',
            showClose: true,
            duration: 2000
          }))
          commit("setUserId",firebase.auth().currentUser.uid)
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
        });
      }

    
  }
}