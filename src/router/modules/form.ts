export default [
  {
    path: '/form',
    name: 'Form',
    redirect: '/form/form-detail',
    meta: { requiresAuth: true, title: 'Form表单' },
    component: () => import(/* webpackChunkName: "index" */ '@/views/layout/index.vue'),
    children: [
      {
        path: 'form-detail',
        name: 'FormDetail',
        meta: { requiresAuth: true, title: 'Form表单测试' },
        component: () => import(/* webpackChunkName: "form" */ '@/views/form.vue')
      },
    ]
  },
]
