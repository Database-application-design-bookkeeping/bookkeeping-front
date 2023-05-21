<template>
  <div class="home">
    <el-container class="full-height">
      <el-header>Header</el-header>
      <el-container class="full-height">
        <el-aside width="280px" class="full-height">
          <el-menu
        default-active="2"
        class="el-menu-vertical-demo full-height"
        @open="handleOpen"
        @close="handleClose"
        router="true"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Notebook /></el-icon>
            <span>我的记账本</span>
          </template>
          <el-menu-item index="/income">
            <el-icon><Sell /></el-icon>
            <span>我的收入</span>
        </el-menu-item>
        <el-menu-item index="/expenditure">
          <el-icon><SoldOut /></el-icon>
          <span>我的支出</span>
        </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><Wallet /></el-icon>
            <span>我的理财计划</span>
          </template>
          <el-menu-item index="2-1">
            <el-icon><FolderAdd /></el-icon>
            <span>新建项目</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <el-icon><Finished /></el-icon>
            <span>设置本月花费计划</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">
          <el-icon><DataLine /></el-icon>
          <span>数据一览</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    
  </div>
  <Login :isShow="isShow"></Login>
</template>

<script lang="ts">
import Login from "@/components/Login.vue";
export default {
  name:"Home",
  components:{
    Login,
}
}
</script>
<script setup lang="ts">
import {ref} from "vue"
const isShow = ref<boolean>(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
    .full-height{
      height: 100%;
    }
  }
</style>