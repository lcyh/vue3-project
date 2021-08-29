/**
 * 数据看板接口
 */
import Http from '../http'

function getGameList(params = {}) {
  return Http.create({
    method: 'get',
    // url: '/game/gameBaseList',
    url: '/mock/gameList.json',
    params
  })
}

function getReportList(params: { userId: number; gameBaseId: number }) {
  return Http.create({
    method: 'get',
    url: '/mock/dashboardMenuTree.json',
    params
  })
}

export default {
  getGameList,
  getReportList
}
