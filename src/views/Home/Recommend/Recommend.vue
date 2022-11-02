<template>
  <div class="recommend">
    <div class="clock">
      <img src="./images/clock.png" alt="" />
      <div>今日推荐</div>
    </div>
    <div><img src="./images/today01.png" alt="" /></div>
    <div><img src="./images/today02.png" alt="" /></div>
    <div><img src="./images/today03.png" alt="" /></div>
    <div><img src="./images/today04.png" alt="" /></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  .clock {
    background-color: #a0522d;
    // 某个子元素占满剩余宽度
    flex-grow: 1;
    div {
      margin: 15px auto 0px;
      text-align: center;
      color: white;
    }
    img {
      display: block;
      margin: 30px auto 0px;
    }
  }
}
</style>
