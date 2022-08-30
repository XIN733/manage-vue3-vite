<template>
  <div class="common-table">
    <el-table :data="props.tableData" height="calc(100% - 35px)" stripe>
      <el-table-column
        show-overflow-tooltip
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
        v-for="item in props.tableLabel"
        :key="item.prop"
      >
      </el-table-column>
      <el-table-column prop="operations" label="操作" min-width="180">
        <template #default="scope">
          <el-button @click="editUser(scope.row)" size="mini">编辑</el-button>
          <el-button type="danger" @click="deleteUser(scope.row)" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="props.config.total"
      :current-page="props.config.page"
      @current-change="changePage"
      :page-size="props.config.pageSize"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props:{
      tableData:Array,
      tableLabel:Array,
      config:Object
    },
    setup(props,{ emit }) {
      const changePage = ((page)=>{
         emit('changePage',page)
      });
      const editUser = ((row)=>{
        emit('editUser',row)
      });
      const deleteUser = ((row)=>{
        emit('deleteUser',row)
      });
      return{props,changePage,editUser,deleteUser}
    },
})
</script>

<style lang="less" scoped>
.common-table{
  background-color: #fff;
  height: calc(100vh - 200px);
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  .el-table{
    height: 90%;
    width: 100%;
  }
  .el-pagination{
    position: absolute;
    bottom: 10px;
    right: 20px;
  }
}
</style>
