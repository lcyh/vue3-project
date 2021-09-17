export default [
  {
    path: '/count',
    name: 'Count',
    redirect: '/count/count-number',
    meta: { requiresAuth: true, title: '计数器' },
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: 'count-number',
        name: 'CountNumber',
        meta: { requiresAuth: true, title: '计数计算' },
        component: () => import(/* webpackChunkName: "count" */ '@/views/count/index.vue')
      },
    ]
  }
]
