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
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location/></el-icon>
            <span>我的记账本</span>
          </template>
          <el-menu-item index="1-1">
          <el-icon><icon-menu /></el-icon>
          <span>我的收入</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <el-icon><icon-menu /></el-icon>
          <span>我的支出</span>
        </el-menu-item>
          <el-sub-menu index="1-3">
            <template #title>理财计划</template>
            <el-menu-item index="1-3-1">新建项目</el-menu-item>
            <el-menu-item index="1-3-2">设置本月花费计划</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>数据一览</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
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