import type { RouteRecordRaw } from 'vue-router'

export interface IPermissionState {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}