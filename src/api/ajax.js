// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入仓库
import store from '@/store/index.js'
const requests = axios.create({
  // 基础路径 注意URL都大写
  baseURL: '/api',
  // 请求超时时间
  timeout: 5000
})
// 请求拦截器
requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    // 给请求头添加配置userTempId（配置的字段后台已配置，不能瞎写）
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
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
