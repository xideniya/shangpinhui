<template>
  <div class="listcontainer">
    <!-- 轮播图区域 -->
    <Carsouel :list="bannerList"></Carsouel>
    <div class="right">
      <div class="expressnews">
        <div class="header">
          <span class="fast">尚品汇快报</span>
          <span class="more">更多></span>
        </div>
        <ul>
          <li><span>[特惠]</span>备战开学季 全民半价购数码</li>
          <li><span>[公告]</span>备战开学季 全民半价购数码</li>
          <li><span>[特惠]</span>备战开学季 全民半价购数码</li>
          <li><span>[公告]</span>备战开学季 全民半价购数码</li>
          <li><span>[特惠]</span>备战开学季 全民半价购数码</li>
        </ul>
      </div>
      <div class="classification">
        <ul>
          <li><i class="m1"></i><span>话费</span></li>
          <li><i class="m2"></i><span>机票</span></li>
          <li><i class="m3"></i><span>电影票</span></li>
          <li><i class="m4"></i><span>游戏</span></li>
          <li><i class="m5"></i><span>彩票</span></li>
          <li><i class="m6"></i><span>加油站</span></li>
          <li><i class="m7"></i><span>酒店</span></li>
          <li><i class="m8"></i><span>火车票</span></li>
          <li><i class="m9"></i><span>众筹</span></li>
          <li><i class="m10"></i><span>理财</span></li>
          <li><i class="m11"></i><span>礼品卡</span></li>
          <li><i class="m12"></i><span>白条</span></li>
        </ul>
      </div>
      <div class="ads">
        <img src="./images/ad1.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ListContainer',
  computed: {
    // 轮播图数据
    ...mapState({
      bannerList: (state) => state.home.bannerList
    })
  },
  mounted() {
    // 派发action 通过vuex发起Ajax 请求，将数据存储在仓库中
    this.$store.dispatch('getBannerList')
  }
}
</script>

<style lang="less" scoped>
.listcontainer {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  padding-left: 205px;
  .right {
    margin-left: 11px;
    width: 252px;
    height: 455px;
    border: 1px solid gray;
    .expressnews {
      .header {
        height: 20px;
        margin: 10px 5px 5px 5px;
        font-size: 15px;
        border-bottom: 1px solid grey;
        .fast {
          margin-right: 115px;
          font-weight: 700;
        }
        .more {
          font-size: 14px;
        }
      }
      ul {
        height: 140px;
        font-size: 12px;
        line-height: 25px;
        margin-left: 3px;
        li {
          span {
            font-weight: 700;
            margin-right: 5px;
          }
        }
      }
    }
    .classification {
      ul {
        display: flex;
        flex-wrap: wrap;
        width: 250px;
        height: 195px;
        li {
          width: 25%;
          height: 64px;
          border: 1px solid grey;
          span {
            display: block;
            font-size: 12px;
            text-align: center;
          }
          i {
            display: block;
            width: 61px;
            height: 40px;
            background-image: url('./images/icons.png');
          }
          .m1 {
            background-position: -0px -5px;
          }
          .m2 {
            background-position: -65px -5px;
          }
          .m3 {
            background-position: -130px -5px;
          }
          .m4 {
            background-position: -190px -5px;
          }
          .m5 {
            background-position: -0px -75px;
          }
          .m6 {
            background-position: -65px -75px;
          }
          .m7 {
            background-position: -130px -75px;
          }
          .m8 {
            background-position: -190px -75px;
          }
          .m9 {
            background-position: 0px -148px;
          }
          .m10 {
            background-position: -65px -148px;
          }
          .m11 {
            background-position: -130px -148px;
          }
          .m12 {
            background-position: -190px -148px;
          }
        }
      }
    }
    .ads {
      margin-top: 8px;
    }
  }
  .swiper-container {
    margin-left: 10px;
  }
}
</style>
