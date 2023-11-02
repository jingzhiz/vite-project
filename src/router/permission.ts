import { router } from './index'
import type { RouteRecordRaw } from 'vue-router'
import useUserStore from 'store/module/user'
import usePermissionStore from 'store/module/permission'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = to.meta.alias as string
  const userStore = useUserStore()
  const hasToken = userStore.token
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = userStore.user && userStore.user.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await userStore.getUserInfo()
          const permissionStore = usePermissionStore()
          const accessedRoutes = await permissionStore.generateRoutes(roles)
          accessedRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (e) {
          await userStore.resetToken()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
