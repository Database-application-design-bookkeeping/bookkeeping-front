import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import installElementPlus from './plugins/element'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import _ from 'lodash'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

//请求拦截器
axios.interceptors.request.use(function (request) {
  let token = localStorage.getItem("token");
  if(token){
    request.headers.satoken = token;
  }
    return request
}, async function (error) {
    return Promise.reject(error)
})
//响应拦截器
axios.interceptors.response.use(function (response) {
  console.log();
  if(response.data.code === 401){
    store.commit("delToken")
  }
    return response
}, async function (error) {
    return Promise.reject(error)
})
axios.defaults.baseURL = 'http://www.managexpr.com:9001/jizhang';
app.use(_);
app.use(store);
app.use(router);
installElementPlus(app);
app.mount("#app");
