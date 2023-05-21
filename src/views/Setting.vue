<template>
  <div class="setting">
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
              placeholder="修改用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="login-content"
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              placeholder="修改密码"
            />
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              class="login-content"
              v-model="ruleForm.email"
              autocomplete="off"
              placeholder="修改邮箱信息"
            />
          </el-form-item>
          <el-form-item>
            <el-button class="login-content" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

let ruleForm = reactive({
    username:"",
    password:"",
    email:""
})
</script>

<style lang="scss" scoped>

</style>