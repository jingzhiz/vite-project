import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { IRequestConfig, IRequestInterceptor, IResult } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class Request {
  instance: AxiosInstance
  interceptors?: IRequestInterceptor

  showLoading?: boolean
  loading?: LoadingInstance

  constructor(config: IRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config: IRequestConfig) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading~',
            background: 'rgba(255, 255, 255, .7)'
          })
        }
        return config
      },
      (err: unknown) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (response: IResult) => {
        this.loading?.close()
        return response
      },
      (err: unknown) => {
        this.loading?.close()
        return Promise.reject(err)
      }
    )
  }

  get<T>(config: IRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }
  post<T>(config: IRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'post' })
  }
  delete<T>(config: IRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' })
  }
  patch<T>(config: IRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'patch' })
  }

  request<T>(config: IRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, AxiosResponse<IResult>>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING
          resolve(res as unknown as Promise<T>)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          return reject(err)
        })
    })
  }
}

export default Request
