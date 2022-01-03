import axios from '@/utils/request'

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