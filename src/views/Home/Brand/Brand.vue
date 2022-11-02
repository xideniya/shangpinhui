<template>
  <div class="brand">
    <ul>
      <li><img src="./images/brand_03.png" alt="" /></li>
      <li><img src="./images/brand_05.png" alt="" /></li>
      <li><img src="./images/brand_07.png" alt="" /></li>
      <li><img src="./images/brand_09.png" alt="" /></li>
      <li><img src="./images/brand_11.png" alt="" /></li>
      <li><img src="./images/brand_13.png" alt="" /></li>
      <li><img src="./images/brand_15.png" alt="" /></li>
      <li><img src="./images/brand_17.png" alt="" /></li>
      <li><img src="./images/brand_19.png" alt="" /></li>
      <li><img src="./images/brand_21.png" alt="" /></li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.brand {
  width: 1200px;
  margin: 0 auto;
  ul {
    display: flex;
    justify-content: space-between;
    background-color: #f7f7f7;
    padding: 10px 0;
    margin-bottom: 15px;
    li {
      display: flex;
      height: 60px;
      padding: 10px 0px;
      border-right: 1px solid lightgrey;
      img {
        align-items: center;
        display: block;
        margin: 0 auto;
      }
    }
    li:nth-last-child(1) {
      border-right: 0;
    }
  }
}
</style>
