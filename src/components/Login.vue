<template>
  <div class="login" v-if="isShow">
    <div class="mask">
      <div class="container">
        <div class="close"><el-icon class="close-bold" @click="isShow=false"><CloseBold /></el-icon></div>
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
          <el-form-item prop="password" v-if="loginMsg.title==='账号密码登录'||loginMsg.type==='注册'">
            <el-input
              class="login-content"
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item prop="password" v-if="loginMsg.type==='注册'">
            <el-input
              class="login-content"
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
              placeholder="确认密码"
            />
          </el-form-item>
          <el-form-item prop="email" v-if="loginMsg.type==='注册'">
            <el-input
              class="login-content"
              v-model="ruleForm.email"
              autocomplete="off"
              placeholder="请输入邮箱"
            />
          </el-form-item>
          <el-form-item prop="email"  v-if="loginMsg.title==='邮箱登录'">
            <el-input
              class="login-content"
              v-model="ruleForm.verificationCode"
              autocomplete="off"
              placeholder="请输入验证码"
            />
            <el-button class="ver-btn" @click="sendVerificationCode">发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <div class="itme-box">
              <div class="login-item" @click="switchLoginMsg('登录')">{{ loginMsg.leftItem }}</div>
              <div class="login-item" @click="switchLoginMsg('注册')">{{ loginMsg.rightItem }}</div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="login-content" @click="logIn" type="primary">{{ loginMsg.type }}</el-button>
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
import { reactive, ref, defineProps } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import axios from 'axios';
import { ElMessage } from 'element-plus'
const props = defineProps({
        isShow: Boolean
    })
let isShow = ref<boolean>(props.isShow)
let loginMsg = reactive({
    title:"账号密码登录",
    type:"登录",
    leftItem:"邮箱登录",
    rightItem:"注册",
});
function initForm(){
  ruleForm.username= "";
  ruleForm.password= "";
  ruleForm.checkPass= "";
  ruleForm.email= "";
  ruleForm.verificationCode= "";
}
function switchLoginMsg(data:string){
  if(data==="登录"){
    if(loginMsg.leftItem==="账号登录"){
      loginMsg.title = "账号密码登录";
      loginMsg.type = "登录";
      loginMsg.leftItem = "邮箱登录";
      loginMsg.rightItem = "注册";
    }else if(loginMsg.leftItem==="邮箱登录"){
      loginMsg.title = "邮箱登录";
      loginMsg.type = "登录";
      loginMsg.leftItem = "账号登录";
      loginMsg.rightItem = "注册";
    }
  }else if(data==="注册"){
      loginMsg.title = "注册账号";
      loginMsg.type = "注册";
      loginMsg.leftItem = "账号登录";
      loginMsg.rightItem = "注册";
  }
  initForm()
}
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  username: "",
  password: "",
  checkPass: "",
  email: "",
  verificationCode: "",
});
function logIn(){
  axios({
    method:"post",
    url:"/user/login",
    data:{
      "username":ruleForm.username,
      "password":ruleForm.password
    }
  }).then((res:any)=>{
    console.log(res.data.msg);
    if(res.data.msg==="登录成功"){
      isShow.value=false;
    }else{
      ElMessage({
        message: res.data.msg,
        type: 'warning',
  })
    }
  })
}
function register(){
  axios({
    method:"post",
    url:"/user/regist",
    data:{
      "username":ruleForm.username,
      "password":ruleForm.password,
      "email":ruleForm.email
    }
  }).then((res:any)=>{
    if(res.data.msg==="注册成功"){
      ElMessage({
        message: res.data.msg,
        type: 'success',
      })
      switchLoginMsg("登录")
    }
  })
}
function sendVerificationCode(){
  axios({
    url:"/user/sendCode",
    data:{
      "email":ruleForm.email
    }
  }).then((res:any)=>{
    if(res.data.msg==="邮箱验证码发送成功"){

    }else{
      ElMessage({
        message:res.data.msg,
        type:"warning"
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  box-sizing: border-box;
  inset: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  .mask {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    background-size: cover;
    .container {
      width: 320px;
      background-color: rgb(255, 255, 255);
      padding: 32px;
      border-radius: 20px;
      .close{
        display: flex;
        justify-content: right;
        .close-bold{
          cursor: pointer;
        }
      }
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
      .ver-btn{
        position: absolute;
        right: 10px;
        display: inline-block;
        line-height: 30px;
        border: 0;
        padding: 0;
        &:hover{
          background-color: rgb(255, 255, 255);
        }
      }
      .itme-box{
        display: flex;
        justify-content: space-between;
        width: 100%;
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
