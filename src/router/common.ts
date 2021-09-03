/**
 * 公共路由配置
 */
/* eslint-disable */
import { MenuState, MenuRouter } from '@/types/router'

function importModules(files: any) {
  const routeModules: MenuState[] = []
  files.keys().forEach((key: string) => {
    routeModules.push(...files(key).default)
  })
  routeModules.sort((a: any, b: any) => Number(a.key) - Number(b.key))
  return routeModules
}
export const routeModules = importModules(require.context('./modules', false, /\.ts$/))
// 一二级导航集合
export function formatMenusMap() {
  const list = routeModules
  const menuMap = new Map()
  const recursion = (list: MenuState[]) => {
    const result: MenuRouter[] = []
    list.forEach((item: MenuState) => {
      // 一级导航
      if (item.children && item.children.length) {
        result.push({
          path: item.path,
          name: item.name,
          title: item.meta.title,
          icon: item.meta.icon,
          children: recursion(item.children)
        })
      } else {
        result.push({
          path: item.path,
          name: item.name,
          title: item.meta.title,
          icon: item.meta.icon
        })
      }
    })
    return result
  }
  list.forEach((item: MenuState) => {
    const map = recursion(item.children)
    menuMap.set(item.name, map)
  })
  return menuMap
}

const routes = [
  {
    path: '/',
    meta: { requiresAuth: true },
    redirect: 'Home',
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: { showNavSide: false, title: '首页' },
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      },
      {
        path: '/databoard/:id?',
        name: 'Databoard',
        meta: { requiresAuth: true, title: '数据看板' },
        component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
      },
      {
        path: '/form',
        name: 'Form',
        meta: { requiresAuth: true, title: 'Form表单' },
        component: () => import(/* webpackChunkName: "form" */ '@/views/form.vue')
      },
      {
        path: '/count',
        name: 'Count',
        meta: { requiresAuth: true, title: '计数器' },
        component: () => import(/* webpackChunkName: "count" */ '@/views/count.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        meta: { requiresAuth: true, title: '个人中心' },
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile')
      }
    ]
  }
]
export default routes
