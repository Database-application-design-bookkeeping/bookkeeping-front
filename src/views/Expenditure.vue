<template>
  <div class="expenditure">
    <el-tabs type="border-card" class="demo-tabs" @tab-click="handleClick" v-model="activeName ">
    <el-tab-pane label="今日支出" name="day">
      <el-table :data="tableData.dayExpense" stripe>
        <ExpenseTableColumn></ExpenseTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="本周支出" name="week">
      <el-table :data="tableData.weekExpense" stripe>
        <ExpenseTableColumn></ExpenseTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="本月支出" name="month">
      <el-table :data="tableData.monthExpense" stripe>
        <ExpenseTableColumn></ExpenseTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="全部支出" name="total">
      <el-table :data="tableData.totalExpense" stripe>
        <ExpenseTableColumn></ExpenseTableColumn>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="'支出总金额：'+total+'￥'" disabled></el-tab-pane>
  </el-tabs>
  </div>
</template>
<script lang="ts">
import ExpenseTableColumn from "@/components/ExpenseTableColumn.vue";
export default {
  name:"Income",
  components:{
    ExpenseTableColumn
  }
}
</script>
<script setup lang="ts">
import { onMounted, reactive,ref } from "vue";
import axios from "axios";
import type { TabsPaneContext } from 'element-plus'
const activeName =ref("day")
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
  }).then((res:any)=>{
    let expense = res.data.data
    if(res.data.msg==="查询成功"){
      total.value = tableData.dayTotal;
      switch(type){
      case "day":{
        tableData.dayTotal = expense.total||0;
        tableData.dayExpense = expense.expenseVos;
        break;
      };
      case "week":{
        tableData.weekTotal = expense.total||0;
        tableData.weekExpense = expense.expenseVos;
        break;
      };
      case "month":{
        tableData.monthTotal = expense.total||0;
        tableData.monthExpense = expense.expenseVos;
        break;
      };
      case "total":{
        tableData.total = expense.total||0;
        tableData.totalExpense = expense.expenseVos;
        break;
      };
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
  getExpense("day")
  getExpense("week")
  getExpense("month")
  getExpense("total")
}) 

</script>
<style>

</style>