<template>
  <div>
    <div class="register">
      <div class="top">
        <div>注册新用户</div>
        <div>我有账号，去<a href="javascript:;">登录</a></div>
      </div>
      <div class="item">
        <span>手机号:</span>
        <input placeholder="请输入你的手机号" v-model="phone" name="phone" v-validate="{ required: true, regex: /^1\d{10}$/ }" :class="{ invalid: errors.has('phone') }" />
      </div>
      <div class="error">{{ errors.first('phone') }}</div>
      <div class="item">
        <span>验证码:</span>
        <input placeholder="请输入你的验证码" v-model="code" name="code" v-validate="{ required: true, regex: /^\d{6}$/ }" :class="{ invalid: errors.has('code') }" />
        <button @click="getcode">点击发送验证码</button>
      </div>
      <div class="error">{{ errors.first('code') }}</div>
      <div class="item">
        <span>登录密码:</span>
        <input type="password" placeholder="请输入你的密码" v-model="password" name="password" v-validate="{ required: true, regex: /^[0-9a-zA-Z]{8,20}$/ }" :class="{ invalid: errors.has('password') }" />
      </div>
      <div class="error">{{ errors.first('password') }}</div>
      <div class="item">
        <span>确认密码:</span>
        <input type="password" placeholder="请再次输入你的密码" v-model="password1" name="password1" v-validate="{ required: true, is: password }" :class="{ invalid: errors.has('password1') }" />
      </div>
      <div class="error">{{ errors.first('password1') }}</div>
      <div class="agree">
        <input type="checkbox" v-model="agree" name="agree" v-validate="{ required: true, tongyi: true }" :class="{ invalid: errors.has('agree') }" />
        <span>同意协议并注册《尚品汇用户协议》</span>
      </div>
      <div class="error">{{ errors.first('agree') }}</div>
      <div class="done">
        <button @click="userRegister()">完成注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      // 收集表单数据，手机号
      phone: '',
      // 验证码
      code: '',
      // 密码
      password: '',
      // 确认密码
      password1: '',
      // 是否同意协议
      agree: 'true'
    }
  },
  computed: {
    ...mapState({
      mycode: (state) => state.user.mycode
    })
  },
  methods: {
    // 点击获取验证码
    async getcode() {
      try {
        await this.$store.dispatch('getCode', this.phone)
        this.code = this.mycode
      } catch (error) {
        alert(error.message)
      }
    },
    async userRegister() {
      const success = await this.$validator.validateAll() // 全部表单验证
      // 全部表单验证成功，再发请求
      if (success) {
        const { phone, code, password } = this
        const data = { phone, code, password }
        try {
          await this.$store.dispatch('userRegister', data)
          this.$router.push({
            name: 'login'
          })
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  width: 1200px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid #ccc;
  position: relative;
  .top {
    display: flex;
    background-color: whitesmoke;
    padding: 5px 10px;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .item {
    width: 330px;
    margin: 0 auto;

    input {
      height: 30px;
      width: 260px;
      border: 1px solid grey;
      outline: none;
      font-size: 12px;
      padding-left: 5px;
    }
    span {
      display: inline-block;
      width: 60px;
      height: 30px;
      vertical-align: middle;
      line-height: 30px;
      font-size: 14px;
      margin-right: 10px;
    }
    button {
      position: absolute;
      height: 30px;
      left: 780px;
    }
  }
  .error {
    width: 330px;
    margin: 5px auto 20px;
    font-size: 11px;
    color: red;
    padding-left: 70px;
  }
  .agree {
    width: 400px;
    margin: 10px auto;
    font-size: 12px;
    padding-left: 75px;
    input {
      vertical-align: middle;
    }
  }
  .done {
    width: 400px;
    margin: 0 auto;
    padding-left: 70px;
    button {
      width: 260px;
      height: 30px;
      background-color: red;
      color: white;
    }
  }
}
</style>
