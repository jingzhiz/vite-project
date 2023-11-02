import Request from './request'
import cache from '../cache'
import { ElMessage } from 'element-plus'

const request = new Request({
  timeout: 5000,
  interceptors: {
    requestInterceptor: (config) => {
      const token = cache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败')
      return Promise.reject(err)
    },
    responseInterceptor: (response) => {
      const { data } = response
      if (data.status >= 300 || data.status < 200) {
        ElMessage({
          type: 'error',
          message: data.message,
          duration: 2000
        })
      }
      return data.data
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败')
      return Promise.reject(err)
    }
  }
})

export default request
