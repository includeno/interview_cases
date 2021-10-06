<template>
  <div >
    <table align="center">
<!--        //eslint下必须:写法-->
      <a-button v-on:click="exportData()"><a-icon type="download" /> 下载 </a-button>
        <div v-for="(entry,index) in problemdata" v-bind:key="index" >
          <ProblemDetail :title="entry.title" :answer="entry.answer"></ProblemDetail>
        </div>

    </table>

  </div>
</template>

<script>
import ProblemDetail from '@/components/ProblemDetail.vue'
import ProblemListAPI from "@/api/ProblemListAPI";

export default {
  name: 'ProblemDetailList',
  components: {
    ProblemDetail,
  },
  props: {

  },
  data() {
    return {
      problemdata:[],

    }
  },
  mounted() {
    (this.loadData)();

  },
  methods:{

    async loadData() {
      this.problemdata=[];
      let response=await ProblemListAPI.getProblemList();
      let ans=response.data.data;
      if(ans!=null){
        for(let i in ans){
          this.problemdata.push(ans[i]);
        }
      }
    },

    exportData(){
      let array=[];
      for(let i=0;i<this.problemdata.length;i++){
        array.push({title: this.problemdata[i].title, answer: this.problemdata[i].answer, tag: this.problemdata[i].tag});
      }
      let url=window.URL.createObjectURL(new Blob([JSON.stringify(array)], {type: "application/json"}))
      let a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      a.click();
      window.URL.revokeObjectURL(url);
      //document.removeChild(a);
    },
  },
  computed:{

  }
}
</script>

<style>
.board{
  text-align: center;
  margin: 0 auto;
  width: 1000px;
}
</style>