import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/home.js'
import search from '@/store/search.js'
import detail from '@/store/detail.js'
import shopcart from '@/store/shopcart.js'
import user from '@/store/user.js'
import trade from '@/store/trade.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // vuex仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})
