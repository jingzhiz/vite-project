import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    alias: string
    roles: string[]
    icon?: string
    group?: string
    hidden?: boolean
  }
}