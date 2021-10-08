import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

//yarn add axios

//yarn add @musoftware/vue-record
import VueRecord from '@musoftware/vue-record'
Vue.use(VueRecord)

//yarn add vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

//VueRouter
import ProblemDetailList from "./components/ProblemDetailList.vue";
import ProblemAdd from "./components/ProblemAdd.vue";
import ProblemEntryList from "./components/ProblemEntryList.vue";
import DynamicForm from "./components/DynamicForm.vue";
import ProblemImport from "@/components/ProblemImport";

const router = new VueRouter({
  routes: [
    { path: '/ProblemDetailList', name: 'ProblemDetailList', component: ProblemDetailList },
    { path: '/ProblemAdd', name: 'ProblemAdd', component: ProblemAdd },
    { path: '/ProblemEntryList', name: 'ProblemEntryList', component: ProblemEntryList },
    { path: '/DynamicForm', name: 'DynamicForm', component: DynamicForm },
    { path: '/ProblemImport', name: 'ProblemImport', component: ProblemImport },
  ]
});
import store from '@/api/Store.js'
Vue.prototype.STORE = store


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
