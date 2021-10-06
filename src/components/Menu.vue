<template>
  <div>
    <a-menu v-model="current" mode="horizontal">

      <a-menu-item key="ProblemAdd">
        <router-link to="/ProblemAdd">Add Problem</router-link>
      </a-menu-item>

      <a-menu-item key="ProblemImport">
        <router-link to="/ProblemImport">Import ProblemList</router-link>
      </a-menu-item>

      <a-menu-item key="ProblemList">
        <router-link to="/ProblemList">List Problems</router-link>
      </a-menu-item>

      <a-menu-item key="ProblemDetailList">
        <router-link to="/ProblemDetailList">Go to ProblemDetailList</router-link>
      </a-menu-item>


      <a-menu-item key="DynamicForm">
        <router-link to="/DynamicForm">DynamicForm</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  name:"Menu",
  data() {
    return {
      current: ['ProblemDetailList'],
    };
  },
};
</script>
<style>

</style>
