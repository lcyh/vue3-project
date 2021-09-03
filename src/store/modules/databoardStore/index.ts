/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionContext } from 'vuex'
import { ElMessage } from 'element-plus'
import DataBoardState, { GameInfo, DataboardMenu } from './types'
import DataboardAction from '@/api/modules/databoard'
import RootStateTypes from '../../types'

// 根据用户看板权限生成相应的导航列表
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formatMenuReport(data: any[]) {
  const recursion = (list: DataboardMenu[]): string[][] => {
    let result: string[][] = []
    list.forEach((item: DataboardMenu) => {
      // 一级导航
      if (item.children && item.children.length) {
        result = result.concat(recursion(item.children))
      } else {
        result.push([item.name, item.reportUrl])
      }
    })
    return result
  }
  const reportMenu = recursion(data)
  const reportMap = new Map()
  reportMenu.forEach(([key, value]) => reportMap.set(key, value))
  return reportMap
}

const databoardModule = {
  namespaced: true,
  state: {
    gameList: [], // 游戏列表
    selectedGame: null, // 选中的游戏
    reportMenuList: [] // 所有报表列表
  },
  mutations: {
    SET_GAME_LIST(state: DataBoardState, value: GameInfo[]) {
      state.gameList = value
    },
    SET_SELECTED_GAME(state: DataBoardState, value: GameInfo) {
      state.selectedGame = value
    },
    SET_REPORT_LIST(state: DataBoardState, list = []) {
      console.log('SET_REPORT_LIST', list)
      // const menus = formatMenuReport(list)
      // console.log('freportMap', menus)
      state.reportMenuList = list
    }
  },
  actions: {
    setSelectedGame(
      { commit, state }: ActionContext<DataBoardState, RootStateTypes>,
      value: string
    ) {
      const currentGame = state.gameList.find((item) => item.gameBaseId === value)
      if (currentGame) {
        commit('SET_SELECTED_GAME', currentGame)
      }
    },
    setGameList({ commit, state }: ActionContext<DataBoardState, RootStateTypes>) {
      return new Promise<GameInfo>((resolve, reject) => {
        DataboardAction.getGameList()
          .then((res) => {
            if (res.data) {
              const { data } = res
              let defaultGame = state.selectedGame
              if (data.length) {
                if (!state.selectedGame) {
                  defaultGame = data[0] || null
                  commit('SET_SELECTED_GAME', defaultGame)
                }
                commit('SET_GAME_LIST', data)
              }
              resolve(defaultGame)
            } else {
              reject(new Error('游戏数据获取失败'))
            }
          })
          .catch((err) => {
            const msg = err.message || '请求异常'
            ElMessage.error(msg)
            reject(err)
          })
      })
    },
    setReportList({ commit, getters }: ActionContext<string, RootStateTypes>, value: number) {
      return new Promise<void>((resolve, reject) => {
        DataboardAction.getReportList({
          userId: getters?.userInfo?.id || '',
          gameBaseId: value
        })
          .then((res) => {
            if (res.data) {
              const { data } = res
              // 生成报表左侧导航
              commit('SET_REPORT_LIST', data)
              resolve(data)
            } else {
              reject(new Error('游戏报表获取失败'))
            }
          })
          .catch((err) => {
            const msg = err.message || '请求异常'
            ElMessage.error(msg)
            reject(err)
          })
      })
    }
  }
}

export default databoardModule
