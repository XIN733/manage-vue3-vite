/* 
* 环境配置文件
* 一般在企业级项目里面有三个环境
* development 开发环境 
* test 测试环境
* production 线上环境
*/


// 当前的环境
const env = import.meta.env.MODE || 'production'
// console.log(import.meta.env.MODE)

const EnvConfig = {
    development:{ 
        baseApi:'',
        mockApi:'https://www.fastmock.site/mock/728b209192f8e866f14b968e8219e86d/api'
    },
    test:{ 
        baseApi:'',
        mockApi:'https://www.fastmock.site/mock/728b209192f8e866f14b968e8219e86d/api'
    },
    production:{ 
        baseApi:'',
        mockApi:'https://www.fastmock.site/mock/728b209192f8e866f14b968e8219e86d/api'
    },
}

export default {
  env,
  // mock的总开关
  mock:false,
  ...EnvConfig[env]
}