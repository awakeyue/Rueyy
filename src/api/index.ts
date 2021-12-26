import axios from '@/utils/request'

// 一言，来自https://api.muxiaoguo.cn/doc/yiyan.html
export function yiyan() {
  return axios.request({
    method: 'GET',
    url: 'https://api.muxiaoguo.cn/api/yiyan',
    params: {}
  })
}

// 央视新闻，来自https://api.iyk0.com/doc/ysxw
export function ysxw() {
  return axios.request({
    method: 'GET',
    url: 'https://api.iyk0.com/ysxw/',
    params: {}
  })
}