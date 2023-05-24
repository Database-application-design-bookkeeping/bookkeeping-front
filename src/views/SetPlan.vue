<template>
  <div class="set-plan">
    <el-form>
      <el-form-item label="设置本月预支出金额">
        <el-input v-model="expection"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveExpection">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {ref} from "vue"
let expection = ref<number>(0);
function saveExpection(){
  axios({
    url:`/expection/save?amount=${expection}`,
  })
}
</script>

<style lang="scss" scoped>

</style>