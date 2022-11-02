<template>
  <div>
    <h4>恭喜您，支付成功了</h4>
    <router-link to="/center">查看订单</router-link>
    <router-link to="/">继续购物</router-link>
  </div>
</template>

<script>
export default {
  name: 'PaySuccess',
  // 组件内路由
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
    if (from.path === 'pay') {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style lang="less" scoped>
div {
  width: 1200px;
  margin: 10px auto;
  h4 {
    font-size: 20px;
    margin-bottom: 30px;
  }
  a {
    border: 1px solid lightgrey;
    display: inline-block;
    padding: 5px;
    margin-right: 20px;
    width: 80px;
    height: 40px;
    line-height: 28px;
  }
}
</style>
