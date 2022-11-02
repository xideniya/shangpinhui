<template>
  <div class="wrapper">
    <div class="contain">
      <div class="login">
        <div class="table">
          <div class="top">
            <div class="left">扫描登录</div>
            <div class="right">账户登录</div>
          </div>
          <div class="middle">
            <span></span>
            <input type="text" placeholder="邮箱/用户名/手机号" v-model="phone" />
          </div>
          <div class="middle">
            <span class="password"></span>
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="auto">
            <div class="left"><input type="checkbox" /><span>自动登录</span></div>
            <div class="right">忘记密码?</div>
          </div>
          <button @click="userlogin">登&nbsp;&nbsp;录</button>
          <div class="bottom">
            <div class="left">
              <img src="./images/qq.png" alt="" />
              <img src="./images/sina.png" alt="" />
              <img src="./images/weixin.png" alt="" />
              <img src="./images/ali.png" alt="" />
            </div>
            <div class="right">
              <a href="javasceipt:;">立即注册</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    async userlogin() {
      const { phone, password } = this
      if (phone && password) {
        try {
          // 登录成功，跳转到home
          await this.$store.dispatch('userLogin', { phone, password })
          // 看路由当中是否有query参数,登录后跳转到用户原本想去的页面
          const topath = this.$route.query.redirect || '/home'
          this.$router.push(topath)
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  height: 475px;
  background-image: url('./images/loginbg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: #e93854;
  .contain {
    width: 1200px;
    height: 475px;
    margin: 0 auto;
    padding-top: 35px;
    .login {
      width: 410px;
      height: 410px;
      background-color: #fff;
      margin-left: 795px;
      padding: 10px;
      .table {
        width: 390px;
        height: 390px;
        border: 1px solid grey;
        .top {
          display: flex;
          height: 40px;
          margin-bottom: 15px;
          .left {
            width: 50%;
            text-align: center;
            border: 1px solid grey;
            border-left: 0px;
            border-right: 0px;
            line-height: 38px;
            font-weight: 700;
            cursor: pointer;
          }
          .right {
            width: 50%;
            text-align: center;
            border: 1px solid grey;
            line-height: 38px;
            font-weight: 700;
            border-right: 0px;
            cursor: pointer;
          }
        }
        .middle {
          width: 300px;
          margin: 20px auto;
          input {
            margin-left: -1px;
            width: 270px;
            height: 30px;
            border: 1px solid grey;
            outline: none;
            font-size: 14px;
            vertical-align: middle;
            padding-left: 5px;
          }
          span {
            height: 30px;
            width: 30px;
            display: inline-block;
            border: 1px solid grey;
            vertical-align: middle;
            background-image: url('./images/icons.png');
            background-position: -13px -201px;
          }
          .password {
            background-position: -74px -201px;
          }
        }
        .auto {
          width: 300px;
          margin: 0px auto 10px;
          display: flex;
          justify-content: space-between;
          .left {
            font-size: 14px;
            input {
              vertical-align: middle;
            }
          }
          .right {
            font-size: 14px;
          }
        }
        button {
          display: block;
          width: 300px;
          height: 40px;
          margin: 30px auto;
          background-color: red;
          border: 0;
          color: white;
          border-radius: 4px;
          text-align: center;
          font-size: 15px;
        }
        .bottom {
          width: 300px;
          display: flex;
          justify-content: space-between;
          margin: 0px auto;
          margin-top: 70px;
          .right {
            line-height: 37px;
          }
        }
      }
    }
  }
}
</style>
