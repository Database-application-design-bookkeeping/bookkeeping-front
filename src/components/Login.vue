<template>
  <div class="login">
    <div class="mask">
      <div class="container">
        <div class="login-head">
          布克瓶记账
        </div>
        <div class="login-title">{{ loginMsg.title }}</div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              class="login-content"
              v-model="ruleForm.username"
              autocomplete="off"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="login-content"
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <div class="login-item">{{ loginMsg.item }}</div>
          </el-form-item>
          <el-form-item>
            <el-button class="login-content" type="primary">{{ loginMsg.btnMsg }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name:"Login"
}
</script>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
const loginMsg = reactive({
    title:"账号密码登录",
    btnMsg:"登录",
    item:"注册"
});
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  username: "",
  password: "",
  email: "",
  checkName: "",
  checkPass: "",
  checkEmail: "",
});

</script>

<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .mask {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    background-size: cover;
    .container {
      width: 320px;
      height: 400px;
      background-color: rgb(255, 255, 255);
      padding: 32px;
      border-radius: 20px;
      .login-head{
        text-align: center;
        font-size: 24px;
      }
      .login-content{
        width: 100%;
        height: 38px;
        font-size: 14px;
        line-height: 24px;
      }
      .login-title{
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        margin: 32px 0 28px 0;
      }
      .login-item{
        color: rgb(38, 38, 38,0.75);
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
      }
    }
  }
}
</style>
