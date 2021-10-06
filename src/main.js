import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

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
import ProblemList from "./components/ProblemList.vue";
const router = new VueRouter({
  routes: [
    { path: '/ProblemDetailList', name: 'ProblemDetailListPage', component: ProblemDetailList },
    { path: '/ProblemAdd', name: 'ProblemAdd', component: ProblemAdd },
    { path: '/ProblemList', name: 'ProblemListPage', component: ProblemList },
  ]
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
