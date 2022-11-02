// search模块小仓库
import { reqGetSearchInfo } from '@/api/index.js'
const state = {
  searchlist: {}
}
const mutations = {
  GETSEARCHLIST(state, searchlist) {
    state.searchlist = searchlist
  }
}
const actions = {
  async getSearchList(context, params = {}) {
    // params形参 是用户派发action的时候，第二个参数传来的，至少是一个空对象
    const result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      context.commit('GETSEARCHLIST', result.data)
    }
  }
}
// 项目中getters的主要作用是：简化仓库中的数据
const getters = {
  goodsList(state) {
    // 无网络返回空数组
    return state.searchlist.goodsList || []
  },
  trademarkList(state) {
    return state.searchlist.trademarkList || []
  },
  attrsList(state) {
    return state.searchlist.attrsList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
