<template>
  <div class="zoom">
    <img class="show" :src="imgObj.imgUrl" alt="" />
    <!-- 触发鼠标移动事件的div,浮动于盒子上方 -->
    <div class="event" @mousemove="handler" ref="event"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" alt="" ref="bigimg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: ['skuImageList'],
  data() {
    return {
      imgindex: 0
    }
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.imgindex] || {}
    }
  },
  methods: {
    handler(e) {
      const mask = this.$refs.mask
      const event = this.$refs.event
      const bigimg = this.$refs.bigimg
      let left = e.offsetX - mask.offsetWidth / 2
      let top = e.offsetY - mask.offsetHeight / 2
      // 约束范围
      if (left < 0) {
        left = 0
      }
      if (top < 0) {
        top = 0
      }
      if (left > event.offsetWidth - mask.offsetWidth) {
        left = event.offsetWidth - mask.offsetWidth
      }
      if (top > event.offsetHeight - mask.offsetHeight) {
        top = event.offsetHeight - mask.offsetHeight
      }
      // 修改属性值
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      bigimg.style.left = -left * 2 + 'px'
      bigimg.style.top = -top * 2 + 'px'
    }
  },
  mounted() {
    // 轮播传来的索引值
    this.$bus.$on('getindex', (index) => {
      this.imgindex = index
    })
  }
}
</script>

<style lang="less" scoped>
.zoom {
  position: relative;
  width: 400px;
  height: 400px;
  .show {
    width: 400px;
    height: 400px;
  }
  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }
  .big {
    display: none;
    position: absolute;
    overflow: hidden;
    width: 402px;
    height: 402px;
    z-index: 999;
    left: 401px;
    top: 0px;
    border: 1px solid;
    img {
      width: 200%;
      height: 200%;
      max-width: 200%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .mask {
    display: none;
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: green;
    top: 0px;
    left: 0px;
    opacity: 0.2;
  }
}
.zoom:hover {
  .big {
    display: block;
  }
  .mask {
    display: block;
  }
}
</style>
