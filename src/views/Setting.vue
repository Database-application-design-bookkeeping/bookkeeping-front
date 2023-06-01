<template>
  <div class="setting">
    <el-form
          ref="ruleFormRef"
          :model="userForm"
          status-icon
          label-width="80px"
          label-position="left"
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
          
          <el-form-item prop="email" label="邮箱">
            <el-input
              class="login-content"
              v-model="userForm.email"
              autocomplete="off"
              placeholder="修改邮箱信息"
            />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-button type="primary" @click="centerDialogVisible = true">修改密码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="login-content" type="primary" @click="saveUserInfo">保存</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          v-model="centerDialogVisible"
          title="修改密码"
          width="30%"
          align-center
        >
          <el-input v-model="userForm.originPwd" placeholder="请输入原密码" class="btn-space"/>
          <el-input v-model="userForm.newPwd" placeholder="请输入新密码" class="btn-space" />
          <el-input v-model="userForm.checkPass" placeholder="确认新密码" class="btn-space" />
        
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="changePWD">
            确定修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import axios from "axios";
import { onMounted, reactive,ref } from "vue";

const centerDialogVisible = ref(false)

let userForm = reactive({
    username:"",
    originPwd:"",
    newPwd:"",
    checkPass:"",
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

function changePWD(){
  if(userForm.newPwd==userForm.checkPass){
    if(userForm.newPwd!=""&&userForm.checkPass!=""){
      axios({
    method:"post",
    url:"/user/updatePwd",
    data:{
      "originPwd":userForm.originPwd,
      "newPwd":userForm.newPwd
    }
  }).then((res:any)=>{
    let msg = res.data.msg;
    if(msg=="修改成功"){
      store.commit("sucMessage",msg);
      centerDialogVisible.value = false;
    }else{
      store.commit("warnMessage",msg)
    }
  }).catch((err:any)=>{
    console.log(err);
    
  })
    }else{
      store.commit("warnMessage","输入框不能为空")
    }
    
  }else{
    store.commit("warnMessage","两次输入的密码不同")
  }
  
}

function saveUserInfo(){
  axios({
    url:"/user/update",
    data:{
      "username":userForm.username,
      "email":userForm.email
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
.btn-space{
  margin-top: 15px;
}
</style>