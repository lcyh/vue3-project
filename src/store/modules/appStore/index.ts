/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionContext } from 'vuex'
import { ElMessage } from 'element-plus'
import { formatMenusMap } from '@/router/common'
import UserAction from '@/api/modules/app'
import AppState, { UserInfo } from './types'
import RootStateTypes from '../../types'

const appModule = {
  namespaced: true,
  state: {
    userInfo: null, // 用户信息
    collapsed: false, // 左侧导航是否折叠
    showNavSide: true, // 是否显示左侧导航
    showGameSelect: false, // 是否显示游戏下拉框
    menuMap: formatMenusMap(), // 一二级导航集合
    activedMenu: 'Home' // 当前选中的一级导航
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
    }
  },
  actions: {
    toggleCollapsed({ commit }: ActionContext<string, RootStateTypes>, value: boolean) {
      commit('TOGGLE_COLLAPSED', value)
    },
    setNavSide({ commit }: ActionContext<string, RootStateTypes>, value: boolean) {
      commit('SET_NAV_SIDE', value)
    },
    setActivedMenu({ commit }: ActionContext<string, RootStateTypes>, value: string) {
      commit('SET_ACTIVED_MENU', value)
    },
    setShowGameSelect({ commit }: ActionContext<string, RootStateTypes>, value: boolean) {
      commit('SET_SHOW_GAME_SELECT', value)
    },
    setUserInfo({ commit }: ActionContext<string, RootStateTypes>) {
      return new Promise<void>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        UserAction.getUserInfo().then((res: any) => {
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
        }).catch((err) => {
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
        }).then((res: any) => {
          if (res.data) {
            const { data } = res
            console.log('setUserPermission', data);

            // commit('SET_MENU_LIST', result.menu)
            // commit('SET_MENU_MAP', result.map)
            // commit('SET_ADD_ROUTERS', result.routes)
            // commit('SET_HISTORY_MENU_LIST', data)
            // resolve(result.routes)
          } else {
            reject(new Error('用户菜单列表获取失败'))
          }
        }).catch((err: any) => {
          const msg = err.message || '用户菜单列表获取失败'
          ElMessage.error(msg)
          reject(err)
        })
      })
    }
  }
}
export default appModule
