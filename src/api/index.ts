import axios from '@/utils/request'
import { AMAP_KEY } from '@/config/index'

// 一言，来自https://api.muxiaoguo.cn/doc/yiyan.html
export function yiyan() {
  return axios.request({
    method: 'GET',
    url: 'https://api.muxiaoguo.cn/api/yiyan',
    params: {}
  }).then(res => {
    return res.data
  })
}

// 天气 type = 1 当天, 2 未来7天 3 8到15天
export function queryWeather(city: string = '深圳', type: number = 1) {
  return axios.request({
    method: 'GET',
    url: 'https://api.muxiaoguo.cn/api/tianqi',
    params: {
      city,
      type
    }
  })
}

// 央视新闻，来自https://api.iyk0.com/doc/ysxw
export function ysxw() {
  return axios.request({
    method: 'GET',
    url: 'https://api.iyk0.com/ysxw/',
    params: {}
  }).then(res => {
    return res.data
  })
}

// 高德定位api用2.0，若用1.0 用户不填写IP，则取客户http之中的请求来进行定位，返回是空
export function getLocation(ip: string, type: number = 4) {
  return axios.request({
    method: 'GET',
    url: 'https://restapi.amap.com/v5/ip',
    params: {
      key: AMAP_KEY,
      ip,
      type: ip.length > 16 ? 6 : 4
    }
  })
}

// 高德天气服务 city:城市adcode，实测城市名也行
export function queryWeather2(city: string) {
  return axios.request({
    method: 'GET',
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    params: {
      key: AMAP_KEY,
      city
    }
  })
}
