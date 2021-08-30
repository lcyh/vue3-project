import Http from '../http'

// 获取当前用户信息
function getUserInfo(params = {}) {
  return Http.create({
    method: 'get',
    // url: '/user/info',
    url: '/mock/user.json',
    params
  })
}
// 获取当前用户导航权限
function getUserPermission(params = {}) {
  return Http.create({
    method: 'get',
    url: '/mock/permission.json',
    data: params
  })
}

export default {
  getUserInfo,
  getUserPermission
}
