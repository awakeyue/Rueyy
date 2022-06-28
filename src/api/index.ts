import axios from '@/utils/request'
import { AMAP_KEY } from '@/config/index'
const API = '/api' // 需代理的接口

// 一言，来自https://api.muxiaoguo.cn/doc/yiyan.html
export function yiyan() {
  return axios.request({
    method: 'GET',
    url: 'https://api.iyk0.com/gsyy/',
    params: {}
  }).then(res => {
    return res
  })
}

// 7日天气
export function query7DayWeather(city: string = '深圳') {
  return axios.request({
    method: 'GET',
    url: 'https://api.iyk0.com/7rtq/',
    params: {
      city
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
export function queryWeather(city: string) {
  return axios.request({
    method: 'GET',
    url: 'https://restapi.amap.com/v3/weather/weatherInfo',
    params: {
      key: AMAP_KEY,
      city
    }
  }).then((res: any) => {
    return res.lives[0]
  })
}

// 高德地图获取行政单位
export function queryDistracts(keywords: string) {
  return axios.request({
    method: 'GET',
    url: 'https://restapi.amap.com/v3/config/district',
    params: {
      key: AMAP_KEY,
      keywords,
      subdistrict: 3,
    }
  }).then((res: any) => {
    return res.districts[0].districts
  })
}

// 获取音乐详情
export function getMusicDetail(ids: string) {
  return axios.request({
    method: 'GET',
    url: API + '/song/detail',
    params: {
      ids
    }
  })
}

// 获取热搜歌曲列表
export function getHotSearch() {
  return axios.request({
    method: 'GET',
    url: API + '/search/hot'
  }).then((res: any) => {
    return res.result.hots
  })
}

// 网易云随机音乐
export function getRandomMusic() {
  return axios.request({
    method: 'GET',
    url: 'https://api.uomg.com/api/rand.music?sort=热歌榜&format=json'
  })
}