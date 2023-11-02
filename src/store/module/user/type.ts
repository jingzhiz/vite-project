export interface userState {
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

export interface IUserState {
  user: userState
  token: string | undefined
}