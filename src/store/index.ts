import { createStore } from "vuex";

export default createStore({
  state: {
    token:"",
    username:""
  },
  getters: {},
  mutations: {
    set_token(state:any, {token, username}) {
      state.token = token;
      state.username = username;
      localStorage.token = token;
    },
    del_token(state) {
      state.token = "";
      state.username = "";
      localStorage.removeItem('token');
    },
  },
  actions: {},
  modules: {},
});
