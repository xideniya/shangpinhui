<template>
  <div class="typenav-container">
    <div class="nav" @mouseleave="leaveIndex" @mouseenter="show = true">
      <h3>全部商品分类</h3>
      <transition name="navbar">
        <div class="navbar" @click="goSeearch" v-show="show">
          <div class="item" v-for="(c1, index) in categorylist" :key="c1.categoryId">
            <a href="javascript:;" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId" @mouseenter="changeindex(index)" :class="{ cur: currentIndex === index }">{{ c1.categoryName }}</a>
            <div class="secondlist" :style="{ display: index === currentIndex ? 'block' : 'none' }">
              <dl v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                <dt>
                  <a href="javascript:;" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                </dt>
                <dd v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                  <em>
                    <a href="javascript:;" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                  </em>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="title">
      <ul>
        <li><a href="#">服装城</a></li>
        <li><a href="#">美妆馆</a></li>
        <li><a href="#">超市</a></li>
        <li><a href="#">全球购</a></li>
        <li><a href="#">闪购</a></li>
        <li><a href="#">团购</a></li>
        <li><a href="#">有趣</a></li>
        <li><a href="#">秒杀</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入lodash全部功能
// import _ from 'lodash'
// 推荐按需引入需要的方法
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      // 存储用户移上哪一个一级分类
      currentIndex: -1,
      show: true
    }
  },
  methods: {
    // 使用lodash中的节流方法（引入全部功能）
    // changeindex: _.throttle(function (index) {
    //   this.currentIndex = index
    // }, 50),
    // 按需引入节流功能
    changeindex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    leaveIndex() {
      this.currentIndex = -1
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    goSeearch(e) {
      // 编程式导航+事件委托
      // 把子节点中的a标签，加上自定义属性data-categoryName 其他子节点没有
      const element = e.target
      // 节点有一个dataset属性，可以获取节点的自定义属性和属性值，会把小驼峰变成小写
      const { categoryname, category1id, category2id, category3id } = element.dataset
      if (categoryname) {
        // 整理路由的跳转方式
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 整合到一个对象
        location.query = query
        // 如果有params,一起传递过去
        if (this.$route.params) {
          location.params = this.$route.params
        }
        // 路由跳转
        this.$router.push(location)
      }
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的我是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categorylist: (state) => {
        return state.home.categorylist
      }
    })
  },
  mounted() {
    if (this.$route.path !== '/home') {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.typenav-container {
  width: 1200px;
  margin: 0 auto;
  .title {
    height: 45px;
    padding-left: 215px;
    ul {
      display: flex;
      height: 45px;
      li {
        margin-right: 50px;
        font-size: 16px;
        a {
          line-height: 45px;
          color: black;
        }
        a:hover {
          border-bottom: 1px solid black;
        }
      }
    }
  }
  .nav {
    position: relative;
    float: left;
    h3 {
      margin-right: 20px;
      width: 205px;
      height: 45px;
      background-color: red;
      line-height: 45px;
      text-align: center;
      color: white;
    }
    .navbar {
      position: absolute;
      height: 455px;
      // 不要让动画效果时文字先出来

      background-color: #f8f8ff;

      .item {
        a {
          display: block;
          width: 205px;
          height: 26px;
          padding-top: 4px;
          padding-bottom: 4px;
          padding-left: 5px;
          color: black;
          font-size: 12px;
          line-height: 18px;
        }
        .secondlist {
          position: absolute;
          display: none;
          padding-top: 5px;
          padding-left: 5px;
          width: 734px;
          height: 455px;
          background: #f5f5f5;
          left: 205px;
          border: 1px solid #ddd;
          top: 0px;
          z-index: 9999 !important;
          dl {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 5px;
            dt {
              a {
                width: 100%;
                font-weight: 700;
                font-size: 12px;
                line-height: 18px;
                margin-right: 5px;
              }
            }
            dd {
              padding-top: 4px;
              padding-bottom: 4px;
              margin-left: 5px;
              margin-right: 5px;
              margin-bottom: 5px;

              em {
                font-style: normal;
                display: block;
                a {
                  display: block;
                  padding: 0;
                  width: 100%;
                  height: 18px;
                  line-height: 18px;
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过度动画样式
    // 动画开始状态(进入)
    .navbar-enter {
      height: 0px;
    }
    .navbar-enter-to {
      height: 455px;
    }
    // 定义动画时间
    .navbar-enter-active {
      transition: all 0.3s linear;
      // 不要让动画效果时文字先出来
      overflow: hidden;
    }
  }
}
</style>
