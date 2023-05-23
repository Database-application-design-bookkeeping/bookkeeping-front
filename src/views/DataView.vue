<template>
  <div class="data-view">
    <el-row>
    <el-col :span="6">
      <el-statistic title="今日收益" :value="userAmount.balance.day" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="本周收益" :value="userAmount.balance.week">
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="本月收益" :value="userAmount.balance.month" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="总收益" :value="userAmount.balance.total">
      </el-statistic>
    </el-col>
  </el-row>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, reactive } from "vue";
let userAmount = reactive({
  balance: {
    day: 0,
    week: 0,
    month: 0,
    total: 0
  },
  income: {
    day: 0,
    week: 0,
    month: 0,
    total: 0
  },
  expense: {
    day: 0,
    week: 0,
    month: 0,
    total: 0
  }
})
function assignment(type:any,msg:any){
  type.day = msg.day;
  type.week = msg.week;
  type.month = msg.month;
  type.total = msg.total;
}
function getUserAmount(){
  axios({
    url:"/account/info"
  }).then((res:any)=>{
    if(res.data.msg==="查询成功"){
      let msg = res.data.data;
      assignment(userAmount.balance,msg.balance)
      assignment(userAmount.income,msg.income)
      assignment(userAmount.expense,msg.expense)
    }
  }).catch((err:any)=>{
    console.log(err);
    
  })
}
onMounted(()=>{
  getUserAmount()
})
</script>

<style lang="scss" scoped>

</style>