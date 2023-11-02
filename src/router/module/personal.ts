import Layout from '@/layout/index.vue'

export default {
  path: '/personal',
  component: Layout,
  redirect: '/todo',
  name: 'Screen',
  meta: { alias: '个人事务', icon: 'User', roles: ['normal'] },
  children: [
    {
      path: 'todo',
      name: 'Todo',
      component: () => import('@/views/operation/personal/todo'),
      meta: { alias: 'Todo清单', icon: 'SetUp', roles: ['normal'] }
    },
    {
      path: 'tally',
      name: 'Tally',
      component: () => import('@/views/operation/personal/tally'),
      meta: { alias: '账单记录', icon: 'Notebook', roles: ['normal'] }
    }
  ]
}