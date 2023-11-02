export interface ILoginRequest {
  username: string
  password: string
}

export interface ILoginResponse {
  token: string
}
interface IUserInfo {
  name: string
  password?: string
  avatar: string
  roles: Array<string>
  introduction: string
}

export interface IUserResponse {
  userInfo: IUserInfo
}

export interface ILogoutResponse {
  data: string
}