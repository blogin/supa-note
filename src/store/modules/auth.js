import firebase from "firebase";

export default {
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    async logInCheck ({commit}, payload) {      
      const user =  await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.pass)
        .then(() => {
          alert('Successfully logged in');
          // this.$router.push('/home');
        })
        .catch(error => {
          alert(error.message);
        });
      }

    
  }
}