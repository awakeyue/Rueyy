import { isPlainObject, isArray } from 'lodash'
// 存到浏览器内存
export function setStorage (key: string, value: any, isLoc: boolean = true) {
  const storage = isLoc ? localStorage : sessionStorage
  if (isPlainObject(value) || isArray(value)) {
    storage.setItem(key, JSON.stringify(value))
  } else {
    storage.setItem(key, value)
  }
}

export function getStorage(key: string, isLoc: boolean = true) {
  const storage = isLoc ? localStorage : sessionStorage
  const value = storage.getItem(key)
  if (value) {
    try {
      const json = JSON.parse(value)
      if (typeof json === 'object') {
        return json
      } else if (typeof json === 'number') {
        return json
      }
    } catch (error) {
      return value
    }
  } else {
    return false
  }
}

export function jsonpRequest(fnName: string, url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    window[fnName] = function(res: any) {
      const currentIp = res ? res.ip : ''
      resolve(currentIp)
      delete window[fnName]
      script.remove()
    }
    script.type = 'text/javascript'
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}
