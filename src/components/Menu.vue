<template>
  <div>
    <label>{{errorMessage}}</label>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="Connect" disabled>
        <a-input v-model="newHost" v-on:change="changeHost"/>

      </a-menu-item>

      <a-menu-item key="ProblemDetailList">
        <a :href="$router.resolve({name: 'ProblemDetailList'}).href">题目测试</a>
        <!--        <router-link to="/ProblemDetailList">Problem Detail List</router-link>-->
      </a-menu-item>

      <a-menu-item key="ProblemAdd">
        <a :href="$router.resolve({name: 'ProblemAdd'}).href">手动添加题目</a>
<!--        <router-link to="/ProblemAdd">Add Problem</router-link>-->
      </a-menu-item>

      <a-menu-item key="ProblemImport">
        <a :href="$router.resolve({name: 'ProblemImport'}).href">导入文件</a>
<!--        <router-link to="/ProblemImport">Import ProblemList From File</router-link>-->
      </a-menu-item>

      <a-menu-item key="ProblemEntryList">
        <a :href="$router.resolve({name: 'ProblemEntryList'}).href">题目列表</a>
<!--        <router-link to="/ProblemEntryList">List Problems</router-link>-->
      </a-menu-item>

      <a-menu-item key="Download">
        <a-button v-on:click="download">
          <a-icon type="download"/>
          下载
        </a-button>
        <!--        <router-link to="/ProblemEntryList">List Problems</router-link>-->
      </a-menu-item>

    </a-menu>
  </div>
</template>
<script>

import ProblemListAPI from "@/api/ProblemListAPI";
import Server from "@/api/Server";
export default {
  name:"Menu",
  data() {
    return {
      current: ['ProblemDetailList'],
      newHost:"http://localhost:3000",
      errorMessage:"",
    };
  },
  mounted() {
    (this.changeHost)();
  },

  methods:{
    async changeHost(){
      //变更服务器地址
      this.STORE.commit("setHost",this.newHost);
      console.log("change host"+this.newHost);
      //刷新网页

      let response=await Server.connect(this.STORE.state.host);
      if(response==null){
        this.errorMessage="连接失败";
      }
      else{
        this.errorMessage="";
      }

    },
    async download() {

      let response = await ProblemListAPI.getProblemList(this.STORE.state.host);
      if(response==null){
        alert("服务器错误 无法下载");
        return;
      }
      let ans = response.data.data;
      if (ans != null) {
        let array = [];
        for (let i in ans) {
          array.push({
            title: ans[i].title,
            answer: ans[i].answer,
            tag: ans[i].tag
          });
        }

        let url = window.URL.createObjectURL(new Blob([JSON.stringify(array)], {type: "application/json"}))
        let a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    },

  }
};
</script>
<style>

</style>
