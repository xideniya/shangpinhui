<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id">
        <img :src="item.imgUrl" alt="" @click="changeisactive(index)" :class="{ active: index === isactive }" />
      </div>
    </div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  props: ['skuImageList'],
  data() {
    return {
      isactive: 0
    }
  },
  methods: {
    changeisactive(index) {
      this.isactive = index
      // 通知兄弟组件zoom索引变化
      this.$bus.$emit('getindex', index)
    }
  },
  watch: {
    skuImageList: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiper = new Swiper('.swiper-container', {
            // 同时显示3张图片
            slidesPerView: 3,
            // 滑动一次切换1张图片
            slidesPerGroup: 1,
            direction: 'horizontal', // 垂直切换选项
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 40px;
  .swiper-wrapper {
    .swiper-slide {
      img {
        width: 40px;
        height: 40px;
      }
      .active {
        border: 2px solid #f60;
      }
    }
  }
}
</style>
