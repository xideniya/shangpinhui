<template>
  <div class="detail">
    <TypeNav></TypeNav>
    <span>{{ categoryView.category1Name }}</span>
    <span>/</span>
    <span>{{ categoryView.category2Name }}</span>
    <span>/</span>
    <span>{{ categoryView.category3Name }}</span>
    <div class="goods">
      <div class="left">
        <Zoom :skuImageList="skuImageList"></Zoom>
        <ImageList :skuImageList="skuImageList"></ImageList>
      </div>
      <div class="right">
        <h5>{{ skuInfo.skuName }}</h5>
        <p>{{ skuInfo.skuDesc }}</p>
        <div class="price">
          <div>
            <i>价 格</i><span>¥{{ skuInfo.price }} 降价通知</span><span>累计评价65545</span>
          </div>
          <div><i>促 销</i><span>加价购满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</span></div>
        </div>
        <div>支 持 以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
        <div>配 送 广东省 深圳市 宝安区</div>
        <div class="choice" v-for="item1 in spuSaleAttrList" :key="item1.id">
          <dl>
            <dt>{{ item1.saleAttrName }}</dt>
            <dd v-for="item2 in item1.spuSaleAttrValueList" :key="item2.id" :class="{ active: item2.isChecked == 1 }" @click="changeactive(item2, item1.spuSaleAttrValueList)">{{ item2.saleAttrValueName }}</dd>
          </dl>
        </div>
        <div class="car">
          <div class="num">
            <input type="text" v-model="skuNum" @change="changeSkuNum" />
            <div><button @click="skuNum++">+</button><button @click="skuNum > 1 ? skuNum-- : (skuNum = 1)">-</button></div>
          </div>
          <!-- 跳转路由之前，向服务器发起post请求，发送加入购物车的商品信息 -->
          <button class="submit" @click="addShopcar">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Zoom from './Zoom/Zoom.vue'
import ImageList from './ImageList/ImageList.vue'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // 购买产品的个数
      skuNum: 1
    }
  },
  name: 'Detail',
  components: {
    Zoom,
    ImageList
  },
  computed: {
    ...mapGetters(['categoryView', 'skuInfo', 'spuSaleAttrList']),
    skuImageList() {
      return this.skuInfo.skuImageList || []
    }
  },
  methods: {
    // item 为点击的li的售卖属性，list为售卖属性数组  排他原理
    changeactive(saleAttrValue, list) {
      list.forEach((item) => {
        item.isChecked = '0'
      })
      saleAttrValue.isChecked = '1'
    },
    // 表单元素修改个数
    changeSkuNum(e) {
      const value = e.target.value * 1
      // 处理非法数据
      if (isNaN(value) || value < 1) {
        console.log('非法')
        this.skuNum = 1
      } else {
        // 处理出现小数的情况
        this.skuNum = parseInt(value)
      }
    },
    // 加入购物车的回调函数
    async addShopcar() {
      // 派发action 成功--路由跳转，传递参数  失败--用户提示
      try {
        await this.$store.dispatch('addOrUpdateShopCart', { skuID: this.$route.params.skuId, skuNum: this.skuNum })
        // 使用会话存储，存储除数量外的商品信息，会话存储的只能是字符串，不是对象
        sessionStorage.setItem('SKUINFO', JSON.stringify(this.skuInfo))
        // 进行路由的跳转，跳转到addcartsuccess组件
        this.$router.push({ name: 'addcartsuccess', query: { skuNum: this.skuNum } })
      } catch (error) {
        alert('error.message')
      }
    }
  },
  mounted() {
    this.$store.dispatch('getGoodInfo', this.$route.params.skuId)
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 1200px;
  margin: 0 auto;
  span {
    line-height: 25px;
  }
  .goods {
    display: flex;
    margin-top: 15px;
    .left {
      width: 402px;
      height: 460px;
      border: 1px solid grey;
    }
    .right {
      margin-left: 5px;
      font-size: 14px;
      flex: 1;
      h5 {
        font-weight: 700;
        line-height: 20px;
      }
      p {
        font-size: 12px;
        color: red;
      }
      div {
        margin-bottom: 15px;
      }
      .price {
        background-color: pink;
        margin-top: 15px;
        div {
          i {
            font-style: normal;
            margin-right: 10px;
          }
        }
      }
      .choice {
        dl {
          display: flex;
          dt {
            margin-right: 20px;
            padding: 5px;
          }
          dd {
            padding: 5px;
            border: 1px solid grey;
            margin-right: 10px;
          }
          .active {
            background-color: skyblue;
            border: 0;
            color: white;
          }
        }
      }
      .car {
        display: flex;
        .num {
          margin-right: 10px;
          display: flex;
          input {
            border: 1px solid grey;
            width: 50px;
            height: 50px;
            text-align: center;
          }
          div {
            button {
              display: block;
              width: 25px;
              height: 25px;
            }
          }
        }
        .submit {
          height: 50px;
          width: 100px;
          color: white;
          background-color: red;
          border: 0;
        }
      }
    }
  }
}
</style>
