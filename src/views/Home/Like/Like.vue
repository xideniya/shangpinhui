<template>
  <div class="like">
    <div class="top">
      <div>猜你喜欢</div>
      <a href="#">换一换</a>
    </div>
    <ul>
      <li>
        <a href="#">
          <img src="./images/like_01.png" alt="" />
          <div>
            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
            <span>¥116.00</span>
          </div></a
        >
      </li>
      <li>
        <a href="#">
          <img src="./images/like_02.png" alt="" />
          <div>
            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
            <span>¥116.00</span>
          </div></a
        >
      </li>
      <li>
        <a href="#">
          <img src="./images/like_03.png" alt="" />
          <div>
            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
            <span>¥116.00</span>
          </div></a
        >
      </li>
      <li>
        <a href="#">
          <img src="./images/like_01.png" alt="" />
          <div>
            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
            <span>¥116.00</span>
          </div></a
        >
      </li>
      <li>
        <a href="#">
          <img src="./images/like_02.png" alt="" />
          <div>
            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
            <span>¥116.00</span>
          </div></a
        >
      </li>
      <li>
        <a href="#">
          <img src="./images/like_03.png" alt="" />
          <div>
            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
            <span>¥116.00</span>
          </div></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.like {
  width: 1200px;
  margin: 0 auto;
  .top {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    height: 20px;
    line-height: 20px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    border: 1px solid #c0c0c0;
    padding-left: 5px;
    padding-right: 5px;
    overflow: hidden;
    li {
      a {
        div {
          border-right: 1px solid #c0c0c0;
          padding-left: 5px;
          padding-right: 5px;
          p {
            font-size: 12px;
            color: black;
            line-height: 15px;
            margin-top: 15px;
            margin-bottom: 10px;
          }
          span {
            display: block;
            margin-bottom: 10px;
            color: red;
            font-size: 16px;
          }
        }
        img {
          display: block;
          margin: 0 auto;
          transition: all 0.3s;
          opacity: 1;
        }
        img:hover {
          transform: scale(1.1);
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
