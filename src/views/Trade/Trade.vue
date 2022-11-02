<template>
  <div class="trade">
    <h5>填写并核对订单信息</h5>
    <div class="order">
      <p>收件人信息</p>
      <div class="info" v-for="item in address" :key="item.id" @click="changedefault(item, address)">
        <div class="name" :class="{ active: item.isDefault === '1' }">{{ item.consignee }}</div>
        <div class="address">{{ item.fullAddress }} {{ item.phoneNum }}</div>
        <div class="default" v-if="item.isDefault === '1'">默认地址</div>
      </div>
      <div class="goodlist">
        <h5>商品清单</h5>
        <div class="good" v-for="item in detailArrayList" :key="item.skuId">
          <img :src="item.imgUrl" alt="" />
          <div class="detail">{{ item.skuName }}</div>
          <div class="price">￥{{ item.orderPrice }}.00</div>
          <div class="count">{{ item.skuNum }}</div>
          <div class="state">有货</div>
        </div>
      </div>
      <h5>买家留言</h5>
      <textarea placeholder="建议留言前先与商家沟通确认" v-model="message"></textarea>
    </div>
    <div class="money clearfix">
      <ul>
        <li>
          <span>{{ tradelist.totalNum }}件商品，总商品金额:</span><i>¥{{ tradelist.originalTotalAmount }}</i>
        </li>
        <li><span>返现:</span><i>¥0.00</i></li>
        <li><span>运费:</span><i>¥0.00</i></li>
      </ul>
    </div>
    <div class="bottom clearfix">
      <ul>
        <li>应付金额: ¥{{ tradelist.totalAmount }}.00</li>
        <li>寄送至: {{ defaultaddress.fullAddress }} {{ defaultaddress.phoneNum }} 收货人：{{ defaultaddress.consignee }}</li>
      </ul>
    </div>
    <div class="clearfix submit"><a @click="gopay">提交订单</a></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Trade',
  data() {
    return {
      // 用户留言
      message: ''
    }
  },
  computed: {
    ...mapState({
      address: (state) => state.trade.address,
      tradelist: (state) => state.trade.tradelist,
      orderId: (state) => state.trade.orderId
    }),
    // 默认地址
    defaultaddress() {
      // find返回的是一个符合条件对象，filter返回的是数组
      return this.address.find((item) => item.isDefault === '1') || {}
    },
    detailArrayList() {
      return this.tradelist.detailArrayList
    }
  },
  methods: {
    // 提交订单，跳转到支付页面
    async gopay() {
      const orderobj = {}
      orderobj.tradeNo = this.tradelist.tradeNo
      orderobj.data = {
        consignee: this.defaultaddress.consignee,
        consigneeTel: this.defaultaddress.phoneNum,
        deliveryAddress: this.defaultaddress.fullAddress,
        paymentWay: 'ONLINE',
        orderComment: this.message,
        orderDetailList: this.detailArrayList
      }
      try {
        await this.$store.dispatch('SubmitOrder', orderobj)
        // 路由跳转 并传递参数
        this.$router.push('/pay?orderId=' + this.orderId)
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改默认地址
    changedefault(item, address) {
      address.forEach((element) => {
        element.isDefault = '0'
      })
      item.isDefault = '1'
    }
  },
  mounted() {
    this.$store.dispatch('Getuseraddress')
    this.$store.dispatch('Gettradelist')
  }
}
</script>

<style lang="less" scoped>
.trade {
  width: 1200px;
  margin: 0 auto;
  .order {
    padding: 10px;
    width: 100%;
    border: 1px solid grey;
    margin-top: 20px;
    .info {
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid lightgrey;
      font-size: 14px;
      .name {
        width: 90px;
        margin-right: 30px;
        border: 1px solid grey;
        padding: 5px 10px;
      }
      .active {
        border: 1px solid red;
        background-image: url('./images/choosed.png');
        background-repeat: no-repeat;
        background-position: 76px 10px;
      }
      .address {
        padding: 5px 10px;
        margin-right: 15px;
      }
      .default {
        padding: 2px;
        background-color: grey;
        line-height: 22px;
        color: white;
      }
    }
    .goodlist {
      width: 90%;
      padding: 10px;
      margin: 10px auto;
      background-color: lightpink;
      h5 {
        margin-bottom: 20px;
      }
      .good {
        display: flex;
        font-size: 12px;
        margin-bottom: 20px;
        img {
          width: 100px;
          height: 100px;
          margin-right: 15px;
        }
        div {
          margin-right: 15px;
          line-height: 20px;
        }
        .price {
          font-weight: 700;
          font-size: 14px;
          color: red;
        }
      }
    }
    textarea {
      width: 800px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
  .money {
    ul {
      float: right;
      li {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        span {
          padding-right: 30px;
        }
        i {
          font-style: normal;
        }
      }
    }
  }
  .bottom {
    background-color: whitesmoke;
    padding: 10px 5px;
    font-size: 12px;
    ul {
      float: right;
      li {
        margin: 10px 0;
      }
    }
  }
  .submit {
    margin: 10px 0;
    a {
      float: right;
      width: 200px;
      height: 50px;
      text-align: center;
      background-color: red;
      line-height: 50px;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
