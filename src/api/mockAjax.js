import axios from 'axios'
/* 
专门请求mock接口的axios封装
*/
const mockAjax = axios.create({
  baseURL: "/mock", // 路径前缀
  timeout: 10000 // 请求超时时间
})

mockAjax.interceptors.request.use((config) => {
  return config
})

mockAjax.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default mockAjax