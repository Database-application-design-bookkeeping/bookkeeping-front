import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import installElementPlus from './plugins/element'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://www.managexpr.com:9001/jizhang';
app.use(store);
app.use(router);
installElementPlus(app);
app.mount("#app");
