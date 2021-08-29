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
  });
  return menuMap
}

export default [
  {
    path: '/',
    meta: { requiresAuth: true },
    redirect: '/home',
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { showNavSide: false },
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      }
    ]
  },
  // ...routeModules,
  {
    path: '/403',
    name: 'Forbiddance',
    component: () => import(/* webpackChunkName: "forbiddance" */ '@/views/exceptions/403.vue')
  },
  // {
  //   path: '*',
  //   component: () => import(/* webpackChunkName: "notfound" */ '@/views/exceptions/404.vue')
  // }
]
