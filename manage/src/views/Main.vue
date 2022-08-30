<template>
  <el-container>
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main>
        <common-tag></common-tag>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {defineComponent } from "vue";
import commonHeader from "@/components/commonHeader.vue";
import commonAside from "@/components/commonAside.vue";
import commonTag from "@/components/commonTag.vue";

export default defineComponent({
  components: {
    commonHeader,
    commonAside,
    commonTag
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less">
.el-container {
  height: 100%;
  .el-header{
    background-color: #343334;
  }
  .el-main{
    background-color: #F5F4F6;
  }
}
</style>