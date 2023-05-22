<template>
  <div class="expenditure">
    <el-tabs type="border-card" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="今日收入" name="day">
      <el-table :data="tableData.dayExpense">
        <el-table-column prop="createTime" label="创建日期" min-width="180px"/>
        <el-table-column prop="categoryName" label="类型" min-width="180px"/>
        <el-table-column prop="amount" label="金额" min-width="180px"/>
        <el-table-column prop="outputMethod" label="支出方式" min-width="180px"/>
        <el-table-column prop="remark" label="备注" min-width="180px"/>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="本周收入" name="week">
      <el-table :data="tableData.weekExpense">
        <el-table-column prop="createTime" label="创建日期" min-width="180px"/>
        <el-table-column prop="categoryName" label="类型" min-width="180px"/>
        <el-table-column prop="amount" label="金额" min-width="180px"/>
        <el-table-column prop="outputMethod" label="支出方式" min-width="180px"/>
        <el-table-column prop="remark" label="备注" min-width="180px"/>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="本月收入" name="month">
      <el-table :data="tableData.monthExpense">
        <el-table-column prop="createTime" label="创建日期" min-width="180px"/>
        <el-table-column prop="categoryName" label="类型" min-width="180px"/>
        <el-table-column prop="amount" label="金额" min-width="180px"/>
        <el-table-column prop="outputMethod" label="支出方式" min-width="180px"/>
        <el-table-column prop="remark" label="备注" min-width="180px"/>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="全部收入" name="total">
      <el-table :data="tableData.totalExpense">
        <el-table-column prop="createTime" label="创建日期" min-width="180px"/>
        <el-table-column prop="categoryName" label="类型" min-width="180px"/>
        <el-table-column prop="amount" label="金额" min-width="180px"/>
        <el-table-column prop="outputMethod" label="支出方式" min-width="180px"/>
        <el-table-column prop="remark" label="备注" min-width="180px"/>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="'支出总金额：'+total" disabled style="cursor: pointer;"></el-tab-pane>
  </el-tabs>

    
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive,ref } from "vue";
import axios from "axios";
import type { TabsPaneContext } from 'element-plus'
const tableData = reactive({
  dayExpense: [],
  weekExpense: [],
  monthExpense: [],
  totalExpense: [],
  dayTotal : 0,
  weekTotal : 0,
  monthTotal : 0,
  total: 0
})
let total = ref<number>(0)



function getExpense(type:string){
  axios({
    url:`/expense/info/${type}`,
    headers:{
      "satoken":localStorage.getItem("token"),
    }
  }).then((res:any)=>{
    let expense = res.data.data
    switch(type){
      case "day":{
        tableData.dayTotal = expense.total;
        tableData.dayExpense = expense.expenseVos;
        break;
      };
      case "week":{
        tableData.weekTotal = expense.total;
        tableData.weekExpense = expense.expenseVos;
        break;
      };
      case "month":{
        tableData.monthTotal = expense.total;
        tableData.monthExpense = expense.expenseVos;
        break;
      };
      case "total":{
        tableData.total = expense.total;
        tableData.totalExpense = expense.expenseVos;
        break;
      };
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
  getExpense("day")
  getExpense("week")
  getExpense("month")
  getExpense("total")
}) 
</script>
<style>

</style>