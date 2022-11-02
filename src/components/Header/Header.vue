<template>
  <div class="header-container">
    <!-- 页面最顶部 -->
    <div class="top">
      <div class="banner">
        <div class="left">
          <p>尚品汇欢迎您！</p>
          <!-- 声明式导航 -->
          <router-link to="/login" v-if="!name">请登录</router-link>
          <router-link to="/register" v-if="!name">免费注册</router-link>
          <a href="javascript:;" v-if="name">{{ name }}</a>
          <a href="javascript:;" v-if="name" @click="logout">退出登录</a>
        </div>
        <div class="right">
          <ul>
            <li><router-link to="/center">我的订单</router-link></li>
            <li><router-link to="/shopcart">我的购物车</router-link></li>
            <li><a href="##">我的尚品汇</a></li>
            <li><a href="##">尚品汇会员</a></li>
            <li><a href="##">企业采购</a></li>
            <li><a href="##">关注尚品汇</a></li>
            <li><a href="##">合作招商</a></li>
            <li><a href="##">商家后台</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="head">
      <div class="logo">
        <router-link to="/home" title="尚品汇" target="_blank">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </div>
      <div class="search"><input type="text" v-model="keyword" /><button @click="gosearch">搜索</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    // 搜索按钮，跳转search，编程式导航
    gosearch() {
      const location = {
        name: 'search',
        params: { keyword: this.keyword || undefined }
      }
      // 如果有query参数也带过去
      if (this.$route.query) {
        location.query = this.$route.query
      }
      this.$router.push(location)
    },
    // 退出登录
    async logout() {
      // 通知服务器退出登录
      await this.$store.dispatch('userLogout')
      // 退出登录后跳转到home
      try {
        await this.$store.dispatch('userLogout')
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    // 登录后的用户名
    name() {
      return this.$store.state.user.userinfo.name
    }
  },
  mounted() {
    // 通过全局事件总线清除关键字,来自search组件
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  }
}
</script>

<style lang="less" scoped>
.top {
  height: 30px;
  background-color: #f5f5f5;
  .banner {
    display: flex;
    justify-content: space-between;
    width: 1200px;
    height: 30px;
    margin-left: auto;
    margin-right: auto;
    .left {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 30px;
      p {
        margin-right: 10px;
      }
      a {
        height: 20px;
        margin-right: 5px;
        line-height: 20px;
        color: black;
      }
      .login {
        border-right: 1px solid black;
        padding-right: 5px;
      }
      span {
        margin-right: 5px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      ul {
        display: flex;
        align-items: center;
        font-size: 12px;
        li {
          height: 20px;
          border-right: 1px solid black;
          padding-right: 5px;
          padding-left: 5px;
          a {
            height: 20px;
            line-height: 20px;
            color: black;
          }
        }
        li:nth-last-child(1) {
          border-right: none;
        }
      }
    }
  }
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 106px;
  margin: 0 auto;
  .logo {
    width: 175px;
  }
  .search {
    button {
      background-color: red;
      color: white;
      font-size: 12px;
      width: 70px;
      height: 40px;
      border: none;
      outline: none;
    }
    input {
      border: 1px red solid;
      outline: none;
      width: 300px;
      height: 40px;
      padding-left: 3px;
      font-size: 12px;
      vertical-align: bottom;
    }
  }
}
</style>
