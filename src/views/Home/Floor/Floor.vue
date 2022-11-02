<template>
  <div class="floor">
    <div class="title">
      <div class="left">
        <h5>{{ list.name }}</h5>
      </div>
      <div class="right">
        <ul>
          <li v-for="(item, index) in list.navList" :key="index">
            <a href="javascript:;">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="goods">
      <div class="one">
        <ul>
          <li v-for="(item, index) in list.keywords" :key="index">{{ item }}</li>
        </ul>
        <div>
          <img :src="list.imgUrl" alt="" />
        </div>
      </div>
      <div class="two">
        <Carsouel :list="list.carouselList"></Carsouel>
      </div>
      <div class="three">
        <div class="left">
          <div><img :src="list.recommendList[0]" alt="" /></div>
          <div><img :src="list.recommendList[1]" alt="" /></div>
        </div>
        <div class="middle">
          <div><img :src="list.bigImg" alt="" /></div>
        </div>
        <div class="right">
          <div><img :src="list.recommendList[2]" alt="" /></div>
          <div><img :src="list.recommendList[3]" alt="" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  mounted() {}
}
</script>

<style lang="less" scoped>
.floor {
  width: 1200px;
  margin: 15px auto 20px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 2px solid red;
    .left {
      height: 20px;
      h5 {
        color: red;
        line-height: 20px;
        font-weight: 700;
      }
    }
    .right {
      ul {
        display: flex;
        li {
          height: 20px;
          padding-left: 8px;
          padding-right: 8px;
          font-size: 12px;
          line-height: 20px;
          border-right: 1px solid #d3d3d3;
          a {
            color: black;
          }
          .active {
            color: red;
          }
          a:hover {
            color: blue;
          }
        }
      }
    }
  }
  .goods {
    display: flex;
    .one {
      ul {
        display: flex;
        flex-wrap: wrap;
        width: 187px;
        margin-bottom: 13px;
        li {
          width: 80px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 12px;
          border-bottom: 1px solid lightgrey;
          margin: 0 4px;
        }
      }
      div {
        height: 230px;
        width: 187px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .two {
      height: 364px;
      .swiper-container {
        width: 329px;
      }
    }
    .three {
      display: flex;
      .left {
        div {
          border-bottom: 1px solid lightgrey;
        }
      }
      .middle {
        div {
          padding-bottom: 2px;
          border-left: 1px solid lightgrey;
          border-right: 1px solid lightgrey;
          border-bottom: 1px solid lightgrey;
        }
      }
      .right {
        div {
          border-bottom: 1px solid lightgrey;
        }
      }
    }
  }
}
</style>
