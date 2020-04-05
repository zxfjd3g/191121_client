/* 
针对真实接口的axios封装
*/
import axios from 'axios'
import {getUserTempId, getUserInfo} from '@/utils/storageUtils'

const ajax = axios.create({
  baseURL: "/api",
  timeout: 15000
})

ajax.interceptors.request.use((config) => {
  // 获取当前用户信息
  const userInfo = getUserInfo()
  // 如果存在
  if (userInfo && userInfo.token) {
    // 将token添加到请求头token上
    config.headers['token'] = userInfo.token
  } 
  // 总是携带用户的临时ID(否则得不到未登陆时添加的购物项)
  config.headers['userTempId'] = getUserTempId()

  // 必须返回配置对象
  return config
})

ajax.interceptors.response.use((response) => {
  // 返回响应体数据
  return response.data
}, (error) => {
  alert('请求出错: ' + error.message || '未知错误')
  return Promise.reject(error) // 具体的请求如何想处理也可以catch
})

export default ajax;