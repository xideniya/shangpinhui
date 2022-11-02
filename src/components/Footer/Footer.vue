<template>
  <div class="footer-container">
    <div class="footlist">
      <div class="list">
        <h5>购物指南</h5>
        <ul>
          <li>购物流程</li>
          <li>会员介绍</li>
          <li>生活旅行/团购</li>
          <li>常见问题</li>
          <li>购物指南</li>
        </ul>
      </div>
      <div class="list">
        <h5>配送方式</h5>
        <ul>
          <li>上门自提</li>
          <li>211限时达</li>
          <li>配送服务查询</li>
          <li>配送费收取标准</li>
          <li>海外配送</li>
        </ul>
      </div>
      <div class="list">
        <h5>支付方式</h5>
        <ul>
          <li>货到付款</li>
          <li>在线支付</li>
          <li>分期付款</li>
          <li>邮局汇款</li>
          <li>公司转账</li>
        </ul>
      </div>
      <div class="list">
        <h5>售后服务</h5>
        <ul>
          <li>售后政策</li>
          <li>价格保护</li>
          <li>退款说明</li>
          <li>返修/退换货</li>
          <li>取消订单</li>
        </ul>
      </div>
      <div class="list">
        <h5>特色服务</h5>
        <ul>
          <li>夺宝岛</li>
          <li>DIY装机</li>
          <li>延保服务</li>
          <li>尚品汇E卡</li>
          <li>尚品汇通信</li>
        </ul>
      </div>
      <div class="list">
        <h5>帮助中心</h5>
        <img src="./images/wx_cz.jpg" alt="" />
      </div>
    </div>
    <div class="copyright">
      <div>
        <ul>
          <li>关于我们</li>
          <li>联系我们</li>
          <li>商家入驻</li>
          <li>营销中心</li>
          <li>友情链接</li>
        </ul>
      </div>
      <p>地址：北京市昌平区宏福科技园综合楼6层</p>
      <p>京ICP备19006430号</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.footer-container {
  background-color: LightSteelBlue;
  padding-top: 20px;
  padding-bottom: 20px;
  .footlist {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    margin: 0 auto 15px;
    .list {
      h5 {
        font-weight: 700;
        line-height: 30px;
      }
      ul {
        font-size: 13px;
        line-height: 20px;
      }
    }
  }
  .copyright {
    width: 1200px;
    margin: 10px auto 0;
    font-size: 13px;
    div {
      margin: 0 auto 10px;
      width: 460px;
      ul {
        text-align: center;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        li {
          height: 20px;
          border-right: 1px solid black;
          padding-right: 22px;
          line-height: 20px;
        }
      }
    }
    p {
      text-align: center;
    }
  }
}
</style>
