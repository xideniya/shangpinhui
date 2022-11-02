<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id"><img :src="carousel.imgUrl" alt="" /></div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carsouel',
  props: ['list'],
  watch: {
    // 监听轮播图bannerList数据的变化 但是无法保证v-for循环完成，页面结构完整
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          // 执行回调时，保证服务器数据回来了，v-for执行完毕了
          // eslint-disable-next-line no-unused-vars
          var mySwiper = new Swiper('.swiper-container', {
            // autoplay: {
            //   disableOnInteraction: false
            // },
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar'
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
