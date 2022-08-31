<template>
  <div class="manage">
     <el-dialog v-model="dialogVisible" :title="operateType==='add'?'新增用户':'编辑用户'" :close-on-click-modal="false">
        <common-form :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></common-form>
        <div class="dialog-footer" >
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
        </div>
     </el-dialog>
     <div class="manage-header">
      <el-button type="primary" @click="addUserBtn">+新增</el-button>
      <common-form :formLabel="formLabel" :form="searchForm" :inline="true" ref="form"  class="search-form" >
        <el-button type="primary" @click="getUserList(searchForm.keyword)">搜索</el-button>
      </common-form>
     </div>
     <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config" class="tabel-wrap" 
     @changePage="changePage"  @editUser="editUserBtn" @deleteUser="deleteUserBtn"></common-table>
  </div>
</template>

<script>
import { defineComponent, onMounted ,getCurrentInstance,ref, reactive} from "vue";
import commonTable from '@/components/commonTable.vue';
import commonForm from '@/components/commonForm.vue';

export default defineComponent({
  components:{
    commonTable,
    commonForm
  },
  setup() {
    const { proxy } = getCurrentInstance();
    let operateType = ref('add');
    let dialogVisible = ref(false);
    const operateFormLabel = ref([
            {
                model:'name',
                label:'姓名',
                type:'input'
            },
            {
                model:'age',
                label:'年龄',
                type:'input'
            },
            {
                model:'sex',
                label:'性别',
                type:'select',
                opts:[
                    {
                        label:'男',
                        value:1
                    },
                    {
                        label:'女',
                        value:0
                    }
                ]
            },
            {
                model:'birth',
                label:'出生日期',
                type:'date'
            },
            {
                model:'addr',
                label:'地址',
                type:'input'
            }
    ]);
    let operateForm = ref({
          name:'',
          age:'',
          sex:'',
          sexLabel:'',
          birth:'',
          addr:''
    });
    const formLabel = ref([
           {
                model:'keyword',
                label:'',
                type:'input'
            }
    ]);
    let searchForm = reactive({keyword:''});
    const tableLabel = ref([
          {
            prop:'name',
            label:'姓名'
          },
           {
            prop:'age',
            label:'年龄'
          },
           {
            prop:'sexLabel',
            label:'性别'
          },
           {
            prop:'birth',
            label:'出生日期',
            width:200
          },
           {
            prop:'addr',
            label:'地址',
            width:320
          },
    ]);
    let tableData = ref([]);
    let config = reactive({
          total:1,
          page:1,
          pageSize:20,
          loading:false
    });
    const getUserList = async (name='') => {
        name?config.page=1:'';
        let res = await proxy.$api.getUserList({name,page:config.page,limit:config.pageSize});
        tableData.value = res.list.map(item => {
          item.sexLabel = item.sex==1?'男':'女';
          return item
        });
        config.total = res.count;
        config.loading = false;
    };
    onMounted(() => {
        config.loading = true;
        getUserList();
    });
    const changePage = ((page)=>{ //分页
      config.page = page;
      config.loading = true;
      getUserList();
    });
    const addUserBtn = (()=>{//显示添加弹窗
      dialogVisible.value=true;
      operateType.value = 'add';
      operateForm.value = {
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:'',
          sexLabel:''
      };
    });
    const editUserBtn = ((row)=>{//显示编辑弹窗
      dialogVisible.value=true;
      operateType.value = 'edit';
      operateForm.value = {...row};
    });
    const deleteUserBtn = ((row)=>{ //删除用户
      proxy.$confirm(
        "此操作将永久删除该文件，是否继续？",
        "提示",
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        delUser(row.id)
      }).catch(() => {
        proxy.$message.info('取消删除')
      })
    });
    const addUser = async (operateForm)=>{
      await proxy.$api.addUser(operateForm);
      dialogVisible.value=false;
      config.loading = true;
      getUserList();
    };
    const editUser = async (operateForm)=>{
      await proxy.$api.editUser(operateForm);
      dialogVisible.value=false;
      config.loading = true;
      getUserList();
    };
    const delUser = async (id)=>{
      await proxy.$api.delUser(id);
      config.loading = true;
      getUserList();
    };
    const confirm = (()=>{ //添加或编辑
      if(operateType.value === 'edit'){
        editUser(operateForm.value)
      }else{
        addUser(operateForm.value)
      }
    });
    return{tableData,tableLabel,config,changePage,operateType,
    dialogVisible,operateFormLabel,operateForm,formLabel,searchForm,confirm,
    addUserBtn,editUserBtn,deleteUserBtn,getUserList}
  },
});
</script>

<style lang="less" scoped>
.manage {
  width: 100%;
  padding-top: 20px;
  .dialog-footer{
    text-align: right;
  }
  .manage-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search-form{
      height: 32px;
      overflow: hidden;
    }
  }
  .tabel-wrap{
    margin-top: 20px;
  }
}
</style>
