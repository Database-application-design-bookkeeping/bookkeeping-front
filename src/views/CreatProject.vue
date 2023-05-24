<template>
  <div class="creat-project">
    <el-form :model="form" label-width="120px" label-position="left">
    <el-form-item label="类型">
      <el-radio-group v-model="form.type">
        <el-radio label="收入" />
        <el-radio label="支出" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="方式">
      <el-select v-model="form.method" placeholder="请选择">
        <el-option v-for="method in methods" :key="method" :label="method" :value="method" />
      </el-select>
    </el-form-item>
    <el-form-item label="类别">
      <el-select v-model="form.category" placeholder="请选择">
        <el-option v-for="category in categorys.filter((element)=>{return (element.type===form.type)})" :key="category.id" :label="category.name" :value="category.id" />
      </el-select>
    </el-form-item>
    <el-form-item
      label="金额"
      prop="amount"
    >
      <el-input
        v-model.number="form.amount"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remark" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定添加</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup lang="ts">
import store from '@/store'
import axios from 'axios'
import { reactive } from 'vue'
const categorys = [{
            "id": 1,
            "name": "餐饮",
            "type": "支出"
        },
        {
            "id": 2,
            "name": "购物",
            "type": "支出"
        },
        {
            "id": 3,
            "name": "出行",
            "type": "支出"
        },
        {
            "id": 4,
            "name": "社交",
            "type": "支出"
        },
        {
            "id": 5,
            "name": "医疗",
            "type": "支出"
        },
        {
            "id": 6,
            "name": "礼物",
            "type": "支出"
        },
        {
            "id": 7,
            "name": "娱乐",
            "type": "支出"
        },
        {
            "id": 8,
            "name": "学习",
            "type": "支出"
        },
        {
            "id": 9,
            "name": "其他",
            "type": "支出"
        },
        {
            "id": 10,
            "name": "工资",
            "type": "收入"
        },
        {
            "id": 11,
            "name": "理财",
            "type": "收入"
        },
        {
            "id": 12,
            "name": "礼金",
            "type": "收入"
        },
        {
            "id": 13,
            "name": "兼职",
            "type": "收入"
        },
        {
            "id": 14,
            "name": "其他",
            "type": "收入"
        }];
const methods = ["微信","支付宝","现金","银行卡转账","股票交易","PayPal","数字货币","其它"];
const form = reactive({
  amount: '',
  method: '',
  type: '收入',
  remark: '',
  category: '',
})

function onSubmit(){
  switch(form.type){
    case "收入":{
      axios({
        method:"post",
        url:"/income/save",
        data:{
          "amount":form.amount,
          "categoryId":form.category,
          "remark":form.remark,
	        "inputMethod":form.method
        }
      }).then((res:any)=>{
        let msg = res.data.msg
        if(msg==="保存成功") {
          store.commit("sucMessage",msg)
        }else{
          store.commit("warnMessage",msg)
        }
      }).catch((err:any)=>{
        console.log(err);
      })
      break;
    }
    case "支出":{
      axios({
        method:"post",
        url:"/expense/save",
        data:{
          "amount":form.amount,
          "categoryId":form.category,
          "remark":form.remark,
	        "outputMethod":form.method
        }
      }).then((res:any)=>{
        let msg = res.data.msg
        if(msg==="保存成功") {
          store.commit("sucMessage",msg)
        }else{
          store.commit("warnMessage",msg)
        }
      }).catch((err:any)=>{
        console.log(err);
      })
      break;
    }
  }
}

</script>

<style>

</style>