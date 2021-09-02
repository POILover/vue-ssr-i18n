<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      size="small"
      label-position="left"
    >
      <div class="title-container">
        <div class="title">
          VUE-SSR管理平台
        </div>
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <div style="width:100%;display:flex;justify-content:center">
        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          style=""
          @click.native.prevent="handleLogin"
        >
          登 录
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ validator: this.validatePassword }],
      },
      passwordType: "password",
      loading: false,
    };
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  methods: {
    validatePassword(rule, value, callback) {
      if (value.length < 1) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
      callback();
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve();
            }, 500)
          );
          Cookies.set("token", "vue-ssr-login-token");
          this.loading = false;
          this.$router
            .push({
              path: "/admin",
            })
            .catch((err) => {
              console.warn(err);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eee;
      -webkit-appearance: none;
      &:-webkit-autofill {
        background-color: transparent;
        -webkit-transition-delay: 999999s;
        -webkit-transition: color 999999s ease-out,
          background-color 999999s ease-out;
      }
    }
  }
  .el-form-item__error {
    padding-left: 16px;
  }
  .el-form-item {
    box-shadow: 0px 0px 29px 0px #008bff inset;
    border-radius: 22px;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: linear-gradient(rgb(1, 15, 102), rgb(0, 15, 66));
  background-position: bottom left;
  .login-form {
    box-sizing: border-box;
    position: relative;
    width: 460px;
    max-width: 100%;
    padding: 35px 75px 35px 75px;
    margin: 160px auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;
    margin-top: 46px;
    margin-bottom: 76px;
    .title {
      text-align: center;
      height: 24px;
      font-size: 24px;
      font-weight: 400;
      color: #ffffff;
      line-height: 36px;
      letter-spacing: 1px;
    }
  }
  .login-btn {
    width: 140px;
    height: 44px;
    background-color: #0057a0;
    border-radius: 22px;
    margin: 20px;
    border: none;
    &:hover {
      background-color: #176aad;
    }
    &:active {
      border: 1px solid #dcdfe6;
    }
  }
}
</style>
