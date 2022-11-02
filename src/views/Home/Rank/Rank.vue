<template>
  <div class="rank">
    <div class="top">
      <a href="" class="active">
        <i></i>
        <p>热卖排行</p>
      </a>
      <a href="">
        <i></i>
        <p>特价排行</p>
      </a>
      <a href="">
        <i></i>
        <p>新品排行</p>
      </a>
    </div>
    <div class="bottom">
      <div class="item">
        <a href="#"><img src="./images/1.jpg" alt="" /></a>
        <a href="#">【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机</a>
        <span>定金：¥100.00</span>
      </div>
      <div class="item">
        <a href="#"><img src="./images/1.jpg" alt="" /></a>
        <a href="#">【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机</a>
        <span>定金：¥100.00</span>
      </div>
      <div class="item">
        <a href="#"><img src="./images/1.jpg" alt="" /></a>
        <a href="#">【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机</a>
        <span>定金：¥100.00</span>
      </div>
      <div class="item">
        <a href="#"><img src="./images/1.jpg" alt="" /></a>
        <a href="#">【官网价直降1100】Apple iPhone 8 Plus 256GB 银色 移动联通电信4G手机</a>
        <span>定金：¥100.00</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.rank {
  width: 1200px;
  margin: 0 auto;
  .top {
    display: flex;
    justify-content: space-between;
    width: 312px;
    height: 78px;
    margin: 5px auto 10px;
    a {
      display: block;
    }
    i {
      display: block;
      width: 35px;
      height: 35px;
      margin: 0 auto;
      background-image: url('./images/bg0.png');
    }
    p {
      margin-top: 10px;
      color: black;
    }
    p:hover {
      color: #4169e1;
    }
    // 被选中时的样式
    .active {
      i {
        background-position-x: -34px;
      }
      p {
        color: #ff4500;
      }
      p:hover {
        color: #4169e1;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    .item {
      width: 271px;
      height: 330px;
      border: 1px solid red;
      a {
        display: block;
        margin: 0 auto;
        width: 200px;
        font-size: 12px;
        color: black;
        line-height: 15px;
        img {
          width: 200px;
          height: 200px;
        }
      }
      a:nth-child(2) {
        margin-top: 10px;
      }
      span {
        display: block;
        width: 200px;
        margin: 25px auto 0;
        font-size: 21px;
        color: red;
      }
    }
  }
}
</style>
