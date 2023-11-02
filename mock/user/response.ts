import { MockMethod } from 'vite-plugin-mock'
import { tokens, users } from './data'
import { getRandomDelayTime } from '../utils'
import { ResultCodeEnum } from '../enum'

const login = {
  url: '/mock/auth/login',
  method: 'post',
  timeout: getRandomDelayTime(100, 1000),
  response: (ctx) => {
    const { username } = ctx.body
    const token = tokens[username]

    if (!token) {
      return {
        status: ResultCodeEnum.FAIL,
        message: '用户名或密码错误'
      }
    }

    return {
      status: ResultCodeEnum.SUCCESS,
      message: 'success',
      data: token
    }
  }
}

const userInfo = {
  url: '/mock/auth/getUserInfo',
  method: 'get',
  timeout: getRandomDelayTime(100, 1000),
  response: (ctx) => {
    const token = ctx.headers.authorization.replace('Bearer ', '')
    const userInfo = users[token]

    if (!userInfo) {
      return {
        status: ResultCodeEnum.FAIL,
        message: '登录失败，不能获取到用户信息'
      }
    }

    return {
      status: ResultCodeEnum.SUCCESS,
      message: 'success',
      data: {
        userInfo: userInfo
      }
    }
  }
}

const logout = {
  url: '/mock/user/logout',
  method: 'get',
  timeout: getRandomDelayTime(100, 0),
  response: () => {
    return {
      status: ResultCodeEnum.SUCCESS,
      message: 'success',
      data: 'logout!'
    }
  }
}

export default [login, userInfo, logout] as MockMethod[]
