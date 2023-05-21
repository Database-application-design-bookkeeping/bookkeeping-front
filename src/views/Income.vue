<template>
  <div class="income">
    <el-table :data="tableData.list" style="width: 100%">
      <el-table-column prop="createTime" label="创建日期" width="180" />
      <el-table-column prop="categoryName" label="类型" width="180" />
      <el-table-column prop="amount" label="金额" />
      <el-table-column prop="inputMethod" label="支付方式" />
      <el-table-column prop="remark" label="备注" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";
const tableData = reactive({
  list: [],
  letterCount : 0,
  pageSize:10,
  currentPage:1
})
/* function getIncome(){
  axios({
    url:"/income/week",
    headers:{
      "Access-Control-Allow-Origin": "*"
    }
  }).then((res:any)=>{
    console.log(res.data);
  })
}
getIncome() */
</script>
<style>

</style>