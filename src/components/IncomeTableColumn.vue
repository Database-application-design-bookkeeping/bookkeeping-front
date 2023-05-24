<template>
    <!-- 该组件是展示收入信息的table表格 -->
    <el-table-column type="index" label="编号" width="60" />
    <el-table-column prop="createTime" label="创建日期" min-width="180px"/>
    <el-table-column prop="categoryName" label="类型" min-width="180px"/>
    <el-table-column prop="amount" label="金额" min-width="180px"/>
    <el-table-column prop="inputMethod" label="收入来源" min-width="180px"/>
    <el-table-column prop="remark" label="备注" min-width="180px"/>
</template>