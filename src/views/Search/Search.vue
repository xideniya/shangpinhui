<template>
  <div class="search">
    <TypeNav></TypeNav>
    <div class="borders"></div>
    <!-- 面包屑区域 -->
    <div class="breadcrumb">
      <ul>
        <li class="all">全部结果</li>
        <!-- 分类的面包屑 -->
        <li v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removecategoryname">x</i></li>
        <!-- 关键字的面包屑 -->
        <li v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removekeyword">x</i></li>
        <!-- 品牌的面包屑 -->
        <li v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i @click="removetrademark">x</i></li>
        <!-- 售卖属性的面包屑,循环遍历 -->
        <li v-for="(item, index) in searchParams.props" :key="index">{{ item.split(':')[1] }}<i @click="removeprop(index)">x</i></li>
      </ul>
    </div>
    <SearchSelector @trademarkinfo="trademarkinfo" @attrinfo="attrinfo"></SearchSelector>
    <div class="title">
      <ul>
        <li :class="{ active: isOne }" @click="changeOrder('1')">综合<span v-show="isOne" class="iconfont" :class="{ 'icon-jiantou_xiangxia': isDesc, 'icon-jiantou_xiangshang': isAsc }"></span></li>
        <li :class="{ active: isTwo }" @click="changeOrder('2')">价格<span v-show="isTwo" class="iconfont" :class="{ 'icon-jiantou_xiangxia': isDesc, 'icon-jiantou_xiangshang': isAsc }"></span></li>
      </ul>
    </div>
    <div class="goods">
      <div class="item" v-for="item in goodsList" :key="item.id">
        <!-- 图片懒加载 -->
        <img v-lazy="item.defaultImg" alt="" @click="goDetail(item.id)" />
        <div class="price">
          ¥ <span>{{ item.price }}.00</span>
        </div>
        <div class="msg" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ item.title }}</div>
        <div class="evaluate">已有<span>2000</span>人评价</div>
        <div class="operate">
          <a href="" class="shoppingcar">加入购物车</a>
          <a href="" class="collect">收藏</a>
        </div>
      </div>
    </div>
    <!-- 分页器组件 -->
    <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getpageno="getpageno"></Pagination>
  </div>
</template>

<script>
import SearchSelector from '@/views/Search/SearchSelector/SearchSelector.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        // 初始状态 综合降序
        order: '1:desc',
        // 当前是第几页
        pageNo: 1,
        // 每一页展示的数据个数
        pageSize: 10,
        // 售卖属性
        props: [],
        // 品牌
        trademark: ''
      }
    }
  },
  computed: {
    // getters没有划分模块 没有【home search]之分
    ...mapGetters(['goodsList']),
    ...mapState({
      total: (state) => state.search.searchlist.total
    }),
    // 判断是价格还是综合
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    // 判断是升序还是降序
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    }
  },
  methods: {
    // 把请求封装为函数，按需调用
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    removecategoryname() {
      // 写成undefined ，参数不会带给服务器，优化性能
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 地址栏也需要修改,跳转到search,不删除params参数
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    removekeyword() {
      this.searchParams.keyword = undefined
      this.getData()
      // 通知兄弟组件header清空keyWord
      this.$bus.$emit('clear')
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    // 移除品牌
    removetrademark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    trademarkinfo(item) {
      // 整理品牌字段参数
      this.searchParams.trademark = `${item.tmId}:${item.tmName}`
      // 再次发起请求
      this.getData()
    },
    // 收集平台属性的函数
    attrinfo(item1, item2) {
      // 按照接口文档整理数据
      const str = `${item1.attrId}:${item2}:${item1.attrName}`
      // 数组去重
      if (this.searchParams.props.indexOf(str) === -1) {
        this.searchParams.props.push(str)
        this.getData()
      }
    },
    // 删除面包屑中已选的商品属性
    removeprop(index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 点击改变排序
    changeOrder(flag) {
      // flag代表用户点击的是综合还是价格
      const orginorder = this.searchParams.order
      const originflag = orginorder.split(':')[0]
      const orginsort = orginorder.split(':')[1]
      let neworder = ''
      if (flag === originflag) {
        // 点的和原来相同，排序取反
        neworder = `${originflag}:${orginsort === 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点的和原来不同，切换种类并默认降序
        neworder = `${flag}:${'desc'}`
      }
      this.searchParams.order = neworder
      this.getData()
    },
    // 分页器组件向父组件传递参数当前的页数page
    getpageno(page) {
      this.searchParams.pageNo = page
      this.getData()
    },
    // 跳转到详情页
    goDetail(id) {
      this.$router.push({
        name: 'detail',
        params: { skuId: id }
      })
    }
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  mounted() {
    this.getData()
  },
  watch: {
    // 监听路由信息是否发生变化
    $route(newValue, oldValue) {
      // 请求参数置空
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .borders {
    border-top: 2px solid red;
  }

  .breadcrumb {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 20px;
    ul {
      display: flex;
      li {
        height: 20px;
        line-height: 16px;
        padding: 2px 2px;
        margin: 5px 5px;
        background-color: whitesmoke;
        font-size: 12px;
        i {
          font-style: normal;
          margin-left: 10px;
          margin-right: 5px;
          cursor: pointer;
        }
      }
      li:hover {
        color: skyblue;
      }
    }
    .all {
      background-color: #fff;
      color: grey;
    }
  }
  .title {
    width: 1200px;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 20px;
    ul {
      display: flex;
      border: 1px solid grey;
      background-color: whitesmoke;
      li {
        width: 54px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }
      .active {
        background-color: red;
        color: white;
      }
    }
  }
  .goods {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 240px;
      padding: 0 5px;
      img {
        width: 214px;
        height: 242px;
        margin: 0 auto;
        display: block;
      }
      .price {
        color: red;
        font-weight: 700;
        margin-bottom: 5px;
        span {
          font-weight: 700;
        }
      }
      .msg {
        height: 40px;
        width: 240px;
        font-size: 12px;
        line-height: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .evaluate {
        margin-bottom: 15px;
        span {
          color: darkblue;
        }
      }
      .operate {
        margin-bottom: 10px;
        .shoppingcar {
          display: inline-block;
          border: 1px solid red;
          font-size: 12px;
          margin-right: 15px;
          margin-left: 10px;
          width: 100px;
          height: 30px;
          padding: 5px;
          color: red;
          line-height: 18px;
          text-align: center;
        }
        .collect {
          display: inline-block;
          border: 1px solid grey;
          font-size: 12px;
          width: 100px;
          height: 30px;
          padding: 5px;
          color: grey;
          line-height: 18px;
          text-align: center;
        }
      }
    }
  }
}
</style>
