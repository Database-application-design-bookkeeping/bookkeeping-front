import { createStore } from "vuex";
import { ElMessage } from 'element-plus'

export default createStore({
  state: {
    token:"",
    username:""
  },
  getters: {
    getToken(state){
      return state.token;
    },
    getUserName(state){
      return state.username;
    }
  },
  mutations: {
    setToken(state:any, {token, username}) {
      state.token = token;
      state.username = username;
      localStorage.token = token;
    },
    delToken(state) {
      state.token = "";
      state.username = "";
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    sucMessage(state,msg:string){
      ElMessage({
        message:msg,
        type:"success"
      })
    },
    warnMessage(state,msg:any){
      ElMessage({
        message:msg,
        type:"warning"
      })
    }
  },
  actions: {},
  modules: {},
});
