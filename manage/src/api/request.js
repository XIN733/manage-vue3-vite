// 二次封装axios  对所有接口做统一的处理
import axios from "axios";
import config from "../config";

const NETWORK_ERROR = '网络请求异常，请稍后重试...'
// 创建一个axios实例对象
const service = axios.create({
    baseURL:config.baseApi
})

// 在请求之前做一些事情
service.interceptors.request.use((req)=>{
   //可以自定义header
   //jwt-token 认证的时候 
   return req
},(error)=>{
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 在请求之后做一些事情
service.interceptors.response.use((res)=>{
   const {code,data,msg} = res.data
   // 根据后端协商视情况而定
   if(code==200){
      if(data.message){
        ElMessage.success(data.message);
      }
      return  data
   }else{
      ElMessage.error(msg || NETWORK_ERROR)
      return Promise.reject(msg || NETWORK_ERROR);
   }
},(error)=>{
    // 对响应错误做些什么
    return Promise.reject(error);
})

// 封装的核心函数
function request(options){
    // 相当于一下模板
    // {
    //     method:'get',
    //     data:{},
    //     mock:false
    // }
    // 默认get请求
    options.method = options.method || 'get'
    if(options.method.toLowerCase() == 'get'){ //支持字母大写GET
        options.params = options.data
    }
    // 对mock的处理
    let isMock = config.mock
    if(typeof options.mock !== 'undefined'){
        isMock = options.mock
    }
    // 对线上环境做处理
    // if(config.env == 'production'){
        // 如果是线上环境就用不了mock
        // service.defaults.baseURL = config.baseApi
    // }else{
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    // }
    return service(options)
}

export default request
