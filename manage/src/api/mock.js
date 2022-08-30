import Mock from 'mockjs';
import homeApi from '@/api/mockData/home.js';
import userApi from '@/api/mockData/user.js';
import permissionApi from '@/api/mockData/permission.js';

// 拦截请求
Mock.mock("/permission/getMenu",'post',permissionApi.getMenu);

Mock.mock('/home/getTableData','get',homeApi.getHomeData);

Mock.mock(/user\/getUserList/,'get',userApi.getUserList);

Mock.mock("/user/addUser",'post',userApi.createUser);

Mock.mock("/user/editUser",'post',userApi.updateUser);

Mock.mock("/user/deleteUser",'post',userApi.deleteUser);