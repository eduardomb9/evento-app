import Vue from 'vue'
import Router from 'vue-router'

import Home from '../view/Home'
import Participantes from '../view/Participantes'
import Login from '../view/Login'
import Promises from '../view/Promises'

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
        name: 'promiseTest',
        path: '/promises',
        component: Promises
    },
    {
        name: 'home',
        path: '/home',
        component: Home
    }
]

const router = new Router({ routes })

export default router
