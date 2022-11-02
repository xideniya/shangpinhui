// 购物车仓库
import { reqShopCart, reqRemoveShopCart, reqChangeShopCart } from '@/api/index.js'
const state = {
  shopcartlist: []
}
const mutations = {
  GETSHOPCARTLIST(state, data) {
    state.shopcartlist = data
  }
}

const actions = {
  // 获取购物车列表数据
  async getShopCartList(context) {
    const result = await reqShopCart()
    if (result.code === 200) {
      context.commit('GETSHOPCARTLIST', result.data)
    }
  },
  // 删除购物车数据
  async RemoveShopCart(context, skuID) {
    const result = await reqRemoveShopCart(skuID)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 切换商品选中状态
  async Changeshopcart(context, { skuID, isChecked }) {
    const result = await reqChangeShopCart(skuID, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除所有选中的商品
  deletellshopcart(context) {
    const arr1 = []
    context.getters.cartInfoList.filter(item => item.isChecked === 1).forEach(element => {
      arr1.push(context.dispatch('RemoveShopCart', element.skuId))
    })
    // 全部的p1p2...都成功，返回的结果为成功，有一个失败即为失败
    return Promise.all(arr1)
  },
  // 购物车全选或全不选
  ChooseAll(context, allcheck) {
    const ischecked = allcheck === true ? 1 : 0
    const arr2 = []
    context.getters.cartInfoList.filter(item => item.isChecked !== ischecked).forEach(element => {
      const p = context.dispatch('Changeshopcart', { skuID: element.skuId, isChecked: ischecked })
      arr2.push(p)
    })
    return Promise.all(arr2)
  }
}
const getters = {
  cartInfoList(state) {
    return (state.shopcartlist[0] || {}).cartInfoList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters

}
