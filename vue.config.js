const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: './',
    devServer: {
        proxy: {
          "/api": {
            target: "http://www.managexpr.com:9001/jizhang", // 需要代理的后端接口
            // changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
          },
        },
      },
  transpileDependencies: true,
  lintOnSave: false,
});
