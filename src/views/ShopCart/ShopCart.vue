<template>
  <div class="shopcart">
    <h5>全部商品</h5>
    <div class="title">
      <i>全部</i>
      <i class="im">商品</i>
      <i>单价</i>
      <i>数量</i>
      <i>小计</i>
      <i>操作</i>
    </div>
    <div class="goods" v-for="item in cartInfoList" :key="item.id">
      <div><input type="checkbox" :checked="item.isChecked === 1" @change="changegoodstate($event, item.skuId)" /></div>
      <div class="im">
        <img :src="item.imgUrl" alt="" /><span>{{ item.skuName }}</span>
      </div>
      <div>{{ item.cartPrice }}</div>
      <div class="list4">
        <button @click="handler('minus', -1, item)">-</button>
        <input type="text" :value="item.skuNum" @change="handler('change', $event.target.value * 1, item)" />
        <button @click="handler('add', 1, item)">+</button>
      </div>
      <div>{{ item.cartPrice * item.skuNum }}</div>
      <div><a href="javascript:;" @click="removeshopcart(item.skuId)">删除</a><a href="javascript:;">移到收藏</a></div>
    </div>
    <div class="bottom">
      <div class="commit">
        <div class="left">
          <input type="checkbox" :checked="isallchecksd && cartInfoList.length > 0" id="aa" @change="choseall($event.target.checked)" /><label for="aa">全选</label>
          <span @click="removechoosengood">删除选中的商品</span>
          <span>移到我的关注</span>
          <span>清除下柜商品</span>
        </div>
        <div class="right">
          <span>已选择 {{ totalnum }} 件商品</span>
          <span
            >总价（不含运费） ： <i>{{ totalprice }}</i></span
          >
        </div>
      </div>
      <div class="buy" @click="gotrade">结算</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  methods: {
    getData() {
      this.$store.dispatch('getShopCartList')
    },
    // 修改产品个数,使用lodash节流方法，防止-1点击过快出现负数
    handler: throttle(async function (type, disnum, item) {
      switch (type) {
        case 'add':
          disnum = 1
          break
        case 'minus':
          if (item.skuNum > 1) {
            disnum = -1
          } else {
            disnum = 0
          }
          break
        case 'change':
          if (isNaN(disnum) || disnum < 1) {
            disnum = 0
          } else {
            disnum = parseInt(disnum) - item.skuNum
          }
          break
      }
      try {
        await this.$store.dispatch('addOrUpdateShopCart', { skuID: item.skuId, skuNum: disnum })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 500),
    // 删除购物车中的商品
    async removeshopcart(skuId) {
      try {
        await this.$store.dispatch('RemoveShopCart', skuId)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改商品状态
    async changegoodstate(e, skuId) {
      try {
        await this.$store.dispatch('Changeshopcart', { skuID: skuId, isChecked: e.target.checked === true ? 1 : 0 })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除购物车中所有被选中的商品
    async removechoosengood() {
      try {
        await this.$store.dispatch('deletellshopcart')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 全选购物车中的物品
    async choseall(allcheck) {
      try {
        await this.$store.dispatch('ChooseAll', allcheck)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 跳转到交易页面
    gotrade() {
      this.$router.push('/trade')
    }
  },
  computed: {
    ...mapGetters(['cartInfoList']),
    // 计算商品的总价
    totalprice() {
      let sum = 0
      this.cartInfoList.forEach((item) => {
        sum = sum + item.cartPrice * item.skuNum
      })
      return sum
    },
    // 计算选中的商品总数
    totalnum() {
      let sum = 0
      this.cartInfoList
        .filter((item) => item.isChecked === 1)
        .forEach((element) => {
          sum = sum + element.skuNum
        })
      return sum
    },
    // 判断是否全部勾选
    isallchecksd() {
      return this.cartInfoList.every((item) => item.isChecked === 1)
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.shopcart {
  width: 1200px;
  margin: 0 auto;
  .title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 5px 10px;
    background-color: whitesmoke;
    i {
      display: inline-block;
      width: 150px;
      height: 30px;
      font-style: normal;

      font-size: 14px;
      line-height: 30px;
    }
    .im {
      width: 430px;
    }
  }
  .goods {
    display: flex;
    border: 1px solid grey;
    padding: 5px 10px;
    div {
      width: 150px;
      font-size: 12px;
    }
    .im {
      width: 430px;
      display: flex;
      img {
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-right: 10px;
      }
      span {
        display: inline-block;
        width: 360px;
        line-height: 18px;
      }
    }
    .list4 {
      display: flex;
      input {
        width: 40px;
        height: 20px;
        text-align: center;
        border: 1px solid grey;
      }
      button {
        width: 20px;
        height: 20px;
        line-height: 14px;
        text-align: center;
      }
    }
  }
  .bottom {
    display: flex;
    margin-bottom: 40px;
    margin-top: 40px;
    .commit {
      display: flex;
      flex: 1;
      padding: 5px 10px;
      border: 1px solid grey;
      font-size: 14px;
      height: 40px;
      .left {
        label {
          margin-right: 10px;
        }
        input {
          // 复选框和文字对齐
          vertical-align: middle;
        }
        span {
          margin-right: 10px;
        }
      }
      .right {
        margin-left: 300px;
        span {
          margin-right: 10px;
          i {
            color: red;
            font-style: normal;
          }
        }
      }
    }
    .buy {
      width: 200px;
      height: 40px;
      background-color: red;
      line-height: 40px;
      color: white;
      text-align: center;
      cursor: pointer;
    }
    .buy:hover {
      color: gold;
    }
  }
}
</style>
