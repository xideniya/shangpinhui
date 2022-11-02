<template>
  <div>
    <p class="msg">订单提交成功，请您及时付款，以便尽快为您发货~~</p>
    <p>请您在4想小时内完成支付，超时订单自动取消，订单号是 {{ $route.query.orderId }}</p>
    <div class="money">应付金额￥{{ payinfo.totalFee }}</div>
    <p class="know">重要说明： 尚品汇商城支付平台目前支持支付宝支付方式。 其它支付渠道正在调试中，敬请期待。 为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。 支付宝账户信息：（很重要，请保存！！！） 支付帐号：11111111 密码：111111 支付密码：111111</p>
    <button @click="open">现在支付</button>
  </div>
</template>

<script>
// 引入qrcode，生成二维码
import QRCode from 'qrcode'
export default {
  name: 'Pay',
  data() {
    return {
      payinfo: {},
      timer: null,
      code: ''
    }
  },
  methods: {
    async getPayInfo() {
      const result = await this.$API.reqPayInfo(this.$route.query.orderId)
      if (result.code === 200) {
        this.payinfo = result.data
      }
    },
    async open() {
      // 生成二维码
      const url = await QRCode.toDataURL(this.payinfo.codeUrl)
      this.$alert(`<img src=${url} />`, '请你微信支付', {
        dangerouslyUseHTMLString: true,
        center: true,
        showCancelButton: true,
        showClose: false,
        cancelButtonText: '支付遇见问题',
        confirmButtonText: '已支付成功',
        beforeClose: (action, instance, done) => {
          if (action === 'cancel') {
            alert('请联系管理员')
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
            // 关闭弹出框
            done()
          }
          if (action === 'confirm') {
            // 为了不花钱，去掉条件
            // if (this.code === 200) {
            clearInterval(this.timer)
            this.timer = null
            done()
            this.$router.push('/paysuccess')
            // }
          }
        }
      })
      // 需要知道支付成功还是失败，一直询问服务器
      if (!this.timer) {
        this.timer = setInterval(async () => {
          const result = await this.$API.reqPayStatus(this.$route.query.orderId)
          if (result.code === 200) {
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
            // 保存支付成功的code
            this.code = result.code
            // 关闭弹出框
            this.$msgbox.close()
            // 跳转到下一路由
            this.$router.push('/paysuccess')
          }
        }, 1500)
      }
    }
  },
  mounted() {
    this.getPayInfo()
  }
}
</script>

<style lang="less" scoped>
div {
  width: 1200px;
  margin: 0 auto;
  .money {
    color: red;
    margin: 15px 0;
  }
  p {
    margin: 15px 0;
  }
  .msg {
    color: green;
  }
  .know {
    border: 2px solid red;
    padding: 5px;
  }
  button {
    display: block;
    width: 200px;
    height: 50px;
    background-color: red;
    color: white;
    border: 0;
    margin: 20px auto;
    cursor: pointer;
  }
}
</style>
