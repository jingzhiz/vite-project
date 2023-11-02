import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/index.vue'

import asyncRouterMap from './module'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      alias: 'home',
      hidden: true,
      roles: [],
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          alias: '首页',
          roles: [],
          icon: 'ElementPlus',
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: {
      alias: '登录',
      roles: [],
      hidden: true
    }
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/notFound'),
    meta: {
      alias: '未找到该页面',
      roles: [],
      hidden: true
    }
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: '404',
  //   redirect: '/404',
  //   meta: {
  //     alias: '未找到该页面',
  //     hidden: true
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

function setupRouter(app: App<Element>) {
  app.use(router)
}

export { routes, router, asyncRouterMap, setupRouter }
