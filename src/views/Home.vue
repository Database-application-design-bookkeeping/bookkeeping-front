<template>
  <div class="home">
    <el-container class="full-height">
      <el-header class="header-box" height="50px">
        <el-row class="grid-box">
          <el-col :span="4" style="min-width: 140px;">
            <div class="title">
              布克瓶记账
            </div>
          </el-col>
          <el-col :span="4" style="min-width: 120px;">
            <div class="box-right" v-if="username">欢迎</div>
            <div class="box-right user-msg" v-if="username"> {{ username }} </div>
            <div class="box-login box-right" @click="showLoginView('登录',false)" v-if="!username">登录</div>
            <div class="box-item box-right" v-if="!username">或</div>
            <div class="box-register box-right" @click="showLoginView('注册',false)" v-if="!username">注册</div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="full-height">
        <el-aside width="200px" class="full-height">
          <el-menu
        default-active="1"
        class="el-menu-vertical-demo full-height"
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
          <el-menu-item index="/creatproject">
            <el-icon><FolderAdd /></el-icon>
            <span>新建项目</span>
          </el-menu-item>
          <el-menu-item index="/setplan">
            <el-icon><Finished /></el-icon>
            <span>我的消费计划</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/dataview">
          <el-icon><DataLine /></el-icon>
          <span>数据一览</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <el-icon><setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
        <el-menu-item index="/" @click="loginOut">
          <el-icon><Back /></el-icon>
          <span>退出登录</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <Login ref="login"></Login>
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
import {  onMounted, ref, inject} from "vue"
import axios from 'axios';
import store from '@/store';
const reload = inject("reload") as any
let username = ref(localStorage.getItem("username"))
let login = ref(null)
function showLoginView(type:string,isSwitch:boolean){
  login.value.switchLoginMsg(type,isSwitch)
}

function loginOut(){
  axios({
    url:"/user/logout"
  }).then((res:any)=>{
    if(res.data.msg==="退出成功"){
      store.commit("delToken");
      showLoginView("登录",false);
      store.commit("sucMessage",res.data.msg)
    }else{
      store.commit("warnMessage","操作失败")
    }
    reload()
  })
}
onMounted(()=>{
  login.value.isLogin();
})
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
    .header-box{
      text-align: center;
      .grid-box{
        height: 100%;
        justify-content:space-between;
        align-items: center;
        white-space: nowrap;
        .title{
          font-weight: 700px;
          font-size: 24px;
        }
        .user-msg{
          margin-left: 10px;
        }
        .box-right{
          display: inline-block;
          color: rgb(89,89,89);
          font-size: 14px;
        }
        .box-login,.box-register{
          cursor: pointer;
        }
        .box-item{
          margin: 0 10px;
        }
      }
    }
    .full-height{
      height: 100%;
    }
  }
</style>