import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Archive from '../views/Archive.vue'
import firebase from 'firebase';
import {
  Message
} from 'element-ui';

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      authReq: true
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/archive',
    name: 'Archive',
    meta: {
      authReq: true
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  debugger
  if (to.matched.some(record => record.meta.authReq)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      Message(({
        dangerouslyUseHTMLString: true,
        message: `<span style="font-size:17px;">Чтобы попасть на страницу вы должны быть авторизованы</span>`,
        type: 'error',
        showClose: true,
        duration: 4000
      }))
      next({
        path: '/',
      });
    }
  } else {
    next();
  }
});

export default router