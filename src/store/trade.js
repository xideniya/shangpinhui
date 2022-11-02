import { reqAddress, reqTradeList, reqSubmitOrder } from '@/api/index.js'
const state = {
  address: [],
  tradelist: {},
  orderId: ''
}
const mutations = {
  // 储存用户地址信息
  GETUSERADDRESS(state, address) {
    state.address = address
  },
  GETTRADELIST(state, tradelist) {
    state.tradelist = tradelist
  },
  // 提交订单后，储存订单号
  GETORDERID(state, orderId) {
    state.orderId = orderId
  }
}
const actions = {
// 获取用户的地址信息
  async Getuseraddress(context) {
    const result = await reqAddress()
    if (result.code === 200) {
      context.commit('GETUSERADDRESS', result.data)
      return 'ok'
    }
  },
  // 获取交易详情
  async Gettradelist(context) {
    const result = await reqTradeList()
    if (result.code === 200) {
      context.commit('GETTRADELIST', result.data)
    }
  },
  // 提交订单信息
  async SubmitOrder(context, { tradeNo, data }) {
    const result = await reqSubmitOrder(tradeNo, data)
    if (result.code === 200) {
      context.commit('GETORDERID', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
