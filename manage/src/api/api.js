/* 
*  整个项目api的管理
*/

import request from "./request";

export default {
    getMenu(param){
        return request({
            url:'/permission/getMenu',
            method:'post',
            data:param
        })
    },
    // home组件  左侧表格数据获取
    getTableData(params){
        return request({
            url:'/home/getTableData',
            method:'get',
            data:params,
            mock:true
        })
    },
    getCountData(params){
        return request({
            url:'/home/getCountData',
            method:'get',
            data:params,
            mock:true
        })
    },
    getEchartsData(params){
        return request({
            url:'/home/getEchartsData',
            method:'get',
            data:params,
            mock:true
        })
    },
    getUserList(param){
        return request({
            url:'/user/getUserList',
            method:'get',
            data:param,
            mock:false
        })
    },
    addUser(param){
        return request({
            url:'/user/addUser',
            method:'post',
            data:param,
            mock:false
        })
    },
    editUser(param){
        return request({
            url:'/user/editUser',
            method:'post',
            data:param,
            mock:false
        })
    },
    delUser(param){
        return request({
            url:'/user/deleteUser',
            method:'post',
            data:param,
            mock:false
        })
    }
}