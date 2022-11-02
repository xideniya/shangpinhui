import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api/index.js'
// home模块小仓库
const state = {
  categorylist: [],
  bannerList: [],
  floorlist: []
}
const actions = {
  // 向服务器获取三级列表数据
  async categoryList({ commit }) {
    // 通过api里面的接口函数调用，发起服务器请求
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 向服务器获取轮播图数据
  async getBannerList(context) {
    const result = await reqGetBannerList()
    if (result.code === 200) {
      context.commit('GETBANNERLIST', result.data)
    }
  },
  //  向服务器获取floor数据
  async getFloorList(context) {
    const result = await reqGetFloorList()
    if (result.code === 200) {
      context.commit('GETFLOORLIST', result.data)
    }
  }
}
const mutations = {
  // 三级列表数据
  CATEGORYLIST(state, categorylist) {
    state.categorylist = categorylist
  },
  // 轮播图数据
  GETBANNERLIST(state, bannerlist) {
    state.bannerList = bannerlist
  },
  // floor数据
  GETFLOORLIST(state, floorlist) {
    state.floorlist = floorlist
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
