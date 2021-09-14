export default [
  {
    path: '/person',
    name: 'Person',
    redirect: '/person/profile',
    meta: { requiresAuth: true, title: '个人中心' },
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: 'profile',
        name: 'Profile',
        meta: { requiresAuth: true, title: '个人中心' },
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile')
      },
    ]
  },
]
