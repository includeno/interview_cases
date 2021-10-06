<template>
<div>
  <a-textarea placeholder="请输入问题" :rows="5" v-model="problemDescription" />

  <a-label>{{labelTag}}</a-label>
  <a-select v-model="problemTag" style="width: 300px">
    <a-select-option value="java" selected>
      Java
    </a-select-option>
    <a-select-option value="redis">
      Redis
    </a-select-option>
    <a-select-option value="mysql">
      MySQL
    </a-select-option>
    <a-select-option value="kafka">
      Kafka
    </a-select-option>
  </a-select>


</div>
</template>

<script>
export default {
  name: "ProblemAdd",
  data(){
    return {
      labelTag:"选择标签",
      problemTag:"",
      problemDescription:"",
    }
  },
  computed(){

  },
  methods:{

  },
  mounted() {
  }
}
</script>

<style scoped>

</style>