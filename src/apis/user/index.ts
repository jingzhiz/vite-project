import request from '@/utils/request'
import {
  ILoginRequest,
  ILoginResponse,
  IUserResponse,
  ILogoutResponse
} from './types'

export function login(data: ILoginRequest) {
  return request.post<ILoginResponse>({
    url: '/mock/auth/login',
    data
  })
}

export function getUserInfo() {
  return request.get<IUserResponse>({
    url: `/mock/auth/getUserInfo`
  })
}

export function logout() {
  return request.get<ILogoutResponse>({
    url: '/mock/user/logout'
  })
}
