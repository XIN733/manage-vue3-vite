import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'


export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // 打包
  // build: {
  // target: 'modules',
  //   minify:'terser', // 混淆器，terser构建后文件体积更小
  // outDir: 'dist', //指定输出路径
  // assetsDir: 'assets', // 指定生成静态资源的存放路径
  //   terserOptions: {
  //     compress: {
  //       drop_console: true,
  //       drop_debugger: true,
  //     },
  //   },
  //   // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
  //   rollupOptions: {
  //     output: { //静态资源分类打包
  //       chunkFileNames: 'static/js/[name]-[hash].js',
  //       entryFileNames: 'static/js/[name]-[hash].js',
  //       assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
  //       manualChunks(id) { //静态资源分拆打包
  //         if (id.includes('node_modules')) {
  //           return id.toString().split('node_modules/')[1].split('/')[0].toString();
  //         }
  //       }
  //     }
  //   }
  // },
  // css: {
  //   // css预处理器
  //   preprocessorOptions: {
  //     less: {
  //       charset: false,
  //       additionalData: '@import "./src/assets/style/global.less";',
  //     },
  //   },
  // },
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    // port: 8080,
    // host: "192.168.17.243",
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.17.243:3000',   //代理接口
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
