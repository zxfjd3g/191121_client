<template>
  <div class="register">
    <h3>注册新用户
      <span class="go">
        我有账号，去 <router-link to="/login">登陆</router-link>
      </span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <input type="text" placeholder="请输入你的手机号" v-model="mobile">
    </div>
    <div class="content">
      <label>验证码:</label>
      <input type="text" placeholder="请输入验证码" v-model="code">
      <img ref="code" src="/api/user/passport/code" alt="code" @click="updateCode">
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input type="text" placeholder="请输入你的登录密码" v-model="password">
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input type="text" placeholder="请输入确认密码" v-model="password2">
    </div>
    <div class="controls">
      <input name="m1" type="checkbox" v-model="agree">
      <span>同意协议并注册《尚品汇用户协议》</span>
    </div>
    <div class="btn" @click="register">
      <a href="javascript:">完成注册</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        mobile: '',
        password: '',
        password2: '',
        code: '',
        agree: true
      };
    },
    methods: {
      register() {
        const {
          mobile,
          password,
          password2,
          code,
          agree,
          callback
        } = this
        // 表单验证

        this.$store.dispatch('register', {
          mobile,
          password,
          code,
          callback
        })
      },
      callback(errorMsg) {
        if (!errorMsg) {
          this.$router.replace('/login')
        } else {
          alert(errorMsg)
        }
      },

      updateCode() {
        this.$refs.code.src = `/api/user/passport/code?time=${Date.now()}`
      }
    }
  }
</script>

<style lang="less" scoped>
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;
    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      // text-align: center;
      padding-left: 390px;
      margin-bottom: 18px;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }
    }

    .controls {
      text-align: center;

      input {
        vertical-align: middle;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      a {
        text-decoration: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }
</style>