<template>
  <div class="income">
    <el-tabs type="border-card" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="今日收入" name="day">
      <el-table :data="tableData.dayIncome">
        <BillingTableColumn></BillingTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="本周收入" name="week">
      <el-table :data="tableData.weekIncome">
        <BillingTableColumn></BillingTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="本月收入" name="month">
      <el-table :data="tableData.monthIncome">
        <BillingTableColumn></BillingTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="全部收入" name="total">
      <el-table :data="tableData.totalIncome">
        <BillingTableColumn></BillingTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="'收入总金额：'+total" disabled style="cursor: pointer;"></el-tab-pane>
  </el-tabs>

    
  </div>
</template>
<script lang="ts">
import BillingTableColumn from "@/components/BillingTableColumn.vue";
export default {
  name:"Income",
  components:{
    BillingTableColumn
  }
}
</script>
<script setup lang="ts">
import { onMounted, reactive,ref } from "vue";
import axios from "axios";
import type { TabsPaneContext } from 'element-plus'

const tableData = reactive({
  dayIncome: [],
  weekIncome: [],
  monthIncome: [],
  totalIncome: [],
  dayTotal : 0,
  weekTotal : 0,
  monthTotal : 0,
  total: 0
})
let total = ref<number>(0)

function getIncome(type:string){
  axios({
    url:`/income/info/${type}`,
    headers:{
      /* "Access-Control-Allow-Origin": "*", */
      "satoken":localStorage.getItem("token"),
      /* "Content-Type":"application/json;charset=UTF-8" */
    }
  }).then((res:any)=>{
    let income = res.data.data
    switch(type){
      case "day":{
        tableData.dayTotal = income.total;
        tableData.dayIncome = income.incomeVos;
        break;
      };
      case "week":{
        tableData.weekTotal = income.total;
        tableData.weekIncome = income.incomeVos;
        break;
      };
      case "month":{
        tableData.monthTotal = income.total;
        tableData.monthIncome = income.incomeVos;
        break;
      };
      case "total":{
        tableData.total = income.total;
        tableData.totalIncome = income.incomeVos;
        break;
      }
    }
  })
}
let handleClick = (tab: TabsPaneContext) => {
  switch(tab.paneName){
    case "day":{
      total.value = tableData.dayTotal;
      break;
    };
    case "week":{
      total.value = tableData.weekTotal;
      break;
    };
    case "month":{
      total.value = tableData.monthTotal;
      break;
    };
    case "total":{
      total.value = tableData.total;
      break;
    }
  }
}
onMounted(()=>{
  getIncome("day")
  getIncome("week")
  getIncome("month")
  getIncome("total")
  console.log(localStorage.getItem("token"));
}) 
</script>
<style>

</style>