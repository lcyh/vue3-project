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
        meta: { showNavSide: false },
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      }
    ]
  },
  // {
  //   path: '/home',
  //   name: 'Home',
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
export default routes
