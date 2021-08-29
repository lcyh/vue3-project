export default [
  {
    key: '2',
    path: '/databoard',
    name: 'Databoard',
    meta: { requiresAuth: true },
    redirect: { name: 'Overview' },
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [{
      path: 'overview',
      name: 'Overview',
      meta: {
        icon: 'iconpiechart',
        title: '数据概览'
      },
      component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
    }, {
      path: 'realtime',
      name: 'RealTime',
      meta: {
        icon: 'iconlinechart',
        title: '实时看板'
      },
      component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
    }, {
      path: 'newboard',
      name: 'NewBoard',
      meta: {
        icon: 'iconadduser',
        title: '新增看板'
      },
      component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
    }, {
      path: 'actived',
      name: 'ActivedBoard',
      meta: {
        icon: 'iconbarchart',
        title: '活跃看板'
      },
      component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
    }, {
      path: 'payment',
      name: 'Payment',
      meta: {
        icon: 'iconbags',
        title: '付费看板'
      },
      component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
    }, {
      path: 'marketing',
      name: 'Marketing',
      meta: {
        icon: 'icondaily',
        title: '营销看板'
      },
      component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
    }, {
      path: 'economy',
      name: 'EconomySystem',
      meta: {
        icon: 'iconbags',
        title: '经济系统'
      },
      component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
    }, {
      path: 'activityAnalysis',
      name: 'ActivityAnalysis',
      meta: {
        icon: 'iconbarchart',
        title: '活动分析'
      },
      component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
    }, {
      path: 'playingData',
      name: 'PlayingData',
      meta: {
        icon: 'icongame',
        title: '玩法数据'
      },
      component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
    }, {
      path: 'custom',
      name: 'Custom',
      meta: {
        icon: 'iconUserSettings',
        title: '自定义看板'
      },
      redirect: { name: 'Board1' },
      component: () => import(/* webpackChunkName: "children" */ '@/views/layout/ChildView.vue'),
      children: [{
        path: 'board1',
        name: 'Board1',
        meta: {
          icon: 'icondaily',
          title: '自定义看板一'
        },
        component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
      }]
    }]
  }
]
