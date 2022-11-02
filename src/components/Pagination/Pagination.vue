<template>
  <div class="pages">
    <ul>
      <button :disabled="pageNo === 1" @click="$emit('getpageno', pageNo - 1)">«上一页</button>
      <li v-if="startNumAndEndNum.start > 1" @click="$emit('getpageno', 1)">1</li>
      <li v-if="startNumAndEndNum.start > 2" @click="$emit('getpageno', 2)">...</li>
      <!-- 中间部分 -->
      <li v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start" @click="$emit('getpageno', page)" :class="{ active: pageNo == page }">{{ page }}</li>
      <li v-if="startNumAndEndNum.end < totalPage - 1">...</li>
      <li v-if="startNumAndEndNum.end < totalPage" @click="$emit('getpageno', totalPage)" :class="{ active: pageNo == totalPage }">{{ totalPage }}</li>
      <button :disabled="pageNo === totalPage" @click="$emit('getpageno', pageNo + 1)">下一页»</button>
      <p>共{{ total }}条</p>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'continues', 'total'],
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },

    // 计算出连续页码的起始数字和结束数字
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this
      let start = 0
      let end = 0
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pages {
  width: 1200px;
  margin: 30px auto 30px;
  padding-left: 300px;
  ul {
    display: flex;
    button {
      margin-right: 5px;
    }
    li {
      display: block;
      padding: 5px 10px;
      height: 30px;
      border: 1px solid grey;
      text-align: center;
      line-height: 20px;
      margin-right: 10px;
      cursor: pointer;
    }
    .active {
      border: 0;
      background-color: skyblue;
    }
    p {
      display: block;
      padding: 5px 10px;
      height: 30px;
    }
  }
}
</style>
