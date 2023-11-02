import Layout from '@/layout/index.vue'

export default {
  path: '/system',
  component: Layout,
  redirect: '/system/user',
  name: 'System',
  meta: { alias: '系统管理', icon: 'Setting', roles: ['normal'] },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/operation/system/user'),
      meta: { alias: '用户管理', icon: 'User', roles: ['normal'] }
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/operation/system/role'),
      meta: { alias: '角色管理', icon: 'Avatar', roles: ['normal'] }
    }
  ]
}