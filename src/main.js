import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/checkbox.css'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAX1eV5fGGu3E2-w-nriJuU4DSv9_Q0F8",
  authDomain: "supa-note.firebaseapp.com",
  databaseURL: "https://supa-note-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "supa-note",
  storageBucket: "supa-note.appspot.com",
  messagingSenderId: "171043286224",
  appId: "1:171043286224:web:63db895503c2466e2d82d5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
