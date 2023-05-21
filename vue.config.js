const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    server:{
        port:9001
    },
  transpileDependencies: true,
  lintOnSave: false,
  /* proxy: {
    '/api': {
        target: 'http://www.managexpr.com/jizhang', //接口域名
        changeOrigin: true,             //是否跨域
        ws: true,                       //是否代理 websockets
        secure: false,                   //是否https接口
        pathRewrite: {                  //路径重置
            '^/api': ''
        }
    }
} */
});
