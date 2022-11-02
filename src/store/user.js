import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index.js'
const state = {
  mycode: '',
  token: localStorage.getItem('TOKEN'),
  userinfo: {}
}
const getters = {}
const mutations = {
  GETCODE(state, code) {
    state.mycode = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GetUSERINFO(state, userinfo) {
    state.userinfo = userinfo
  },
  USERLOGOUT(state) {
    state.token = ''
    state.userinfo = {}
  }
}
const actions = {
  // 获取验证码
  async getCode(context, phone) {
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      context.commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户注册
  async userRegister(context, data) {
    const result = await reqRegister(data)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户登录
  async userLogin(context, data) {
    const result = await reqUserLogin(data)
    // 服务器下发token，用户唯一标识
    if (result.code === 200) {
      context.commit('USERLOGIN', result.data.token)
      // 持久化存储token
      localStorage.setItem('TOKEN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取用户信息
  async getUserInfo(context) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      context.commit('GetUSERINFO', result.data)
      return 'ok'
    } else { return Promise.reject(new Error('fail')) }
  },
  // 退出登录
  async userLogout(context) {
    const result = await reqLogout()
    if (result.code) {
      context.commit('USERLOGOUT')
      localStorage.removeItem('TOKEN')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }

}
export default {
  state,
  getters,
  mutations,
  actions
}
