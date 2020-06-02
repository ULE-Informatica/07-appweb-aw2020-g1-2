import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedin: false
  },
  mutations: {
    toggleLoggedin: state => {
    state.isLoggedin = !state.isLoggedin
  }
},
  actions: {},
  modules: {}
});
