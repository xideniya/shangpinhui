// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
const requests = axios.create({
  // 基础路径 注意URL都大写
  baseURL: '/mock',
  // 请求超时时间
  timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use((config) => {
  // 进度条开始动
  nprogress.start()
  return config
})
// 响应拦截器
requests.interceptors.response.use((res) => {
  // 进度条结束
  nprogress.done()
  return res.data
}, (eror) => {
  return Promise.reject(new Error('fail'))
})

export default requests
