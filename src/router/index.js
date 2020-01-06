import Vue from 'vue'
import Router from 'vue-router'

import Home from '../view/Home'
import Participantes from '../view/Participantes'
import Login from '../view/Login'

Vue.use(Router)

const routes = [
  {
    name: 'login',
    path: '*',
    component: Login
  },
  {
    name: 'participantes',
    path: '/participantes',
    component: Participantes
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  }
]

const router = new Router({ routes })

export default router
