// 统一管理API
import requests from './ajax.js'
import mockRequest from './mockAjax.js'
// 三级联动接口
export const reqCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}
// 获取首页轮播图接口
export const reqGetBannerList = () => mockRequest.get('/banner')
// 获取floor组件数据
export const reqGetFloorList = () => mockRequest.get('/floor')
// 获取搜索模块接口 params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'POST',
  data: params
})
// 获取产品详情
export const reqGetGoodInfo = (skuId) => requests({
  url: `/item/${skuId}`,
  method: 'GET'
})
// 把商品添加到购物车
export const reqAddOrUpdateShopCart = (skuID, skuNum) => requests({
  url: `/cart/addToCart/${skuID}/${skuNum}`,
  method: 'post'
})
// 获取购物车数据的接口
export const reqShopCart = () => requests({
  url: '/cart/cartList',
  method: 'GET'
})
// 删除购物车产品的接口
export const reqRemoveShopCart = (skuID) => requests({
  url: `/cart/deleteCart/${skuID}`,
  method: 'DELETE'
})
// 切换商品选中状态
export const reqChangeShopCart = (skuID, isChecked) => requests({
  url: `/cart/checkCart/${skuID}/${isChecked}`,
  method: 'GET'
})
// 获取验证码
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'GET'
})
// 注册用户
export const reqRegister = (data) => requests({
  url: '/user/passport/register',
  method: 'post',
  data: data
})
// 用户登录
export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  method: 'post',
  data
})
// 获取用户登录信息
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})
// 用户退出登录
export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})
// 获取用户地址
export const reqAddress = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})
// 获取交易详情页清单
export const reqTradeList = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})
// 提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method: 'post',
  data: data
})
// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})
// 查询订单支付状态
export const reqPayStatus = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})
// 获取个人中心 订单列表
export const reqOrders = (page, limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})
