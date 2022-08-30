import { createApp ,h} from 'vue'
import './assets/less/index.less'
// import ElementPlus from 'element-plus'
import {  ElMessage,ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/store/index.js'
import './api/mock.js'
import api from './api/api.js'


const app = createApp({
  created:() => {
      store.commit('tab/getMenu')
      if(store.state.tab.menu.length > 0){
        router.push({name:'home'})
     }
  },
  mounted:() => {},
  render:() => h(App),
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$api = api

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox.confirm

// app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')