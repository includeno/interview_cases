<template>
  <div id="app">

    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>

<script>

import Menu from "@/components/Menu";
export default {
  name: 'App',
  components: {
    Menu,
  },
  data(){
    return {
      current: ['ProblemDetailList'],
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
