<template>
   <el-menu :default-active="currentMenu?currentMenu.path:'/home'" class="el-menu-vertical-demo" :collapse="isCollapse()" background-color="#555b66" 
   text-color="#ffffff" active-text-color="#E0B653" :collapse-transition="false">
    <h3 class="title">{{isCollapse()?'后台':'通用后台管理系统'}}</h3>
    <el-menu-item  v-for="item in noChildren()" :index="item.path" :key="item.path" @click="clickMenu(item)">
      <el-icon><component :is="item.icon" /></el-icon>
      <template #title>{{item.label}}</template>
    </el-menu-item>
    <el-sub-menu v-for="item in hasChildren()" :index="item.path" :key="item.path">
      <template #title>
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{item.label}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="subItem in item.children" :index="subItem.path" :key="subItem.path" @click="clickMenu(subItem)">
          <el-icon><component :is="subItem.icon" /></el-icon>
          <span>{{subItem.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { computed } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    setup() {
      const store = useStore();
      const router = useRouter();
      const menu = store.state.tab.menu;
      // const  menu = [
      //   {
      //       path:'/home',
      //       name:'home',
      //       label:'首页',
      //       icon:'HomeFilled',
      //       url:'home/Home.vue'
      //   },
      //   {
      //       path:'/mall',
      //       name:'mall',
      //       label:'商品管理',
      //       icon:'VideoPlay',
      //       url:'mall/Mall.vue'
      //   },
      //   {
      //       path:'/user',
      //       name:'user',
      //       label:'用户管理',
      //       icon:'User',
      //       url:'user/User.vue'
      //   },
      //   {
      //       path:'/other',
      //       label:'其他',
      //       icon:'Location',
      //       children:[
      //           {
      //               path:'/page1',
      //               name:'page1',
      //               label:'页面1',
      //               parentLabel:'其他',
      //               icon:'Setting',
      //               url:'other/Page1.vue'
      //           },
      //           {
      //               path:'/page2',
      //               name:'page2',
      //               label:'页面2',
      //               parentLabel:'其他',
      //               icon:'Setting',
      //               url:'other/Page2.vue'
      //           }
      //       ]
      //   }
      // ];
      const noChildren = ()=>{
        return  menu.filter((item)=> !item.children);
      };
      const hasChildren = ()=>{
        return  menu.filter((item)=> item.children);
      };
      const isCollapse = ()=>{
        return !store.state.tab.isCollapse
      };
      const clickMenu = (item)=>{
        router.push({name:item.name})
        store.commit('tab/selectMenu',item)
      };
      // 计算属性
      const currentMenu = computed(()=>{
          return store.state.tab.currentMenu
      });
      return{noChildren,hasChildren,isCollapse,clickMenu,currentMenu}
    },
    
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  border: none;
  height: 100%;
  .title{
    width:100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 18px;
  }
}
</style>