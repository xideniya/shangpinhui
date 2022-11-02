<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.ishowfooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    // 派发action 获取商品分类三级列表，只执行一次，优化性能 放在typenav组件的话执行多次，发起多次请求
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less" scoped></style>
