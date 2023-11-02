import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { asyncRouterMap as asyncRoutes, routes as constantRoutes } from '@/router'
import type { IPermissionState } from './type'

function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      return route.meta && (route.meta.roles as string[]).includes(role)
    })
  } else {
    return true
  }
}

function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const usePermissionStore = defineStore('permission', {
  state: (): IPermissionState => {
    return {
      routes: [],
      addRoutes: []
    }
  },
  actions: {
    generateRoutes(roles: string[]): RouteRecordRaw[] {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      this.addRoutes = accessedRoutes
      this.routes = constantRoutes.concat(accessedRoutes)
      return accessedRoutes
    }
  }
})

export default usePermissionStore
