import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 20000
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use((response: any) => {
  if (response && response.status === 200) {
    return response.data.data
  } else {
    console.log('%c返回数据错误', 'background: red; color: #fff; padding: 2px 5px; border-radius: 2px')
    return Promise.reject('返回数据错误')
  }
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service