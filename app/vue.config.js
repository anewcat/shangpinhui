const { defineConfig } = require('@vue/cli-service')
// 修改了
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  // 代理跨域
  devServer:{
    proxy:{
      '/api':{
        // target:'http://39.98.123.211',
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^api':''}
      }
    }
  }
})
