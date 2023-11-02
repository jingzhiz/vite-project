import Layout from '@/layout/index.vue'

export default {
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { alias: '系统案例', icon: 'HelpFilled', roles: ['normal'] },
  children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/operation/example/table'),
      meta: { alias: '表格案例', icon: 'Compass', roles: ['normal'] }
    },
    {
      path: 'form',
      name: 'Form',
      component: () => import('@/views/operation/example/form'),
      meta: { alias: '表单案例', icon: 'DataBoard', roles: ['normal'] }
    },
    {
      path: 'chart',
      name: 'Chart',
      component: () => import('@/views/operation/example/chart'),
      meta: { alias: '图形案例', icon: 'PieChart', roles: ['normal'] }
    }
  ]
}
