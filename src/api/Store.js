import Vuex from "vuex";
import Vue from 'vue'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        host:"",
    },
    mutations: {
        setHost (state,newValue) {
            state.host=newValue;
        }
    }
});
//store.commit('setHost','sdadsddsd')

export default store