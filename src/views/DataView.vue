<template>
  <div class="data-view">
    <el-space direction="vertical" size="large" style="width: 100%;" fill="true" class="data-literal">
      <el-row v-for="msg in userAmount" :key="msg">
        <el-col :span="6" >
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
    <div class="chart-box">
      <div id="chartDom1" class="chart-item"></div>
      <div id="chartDom2" class="chart-item"></div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import axios from "axios";
import { onMounted, reactive,ref } from "vue";
let expenseChartData = <any>[];
  let incomeChartData = <any>[];
let categoryChartData = reactive([{
            id: 1,
            name: "餐饮",
            type: "支出",
            amount:0,
        },
        {
            id: 2,
            name: "购物",
            type: "支出",
            amount:0
        },
        {
            id: 3,
            name: "出行",
            type: "支出",
            amount:0
        },
        {
            id: 4,
            name: "社交",
            type: "支出",
            amount:0
        },
        {
            id: 5,
            name: "医疗",
            type: "支出",
            amount:0
        },
        {
            id: 6,
            name: "礼物",
            type: "支出",
            amount:0
        },
        {
            id: 7,
            name: "娱乐",
            type: "支出",
            amount:0
        },
        {
            id: 8,
            name: "学习",
            type: "支出",
            amount:0
        },
        {
            id: 9,
            name: "其他",
            type: "支出",
            amount:0
        },
        {
            id: 10,
            name: "工资",
            type: "收入",
            amount:0
        },
        {
            id: 11,
            name: "理财",
            type: "收入",
            amount:0
        },
        {
            i: 12,
            name: "礼金",
            type: "收入",
            amount:0
        },
        {
            id: 13,
            name: "兼职",
            type: "收入",
            amount:0
        },
        {
            id: 14,
            name: "其他",
            type: "收入",
            amount:0
        }]);
let userAmount = reactive({
  income: {
    day: 0,
    week: 0,
    month: 0,
    total: 0,
    titles:["今日收入","本周收入","本月收入","总收入"]
  },
  expense: {
    day: 0,
    week: 0,
    month: 0,
    total: 0,
    titles:["今日支出","本周支出","本月支出","总支出"]
  },
  balance: {
    day: 0,
    week: 0,
    month: 0,
    total: 0,
    titles:["今日收益","本周收益","本月收益","总收益"]
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

//用来存chart图表的data信息
let expenseVos = reactive({
  list:[]
})
let incomeVos = reactive({
  list:[]
})

//用来处理后端数据，具体作用可以返回支出/收入的各个小类别的花费情况
function assignmentData(data:any,type:any){
  data.list.map((listItem:any)=>{
    categoryChartData.map((dataItem:any)=>{
      if(listItem.categoryName===dataItem.name&&dataItem.type===type){
        dataItem.amount +=listItem.amount
    }
    })
  })
}

function getIncome(){
  axios({
    url:"/income/info/total",
  }).then((res:any)=>{
    if(res.data.msg==="查询成功"){
      let expense = res.data.data
      incomeVos.list = expense.incomeVos
      assignmentData(incomeVos,"收入")
      categoryChartData.map((item:any)=>{
        if(item.type==="收入"){
          incomeChartData.push({value:item.amount,name:item.name});
        }
      })
      initCharts();
    }
  }).catch((err:any)=>{
    console.log(err);
  })
}

function getExpense(){
  axios({
    url:"/expense/info/total",
  }).then((res:any)=>{
    if(res.data.msg==="查询成功"){
      let expense = res.data.data
      expenseVos.list = expense.expenseVos
      assignmentData(expenseVos,"支出")
      categoryChartData.map((item:any)=>{
        if(item.type==="支出"){
          expenseChartData.push({value:item.amount,name:item.name});
        }
      })
      initCharts();
    }
  }).catch((err:any)=>{
    console.log(err);
  })
}
//echarts 图表
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;

function initCharts(){
let chartDom1 = echarts.init(document.getElementById('chartDom1'));
let chartDom2 = echarts.init(document.getElementById('chartDom2'));
let expenseOption: EChartsOption;
let incomeOption: EChartsOption;
//支出部分配置
expenseOption = {
  title: {
    text: '支出项目',
    subtext: '占比',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: expenseChartData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

//收入部分配置
incomeOption = {
  title: {
    text: '收入项目',
    subtext: '占比',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: incomeChartData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
chartDom1.setOption(expenseOption);
chartDom2.setOption(incomeOption);
}
onMounted(()=>{
  getIncome()
  getExpense()
  getUserAmount()
})
</script>

<style lang="scss" scoped>
.data-view{
  .chart-box{
    display: flex;
    justify-content: space-between;
    .chart-item{
      width: 50%;
      min-width: 450px;
      height: 300px;
    }
  }
.data-literal{
  width: 100%;
  height: 300px;
}
}

</style>