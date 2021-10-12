import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Archive from '../views/Archive.vue'
import Edit from '../views/EditNote.vue'
import NotFound from '../views/NotFound.vue'
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
      title: "Заметки",
      authReq: true
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: "Авторизация"
    }
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    meta: {
      title: "Архив",
      authReq: true
    }
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    props: true,
    meta: {
      title:"Редактирование",
      authReq: true
    }
  },
  { path: '*', name: 'notfound', component: NotFound, meta: {title: 'Страница не найдена'} }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  if (to.meta.authReq) {
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