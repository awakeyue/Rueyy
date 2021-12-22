import axios from '@/utils/request'
const BASE_URL = 'http://route.showapi.com'

export function getWisdom() {
  return axios.request({
    method: 'GET',
    url: BASE_URL + '/doc/215',
    params: {
      
    }
  })
}