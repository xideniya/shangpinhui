<template>
  <div class="success">
    <p>商品已成功加入购物车！</p>
    <div class="goods">
      <div class="left">
        <img :src="skuInfo.skuDefaultImg" alt="" />
      </div>
      <div class="middle">
        <div>{{ skuInfo.skuName }}</div>
        <div>{{ skuInfo.skuDesc }} 数量：{{ $route.query.skuNum }}</div>
      </div>
      <div class="right"><button @click="gogooddetail">查看商品详情</button><button @click="goshapcart">去购物车结算</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Addcartsuccess',
  methods: {
    // 跳转到商品详情
    gogooddetail() {
      this.$router.push({ name: 'detail', params: { skuId: this.skuInfo.id } })
    },
    // 跳转到购物车
    goshapcart() {
      this.$router.push({ name: 'shopcart' })
    }
  },
  computed: {
    skuInfo() {
      return JSON.parse(sessionStorage.getItem('SKUINFO'))
    }
  }
}
</script>

<style lang="less" scoped>
.success {
  width: 1200px;
  margin: 0 auto;
  p {
    color: green;
  }
  .goods {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    .left {
      margin-right: 10px;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .middle {
      font-size: 12px;
    }
    .right {
      button {
        width: 112px;
        height: 35px;
      }
    }
  }
}
</style>
