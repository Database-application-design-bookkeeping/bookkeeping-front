<template>
  <div class="income">
    <el-tabs type="border-card" class="demo-tabs" @tab-click="handleClick" v-model="activeName">
    <el-tab-pane label="今日收入" name="day">
      <el-table :data="tableData.dayIncome">
        <IncomeTableColumn></IncomeTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="本周收入" name="week">
      <el-table :data="tableData.weekIncome">
        <IncomeTableColumn></IncomeTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="本月收入" name="month">
      <el-table :data="tableData.monthIncome">
        <IncomeTableColumn></IncomeTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="全部收入" name="total">
      <el-table :data="tableData.totalIncome">
        <IncomeTableColumn></IncomeTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="'收入总金额：'+total+'￥'" disabled style="cursor: auto;"></el-tab-pane>
  </el-tabs>
  </div>
</template>
<script lang="ts">
import IncomeTableColumn from "@/components/IncomeTableColumn.vue";
export default {
  name:"Income",
  components:{
    IncomeTableColumn
  }
}
</script>
<script setup lang="ts">
import { onBeforeUpdate, onMounted, reactive,ref } from "vue";
import axios from "axios";
import type { TabsPaneContext } from 'element-plus'
const activeName = ref("day")
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
  }).then((res:any)=>{
    let income = res.data.data
    if(res.data.msg === "查询成功"){
      switch(type){
      case "day":{
        tableData.dayTotal = income.total||0;
        tableData.dayIncome = income.incomeVos;
        break;
      };
      case "week":{
        tableData.weekTotal = income.total||0;
        tableData.weekIncome = income.incomeVos;
        break;
      };
      case "month":{
        tableData.monthTotal = income.total||0;
        tableData.monthIncome = income.incomeVos;
        break;
      };
      case "total":{
        tableData.total = income.total||0;
        tableData.totalIncome = income.incomeVos;
        break;
      }
    }
    }
    
  }).catch((err:any)=>{
    console.log(err);
    
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
}) 
</script>
<style>

</style>