import Layout from '@/layout/index.vue'

export default {
  path: '/overview',
  component: Layout,
  redirect: '/full',
  name: 'Overview',
  meta: { alias: '系统总览', icon: 'FullScreen', roles: ['normal'] },
  children: [
    {
      path: 'full',
      name: 'Full',
      component: () => import('@/views/operation/overview/screen'),
      meta: { alias: '数据大屏', icon: 'FullScreen', roles: ['normal'] }
    }
  ]
}