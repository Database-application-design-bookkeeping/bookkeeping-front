<template>
  <div class="login" v-if="isShowLogin">
    <div class="mask">
      <div class="container">
        <div class="close"><el-icon class="close-bold" @click="isShowLogin=false"><CloseBold /></el-icon></div>
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
        <el-form-item prop="email" v-if="loginMsg.type==='注册'">
            <el-input
              class="login-content"
              v-model="ruleForm.email"
              autocomplete="off"
              placeholder="请输入邮箱"
            />
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              class="login-content"
              v-model="ruleForm.username"
              autocomplete="off"
              :placeholder="loginMsg.placeholder"
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
              <div class="login-item" @click="switchLoginMsg('登录',true)">{{ loginMsg.leftItem }}</div>
              <div class="login-item" @click="switchLoginMsg('注册',true)" v-if="loginMsg.type==='登录'">{{ loginMsg.rightItem }}</div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="login-content" @click="log" type="primary">{{ loginMsg.type }}</el-button>
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
import { onMounted, reactive, ref  } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import axios from 'axios';
import { ElMessage } from 'element-plus'
import store from '@/store';
let isShowLogin = ref<boolean>(true)
//界面信息
let loginMsg = reactive({
    title:"账号密码登录",
    type:"登录",
    leftItem:"邮箱登录",
    rightItem:"注册",
    placeholder:"请输入用户名"
});

function setStoreMsg(token:string,username:string){
    localStorage.setItem("token",token);
    localStorage.setItem("username",username);
    store.commit("setToken",{token,username});
}
//清空&初始化表单
function initForm(){
  ruleForm.username= "";
  ruleForm.password= "";
  ruleForm.checkPass= "";
  ruleForm.email= "";
  ruleForm.verificationCode= "";
}

//切换界面信息
function switchLoginMsg(data:String,isSwitch?:Boolean){
  isShowLogin.value = true;
  if(data==="登录"||data===""){
    if(loginMsg.leftItem==="账号登录"){
      loginMsg.title = "账号密码登录";
      loginMsg.type = "登录";
      loginMsg.leftItem = "邮箱登录";
      loginMsg.rightItem = "注册";
      loginMsg.placeholder="请输入用户名"
    }else if(loginMsg.leftItem==="邮箱登录"&&isSwitch){
      loginMsg.title = "邮箱登录";
      loginMsg.type = "登录";
      loginMsg.leftItem = "账号登录";
      loginMsg.rightItem = "注册";
      loginMsg.placeholder = "请输入邮箱"
    }
  }else if(data==="注册"){
      loginMsg.title = "注册账号";
      loginMsg.type = "注册";
      loginMsg.leftItem = "账号登录";
      loginMsg.rightItem = "注册";
      loginMsg.placeholder = "请输入用户名"
  }
  initForm()
}
const ruleFormRef = ref<FormInstance>();

//表单信息
const ruleForm = reactive({
  username: "",
  password: "",
  checkPass: "",
  email: "",
  verificationCode: "",
});

//账号密码登录
function usernameLog(){
    axios({
    method:"post",
    url:"/user/login",
    data:{
      "username":ruleForm.username,
      "password":ruleForm.password
    }
  }).then((res:any)=>{
    if(res.data.msg==="登录成功"){
      isShowLogin.value=false;
      setStoreMsg(res.data.data.token,res.data.data.username)
      ElMessage({
        message:res.data.msg,
        type:"success"
      })
    }else{
      ElMessage({
        message: res.data.msg,
        type: 'warning',
  })
    }
  }).catch((err:any)=>{
    ElMessage({
        message:err,
        type:"warning"
      })
  })
}

//注册
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
      switchLoginMsg("登录",true)
    }
  }).catch((err:any)=>{
    ElMessage({
        message:err,
        type:"warning"
      })
  })
}

//登录方式判断
function log(){
  if(loginMsg.type==="登录"){
    if(loginMsg.title==="账号密码登录"){
      usernameLog();
    }else if(loginMsg.title==="邮箱登录"){
      emailLog();
    }
  }else if(loginMsg.type==="注册"){
    register();
  }
}

//发送邮箱验证码
function sendVerificationCode(){
  axios({
    url:"/user/sendCode",
    data:{
      "email":ruleForm.email
    }
  }).then((res:any)=>{
    if(res.data.msg==="邮箱验证码发送成功"){
      ElMessage({
        message:res.data.msg,
        type:"success"
      });
    }else{
      ElMessage({
        message:res.data.msg,
        type:"warning"
      })
    }
  }).catch((err:any)=>{
    ElMessage({
        message:err,
        type:"warning"
      })
  })
}

//邮箱登录
function emailLog(){
  axios({
    url:"/user/loginByEmail",
    data:{
      "email":ruleForm.email,
      "code":ruleForm.verificationCode
    }
  }).then((res:any)=>{
    if(res.data.msg==="登录成功"){
      ElMessage({
        message:res.data.msg,
        type:"success"
      });
      isShowLogin.value = false
    }else{
      ElMessage({
        message:res.data.msg,
        type:"warning"
      })
    }
  }).catch((err:any)=>{
    ElMessage({
        message:err,
        type:"warning"
      })
  })
}

//暴露给父组件的判断是否需要登录
function isLogin(){
  if(store.getters.token||localStorage.getItem("token")){
    isShowLogin.value = false;
  }else{
    switchLoginMsg("登录",true)
  }
}

//暴露切换页面信息的函数
defineExpose({
  switchLoginMsg,
  isLogin
})
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