export default [
  {
    path: '/databoard',
    name: 'Databoard',
    redirect: '/databoard/detail',
    meta: {
      title: '数据看板',
      icon: '#iconexcel'
    },
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: 'detail/:id?',
        name: 'DataboardDetail',
        meta: { requiresAuth: true, title: '数据报表' },
        component: () => import(/* webpackChunkName: "databoard" */ '@/views/databoard/index.vue')
      },
    ]
  },
]
