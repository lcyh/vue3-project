const menus = [
  {
    id: 2,
    parentId: 0,
    name: 'Overview',
    path: '/Databoard/overview',
    component: 'databoard',
    meta: { title: '数据概览', icon: 'iconlinechart' }
  },
  {
    id: 20,
    parentId: 2,
    name: 'ActivedBoard',
    path: '/Databoard/activedBoard',
    component: 'databoard',
    meta: { title: '活跃看板', icon: 'iconlinechart' }
  },
  {
    id: 22,
    parentId: 2,
    name: 'Realtime',
    path: '/Databoard/realtime',
    component: 'databoard',
    meta: { title: '实时看板', icon: 'el-icon-help' }
  },
]
export default menus
