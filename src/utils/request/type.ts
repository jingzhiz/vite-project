import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

interface IRequestHeader extends AxiosRequestHeaders {
  Authorization: string
}
interface IRequestConfigWithHeader extends AxiosRequestConfig {
  headers: IRequestHeader
}

interface IRequestInterceptor {
  requestInterceptor?: (config: IRequestConfigWithHeader) => IRequestConfigWithHeader
  requestInterceptorCatch?: (err: unknown) => unknown
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: unknown) => unknown
}

interface IRequestConfig extends AxiosRequestConfig {
  interceptors?: IRequestInterceptor
  showLoading?: boolean
}

interface IResult<T> {
  code: number
  type: 'success' | 'error'
  message: string
  result: T
}

export type { IRequestInterceptor, IRequestConfig, IResult }
