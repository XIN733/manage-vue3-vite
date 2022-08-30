<template>
    <el-form :model="props.form" label-width="120px" ref="form" :inline="props.inline">
        <el-form-item  v-for="item in props.formLabel" :key="item.label" :label="item.label">
            <el-input v-model="props.form[item.model]"  v-if="item.type === 'input'" :placeholder="'请输入'+item.label" />
            <el-switch v-model="props.form[item.model]"  v-if="item.type === 'switch'" />
            <el-date-picker v-model="props.form[item.model]" v-if="item.type === 'date'" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="选择日期" />
            <el-select v-model="props.form[item.model]" v-if="item.type === 'select'" placeholder="请选择" >
                <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item><slot></slot></el-form-item>
    </el-form>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props:{
      formLabel:Array,
      form:Object,
      inline:Boolean //布局方式
    },
    setup(props) {
       
       return{props}
    },
})
</script>

<style lang="less" scoped>
.el-form--inline .el-form-item{
    margin-right: 10px;
}
</style>