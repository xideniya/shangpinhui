// 引入一级路由组件
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/Home/Home.vue'
import Search from '@/views/Search/Search.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import Detail from '@/views/Detail/Detail.vue'
import Addcartsuccess from '@/views/Addcartsuccess/Addcartsuccess.vue'
import ShopCart from '@/views/ShopCart/ShopCart.vue'
import Trade from '@/views/Trade/Trade.vue'
import Pay from '@/views/Pay/Pay.vue'
import PaySuccess from '@/views/PaySuccess/PaySuccess.vue'
import Center from '@/views/Center/Center.vue'
// 引入二级路由组件
import myOrder from '@/views/Center/myOrder/myOrder.vue'
import groupOrder from '@/views/Center/groupOrder/groupOrder.vue'
// 引入仓库
import store from '@/store/index.js'

Vue.use(VueRouter)

// 把原型对象的push方法先保存一份
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 重写push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originalPush.call(this, location, resolve, reject)
  } else {
    originalPush.call(this, location, () => {}, () => {})
  }
}
// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originalReplace.call(this, location, resolve, reject)
  } else {
    originalReplace.call(this, location, () => {}, () => {})
  }
}

const routes = [{
  path: '/home',
  // 路由懒加载
  component: () => import('@/views/Home/Home.vue'),
  // 控制是否显示footer组件
  meta: { ishowfooter: true }
},
{
  name: 'search',
  // keyword 后面加个问号，说明params参数可有可无
  path: '/search/:keyword?',
  component: Search,
  meta: { ishowfooter: true }
},
{
  name: 'login',
  path: '/login',
  component: Login,
  meta: { ishowfooter: false }
},
{
  path: '/register',
  component: Register,
  meta: { ishowfooter: false }
},
{
  path: '/',
  redirect: '/home'
},
{
  // 跳转时带上产品的ID
  name: 'detail',
  path: '/detail/:skuId',
  component: Detail,
  meta: { ishowfooter: true }
},
{
  // 跳转时带上产品的ID
  name: 'addcartsuccess',
  path: '/addcartsuccess',
  component: Addcartsuccess,
  meta: { ishowfooter: true }
},
{
  // 购物车
  name: 'shopcart',
  path: '/shopcart',
  component: ShopCart,
  meta: { ishowfooter: true }
},
{
  // 订单
  name: 'trade',
  path: '/trade',
  component: Trade,
  meta: { ishowfooter: true },
  // 路由独享守卫
  beforeEnter: (to, from, next) => {
    // 去交易页面，必须是从购物车而来
    if (from.path === '/shopcart') {
      next()
    } else {
      next(false)
    }
  }
},
{
  // 支付
  name: 'pay',
  path: '/pay',
  component: Pay,
  meta: { ishowfooter: true },
  beforeEnter: (to, from, next) => {
    if (from.path === '/trade') {
      next()
    } else {
      next(false)
    }
  }
},
{
  // 支付成功
  name: 'paysuccess',
  path: '/paysuccess',
  component: PaySuccess,
  meta: { ishowfooter: true }
},
{
  // 个人中心
  name: 'center',
  path: '/center',
  redirect: '/center/myorder',
  component: Center,
  children: [
    {
      path: 'myorder',
      component: myOrder
    },
    {
      path: 'grouporder',
      component: groupOrder
    }
  ],
  meta: { ishowfooter: true }
}
]

const router = new VueRouter({
  routes,
  // 跳转后滚动条位置
  scrollBehavior(to, from, savePosition) {
    return { x: 0, y: 0 }
  }
})
// 全局守卫，前置守卫
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  // 用户信息
  const name = store.state.user.userinfo.name
  if (token) {
    // 用户登录后禁止去login
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      // 登陆了，但是没去login
      if (name) {
        next()
      } else {
        try {
          // 获取用户信息成功，放行
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token过期了，从服务器获取不到用户信息
          // 清除用户信息和token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录，不能去pay center trade等路由
    if (to.path === 'trade' || to.path === 'pay' || to.path === 'paysuccess' || to.path.indexOf('/center') !== -1) {
      // 把未登录的情况下想去而未去成的信息，存储到地址栏中
      next('/login?redirect=' + to.path)
    } else {
      next()
    }
  }
})

export default router
