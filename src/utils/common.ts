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