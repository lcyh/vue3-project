/* eslint-disable @typescript-eslint/no-unused-vars */
import { configure, start, done } from 'nprogress'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getCookie } from '@/utils/auth'
import Redirect from '@/utils/redirect'
// import commonRouter from './common'
import store from '../store'

configure({
  showSpinner: false
})
const commonRouter = [
  {
    path: '/',
    name: 'Layout',
    meta: { requiresAuth: true },
    redirect: 'Home',
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: { showNavSide: false },
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      }
    ]
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   meta: { requiresAuth: true },
  //   component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '@/views/Profile'),
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "Form" */ '@/views/Form.vue'),
  },
  {
    path: '/count',
    name: 'Count',
    component: () => import(/* webpackChunkName: "Count" */ '@/views/Count.vue'),
  },
];
console.log('commonRouter', commonRouter);

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory
  routes: commonRouter as RouteRecordRaw[]
})

// // 全局路由前置守卫
// router.beforeEach((to, from, next) => {
//   start()
//   if (getCookie()) {
//     if (store.getters.userInfo) {
//       if (store.getters.hasAddRoute) {
//         next()
//       } else {
//         store.dispatch('setUserPermission').then((res) => {
//           // 动态添加路由规则
//           router.addRoute(res)
//           next({
//             path: to.path,
//             replace: true
//           })
//         })
//       }
//     } else {
//       store.dispatch('setUserInfo').then(() => {
//         next({
//           path: to.path || '',
//           query: to.query
//         })
//       })
//     }
//   } else {
//     window.location.href = Redirect.loginUrl
//   }
// })
// // 全局路由后置守卫
// router.afterEach((to) => {
//   // 显示还是隐藏左侧导航
//   // store.dispatch('setNavSide', to.meta.showNavSide)
//   done()
// })

export default router
