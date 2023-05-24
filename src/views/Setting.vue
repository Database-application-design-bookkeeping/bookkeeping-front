<template>
  <div class="setting">
    <el-form
          ref="ruleFormRef"
          :model="userForm"
          status-icon
          class="demo-ruleForm"
        >
          <el-form-item prop="username" label="用户名">
            <el-input
              class="login-content"
              v-model="userForm.username"
              autocomplete="off"
              placeholder="修改用户名"
            />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              class="login-content"
              v-model="userForm.password"
              type="password"
              autocomplete="off"
              placeholder="修改密码"
            />
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input
              class="login-content"
              v-model="userForm.email"
              autocomplete="off"
              placeholder="修改邮箱信息"
            />
          </el-form-item>
          <el-form-item>
            <el-button class="login-content" type="primary" @click="saveUserInfo">保存</el-button>
          </el-form-item>
        </el-form>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import axios from "axios";
import { onMounted, reactive } from "vue";

let userForm = reactive({
    username:"",
    password:"",
    email:""
})
function getUserInfo(){
  axios({
    url:"/user/info"
  }).then((res:any)=>{
    if(res.data.msg==="查询成功"){
      let msg = res.data.data;
      userForm.username = msg.username
      userForm.email = msg.email
    }
  })
}
function saveUserInfo(){
  axios({
    url:"/user/update",
    data:{
      "username":"123",
      "password":"123",
      "email":"xxx@qq.com"
    }
  }).then((res:any)=>{
    let msg = res.data.msg
    if(msg ==="修改成功"){
      store.commit("sucMessage",msg)
    }else{
      store.commit("warnMessage",msg)
    }
  }).catch((err:any)=>{
    console.log(err);
  })
}
onMounted(()=>{
  getUserInfo()
})
</script>

<style lang="scss" scoped>

</style>