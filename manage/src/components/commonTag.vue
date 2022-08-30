<template>
  <div class="tags">
    <el-tag
      :closable="item.name !== 'home'"
      size="small"
      @close="handleClose(item, index)"
      v-for="(item, index) in tabsList"
      :key="item.path"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      >{{ item.label }}</el-tag
    >
  </div>
</template>


<script>
import { useStore } from "vuex";
import { useRouter,useRoute } from "vue-router";

export default {
  setup() {
    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    const tabsList = store.state.tab.tabsList;
    const changeMenu = (item) => {
      router.push({ name: item.name });
      store.commit("tab/selectMenu", item);
    };
    const handleClose = (item, index) => {
      const length = tabsList.length - 1;
      let nextItem = "";
      if (item.name === route.name) {
        if (index === length) {
          nextItem = tabsList[index - 1];
        } else {
          nextItem = tabsList[index + 1];
        }
        router.push({ name: nextItem.name });
        store.commit("tab/selectMenu", nextItem);
      }
      store.commit('tab/closeTag',item)
    };
    return { tabsList, changeMenu, handleClose };
  },
};
</script>


<style lang="less" scoped>
.el-tag {
  margin-right: 10px;
  height: 25px;
}
</style>