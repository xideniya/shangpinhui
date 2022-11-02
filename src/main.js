import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
// 轮播图组件---全局组件
import Carsouel from '@/components/Carsouel/Carsouel.vue'
// 分页器组件--全局组件
import Pagination from '@/components/Pagination/Pagination.vue'
import '@/assets/style/reset.css'
import '@/mock/mockServe.js'
// 按需引入饿了么UI
import { MessageBox } from 'element-ui'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 统一接口api文件夹里全部请求函数,统一引入
import * as API from '@/api/index.js'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import pika from '@/assets/1.gif'
// 引入表单校验插件
import '@/plugins/validate.js'
// 注册饿了么UI ，挂载到原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  // 懒加载默认图片
  loading: pika,
  attempt: 1
})

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsouel.name, Carsouel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
