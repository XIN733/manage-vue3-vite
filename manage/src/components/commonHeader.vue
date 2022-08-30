<template>
    <header>
        <div class="l-content">
            <el-button icon="Menu" size="mini" @click="handleCollapse"></el-button>
            <el-breadcrumb separator="/">
               <!-- 首页一定存在写死 -->
               <el-breadcrumb-item class="el-breadcrumb-item active" :to="{ path: '/home' }" @click="clickMenu">首页</el-breadcrumb-item>
               <el-breadcrumb-item class="el-breadcrumb-item" v-if="currentMenu&&currentMenu.parentLabel">{{currentMenu.parentLabel}}</el-breadcrumb-item>
               <el-breadcrumb-item class="el-breadcrumb-item" v-if="currentMenu">{{currentMenu.label}}</el-breadcrumb-item>
            </el-breadcrumb> 
            </div>
            <div class="r-content">
            <el-dropdown trigger="click">
                <span>
                <img :src="getImageUrl('user.jpeg')" alt="" class="user-header" />
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import {  defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    let store = useStore();
    let router = useRouter();
    const getImageUrl = (name) => {
      return new URL(`../assets/images/${name}`, import.meta.url).href;
    };
    let handleCollapse = ()=>{
      // 调用vuex中的mutations
      store.commit('tab/setCollapseMenu')
    };
    // 计算属性
    const currentMenu = computed(()=>{
        return store.state.tab.currentMenu
    });
    const clickMenu = ()=>{
        router.push({name:'home'})
        store.commit('tab/selectMenu', {
                path:'/home',
                name:'home',
                label:'首页',
                icon:'HomeFilled',
                url:'home/Home.vue'
            })
    };
    const logOut = ()=>{
      store.commit('tab/setTabsList',[
            {
                path:'/home',
                name:'home',
                label:'首页',
                icon:'HomeFilled',
                url:'home/Home.vue'
            }
      ])
      store.commit('tab/setCurrentMenu',null)
      store.commit('tab/clearMenu')
      store.commit('user/clearToken')
      router.push({name:'login'})
    };
    return { getImageUrl,handleCollapse,currentMenu,clickMenu,logOut };
  },
});
</script>

<style lang="less" scoped>
header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .l-content {
    display: flex;
    align-items: center;
    .el-breadcrumb{
      margin-left: 20px;
      .el-breadcrumb-item /deep/ .el-breadcrumb__inner {
        color: #A8ABB2 ;
        &:hover{
          opacity: 1;
        }
      }
      .el-breadcrumb-item.active  /deep/ .el-breadcrumb__inner{
        color: #fff ;
        &:hover{
          opacity: 0.8;
        }
      }
    }
  }
  .r-content {
    .user-header {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
}
</style>