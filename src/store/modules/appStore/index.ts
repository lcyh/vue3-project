/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionContext } from 'vuex'
import { ElMessage } from 'element-plus'
import { formatMenusMap, routeModules } from '@/router/common'
import UserAction from '@/api/modules/app'
import AppState, { UserInfo } from './types'
import RootStateTypes from '../../types'
import { getCookie, setCookie, removeCookie } from '@/utils/auth'
import NotFound from '@/views/exceptions/404.vue'

let databoardRoute: any = {}
routeModules.forEach((item: any) => {
  if (item.path === '/databoard') {
    databoardRoute = Object.assign(databoardRoute, item)
  }
})
const appModule = {
  namespaced: true,
  state: {
    token: getCookie() || '',
    userInfo: {
      id: '',
      role: [],
      roleName: '',
      userName: '',
      email: ''
    }, // 用户信息
    collapsed: false, // 左侧导航是否折叠
    showNavSide: true, // 是否显示左侧导航
    showGameSelect: false, // 是否显示游戏下拉框
    menuMap: formatMenusMap(), // 一二级导航集合
    activedMenu: 'Home', // 当前选中的一级导航
    permission: {
      dynamicRoutes: []
    },
    hasAddRoute: false
  },
  mutations: {
    TOGGLE_COLLAPSED(state: AppState, value: boolean) {
      if (value !== undefined) {
        state.collapsed = value
        return
      }
      state.collapsed = !state.collapsed
    },
    SET_NAV_SIDE(state: AppState, value: boolean | undefined) {
      state.showNavSide = value
    },
    SET_SHOW_GAME_SELECT(state: AppState, value: boolean) {
      state.showGameSelect = value
    },
    SET_ACTIVED_MENU(state: AppState, value: string) {
      state.activedMenu = value
    },
    SET_USER_INFO(state: AppState, value: UserInfo) {
      state.userInfo = value
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SET_ADD_ROUTERS: (state: AppState, routers: any[]) => {
      const routes: any = [];
      if (routers.length) {
        routers.forEach((route: any) => {
          if (route.name === 'Databoard') {
            routes.push(databoardRoute)
          } else {
            routes.push(route)
          }
        })
      }
      routers.push({
        path: "/:path(.*)",
        name: "NotFound",
        component: NotFound,
        meta: { hidden: true }
      })
      state.permission.dynamicRoutes = routes
      console.log('state.permission.dynamicRoutes-1', state.permission.dynamicRoutes);

      state.hasAddRoute = true
    },
    SET_TOKEN: (state: AppState, token: string) => {
      state.token = token
    }
  },
  actions: {
    toggleCollapsed({ commit }: ActionContext<AppState, RootStateTypes>, value: boolean) {
      commit('TOGGLE_COLLAPSED', value)
    },
    setNavSide({ commit }: ActionContext<AppState, RootStateTypes>, value: boolean) {
      commit('SET_NAV_SIDE', value)
    },
    setShowGameSelect({ commit }: ActionContext<AppState, RootStateTypes>, value: boolean) {
      commit('SET_SHOW_GAME_SELECT', value)
    },
    async setLogin(
      { commit }: ActionContext<AppState, RootStateTypes>,
      userInfo: { username: string, password: string }
    ) {
      // eslint-disable-next-line prefer-const
      let { username, password } = userInfo
      username = username.trim()
      await UserAction.loginRequest({ username, password }).then((res: any) => {
        if (res?.code === 200 && res.data.accessToken) {
          setCookie(res.data.accessToken)
          commit("SET_TOKEN", res.data.accessToken)
        }
      }).catch((err: any) => {
        console.log('err', err)
      })
    },
    setUserInfo({ commit }: ActionContext<AppState, RootStateTypes>) {
      return new Promise<void>((resolve, reject) => {
        UserAction.getUserInfo()
          .then((res: any) => {
            if (res.data) {
              const { data } = res
              commit('SET_USER_INFO', {
                id: data.id,
                role: data.role,
                roleName: data.roleName,
                userName: data.userName,
                email: data.email
              })
              resolve()
            } else {
              reject(new Error('用户信息获取失败'))
            }
          })
          .catch((err) => {
            const msg = err.message || '请求异常'
            ElMessage.error(msg)
            reject(err)
          })
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUserPermission({ commit, state }: ActionContext<AppState, RootStateTypes>) {
      return new Promise<any>((resolve, reject) => {
        UserAction.getUserPermission({
          userId: state.userInfo?.id
        })
          .then((res: any) => {
            if (res.data) {
              const { data } = res
              const { list } = data;
              const result = {
                menu: list,
                map: list,
                routes: list,
              }
              // commit('SET_MENU_LIST', result.menu)
              // commit('SET_MENU_MAP', result.map)
              commit('SET_ADD_ROUTERS', result.routes)
              resolve(result.routes)
            } else {
              reject(new Error('用户菜单列表获取失败'))
            }
          })
          .catch((err: any) => {
            const msg = err.message || '用户菜单列表获取失败'
            ElMessage.error(msg)
            reject(err)
          })
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setRemoveToken({ commit, state }: ActionContext<AppState, RootStateTypes>) {
      removeCookie()
      commit('SET_TOKEN', '')
      commit('SET_USER_INFO', '')
    }
  }
}
export default appModule
