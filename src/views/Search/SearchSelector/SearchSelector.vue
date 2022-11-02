<template>
  <div class="banner">
    <div class="brand">
      <div class="left">品牌</div>
      <div class="logo">
        <ul>
          <li v-for="item in trademarkList" :key="item.tmId" @click="trademarkhandler(item)">{{ item.tmName }}</li>
        </ul>
        <div class="more"><a href="" class="multiplechoice">多选</a> <a href="">更多</a></div>
      </div>
    </div>
    <div class="net" v-for="item1 in attrsList" :key="item1.attrId">
      <div class="left">{{ item1.attrName }}</div>
      <div class="right">
        <ul>
          <li v-for="(item2, index) in item1.attrValueList" :key="index" @click="attrinfo(item1, item2)">{{ item2 }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SearchSelector',
  computed: {
    ...mapGetters(['trademarkList', 'attrsList'])
  },
  methods: {
    // 品牌的处理函数
    trademarkhandler(item) {
      // 和父组件search通信
      this.$emit('trademarkinfo', item)
    },
    // 属性的处理函数
    attrinfo(item1, item2) {
      this.$emit('attrinfo', item1, item2)
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  width: 1200px;
  margin: 0 auto;
  .brand {
    display: flex;
    border: 1px solid grey;
    .left {
      width: 125px;
      background-color: whitesmoke;
      padding: 15px 0 0 40px;
      font-size: 12px;
      color: #333;
    }
    .logo {
      flex: 1;
      display: flex;
      padding: 10px;
      ul {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        li {
          width: 107px;
          height: 54px;
          line-height: 54px;
          font-size: 15px;
          text-align: center;
          margin: -1px -1px 0 0;
          border: 1px solid #e4e4e4;
          cursor: pointer;
        }
      }
      .more {
        width: 80px;
        padding-left: 16px;
        a {
          display: inline-block;
          font-size: 12px;
          padding: 2px;
        }
        .multiplechoice {
          border: 1px solid grey;
        }
      }
    }
  }
  .net {
    display: flex;
    border: 1px solid grey;
    .left {
      width: 125px;
      background-color: whitesmoke;
      height: 40px;
      padding-left: 40px;
      padding-top: 15px;
      font-size: 12px;
    }
    .right {
      padding-top: 15px;
      padding-left: 10px;
      ul {
        display: flex;

        li {
          font-size: 12px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
