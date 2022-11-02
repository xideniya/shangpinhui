// 产品详情页的仓库
import { reqGetGoodInfo, reqAddOrUpdateShopCart } from '@/api/index.js'
import { getuuid } from '@/utils/uuid_token.js'
const state = {
  goodinfo: {},
  // 游客的临时身份 通过utils 里的函数获取
  uuid_token: getuuid()
}
const mutations = {
  GETGOODINFO(state, data) {
    state.goodinfo = data
  }
}
const actions = {
// 获取产品信息
  async getGoodInfo(context, skuId) {
    const result = await reqGetGoodInfo(skuId)
    if (result.code === 200) {
      context.commit('GETGOODINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart(context, { skuID, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuID, skuNum)
    // 服务器写入数据成功，没有返回其他数据，不需要三连环存储数据
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }

}
const getters = {
  categoryView(state) {
    return state.goodinfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodinfo.skuInfo || {}
  },
  // 商品属性的数据简化
  spuSaleAttrList(state) {
    return state.goodinfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
