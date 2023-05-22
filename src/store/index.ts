import { createStore } from "vuex";

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
    },
  },
  actions: {},
  modules: {},
});
