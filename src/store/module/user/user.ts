import { defineStore } from 'pinia'
import cache from '@/utils/cache'
import { login, getUserInfo, logout } from '@/apis/user'
import type { ILoginRequest } from '@/apis/user/types'
import type { IUserState } from './type'

const useUserStore = defineStore('user', {
  state: (): IUserState => {
    return {
      user: {
        name: '',
        avatar: '',
        introduction: '',
        roles: []
      },
      token: cache.getCache('token')
    }
  },
  getters: {
    username(state) {
      return state.user.name
    },
    avatar(state) {
      return state.user.avatar
    }
  },
  actions: {
    async login(info: ILoginRequest) {
      const data = await login(info)
      this.token = data.token
      cache.setCache('token', this.token)
    },
    async getUserInfo() {
      const { userInfo } = await getUserInfo()
      delete userInfo.password
      this.user = userInfo
      return userInfo
    },
    async logout() {
      await logout()
      this.resetToken()
      cache.removeSessionCache('notice_flag')
      this.$reset()
    },
    resetToken() {
      cache.removeCache('token')
      this.token = ''
    }
  }
})

export default useUserStore
