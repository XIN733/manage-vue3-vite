<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="formBox"
    label-width="100px"
    class="login-form"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名：" label-width="80px" prop="username">
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      />
    </el-form-item>
    <el-form-item label="密码：" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive,ref,getCurrentInstance} from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const formBox = ref();
    const form = reactive({
        username: "",
        password: "",
    });
    const rules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, message: "用户名长度不能小于3位", trigger: "blur" },
      ],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };
    const login =  () => {
        formBox.value.validate((valid) => {
            if(valid){
                getMenu(form);
            }else{
                return
            }
        })
    };
    const getMenu = async (form)=>{
       let data  =  await proxy.$api.getMenu(form);
       store.commit("tab/setMenu", data.menu);
       store.commit("user/setToken", data.token);
       router.push({ name: "home" });
    };
    return { form, rules, login,formBox};
  },
};
</script>

<style lang="less" scoped>
.login-form {
  width: 350px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  margin: 180px auto;
  h3 {
    text-align: center;
    margin-bottom: 30px;
    color: #505458;
  }
  .el-button {
    margin-top: 10px;
  }
}
</style>