/**
 * @class Cache
 * @example
 */
class Cache {
  prefix: string

  constructor(prefix = '') {
    this.prefix = prefix
  }

  getCache(key: string) {
    key = this.prefix + key
    return JSON.parse(localStorage.getItem(key) as string)
  }

  setCache<T>(key: string, value: T) {
    key = this.prefix + key
    localStorage.setItem(key, JSON.stringify(value))
  }

  removeCache(key: string) {
    key = this.prefix + key
    localStorage.removeItem(key)
  }

  getSessionCache(key: string) {
    key = this.prefix + key
    return JSON.parse(sessionStorage.getItem(key) as string)
  }

  setSessionCache<T>(key: string, value: T) {
    key = this.prefix + key
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  removeSessionCache(key: string) {
    key = this.prefix + key
    sessionStorage.removeItem(key)
  }

  clean() {
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        delete sessionStorage[key]
      }
    })
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        delete localStorage[key]
      }
    })
  }
}

export default new Cache('v-')
