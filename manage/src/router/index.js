import { createRouter,createWebHashHistory,createWebHistory} from "vue-router";
import store from '@/store/index.js';

const routes = [
    {
        path:'/',
        name:'main',
        component:()=>import('@/views/Main.vue'),
        redirect:'/login',
        children:[
            {
                path:'/home',
                name:'home',
                component:()=>import('@/views/home/Home.vue')
            },
            {
                path:'/mall',
                name:'mall',
                component:()=>import('@/views/mall/Mall.vue')
            },
            {
                path:'/user',
                name:'user',
                component:()=>import('@/views/user/User.vue')
            },
            {
                path:'/other/page1',
                name:'page1',
                component:()=>import('@/views/other/Page1.vue')
            },
            {
                path:'/other/page2',
                name:'page2',
                component:()=>import('@/views/other/Page2.vue')
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('@/views/login/Login.vue')
    }
]


const router = createRouter({
    history:createWebHistory(),
    routes
})


// 路由守卫
router.beforeEach((to,from,next) => {
    store.commit('user/getToken')
    // console.log(store.state.user.token)
    // console.log(to.name)
    const token = store.state.user.token
    if(!token && to.name!=='login'){
        next({name:'login'})
    }else if(token && to.name === 'login'){
        next({name:'home'})
    }else{
        next()
    }
  })
  
  
export default router