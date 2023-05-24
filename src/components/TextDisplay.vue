<template>
  <el-space direction="vertical" size="large" style="width: 100%;" fill="true" class="data-literal">
      <el-row v-for="msg in userAmount" :key="msg">
        <el-col :span="6">
          <el-statistic :title="msg.titles[0]" :value="msg.day" />
        </el-col>
        <el-col :span="6">
          <el-statistic :title="msg.titles[1]" :value="msg.week">
          </el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic :title="msg.titles[2]" :value="msg.month" />
        </el-col>
        <el-col :span="6">
          <el-statistic :title="msg.titles[3]" :value="msg.total">
          </el-statistic>
        </el-col>
      </el-row>
    </el-space>
</template>
<script lang="ts">
export default {
    name:"TextDisplay"
}
</script>
<script setup lang="ts">
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
//用来存储用户金额量信息
let userAmount = reactive({
  income: {
    day: 0,
    week: 0,
    month: 0,
    total: 0,
    titles: ["今日收入", "本周收入", "本月收入", "总收入"]
  },
  expense: {
    day: 0,
    week: 0,
    month: 0,
    total: 0,
    titles: ["今日支出", "本周支出", "本月支出", "总支出"]
  },
  balance: {
    day: 0,
    week: 0,
    month: 0,
    total: 0,
    titles: ["今日收益", "本周收益", "本月收益", "总收益"]
  }
})

//统一赋值方法
function assignment(type: any, msg: any) {
  type.day = msg.day;
  type.week = msg.week;
  type.month = msg.month;
  type.total = msg.total;
}

//获取用户的支出、收入。利润等信息
function getUserAmount() {
  axios({
    url: "/account/info"
  }).then((res: any) => {
    if (res.data.msg === "查询成功") {
      let msg = res.data.data;
      assignment(userAmount.balance, msg.balance)
      assignment(userAmount.income, msg.income)
      assignment(userAmount.expense, msg.expense)
    }
  }).catch((err: any) => {
    console.log(err);
  })
}
onMounted(()=>{
    getUserAmount()
})
</script>

<style lang="scss" scoped>
.data-literal {
    width: 100%;
    height: 240px;
    margin-bottom: 10px !important;
  }
</style>