import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/profile')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "Form" */ '../views/form/index.vue')
  },
  {
    path: '/count',
    name: 'Count',
    component: () => import(/* webpackChunkName: "Count" */ '../views/count/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
