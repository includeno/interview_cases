<template>
  <div align="center">

<!--              //eslint下必须:写法-->

      <div v-for="(entry,index) in problemdata" v-bind:key="index" >
        <ProblemEntry :title="entry.title" :answer="entry.answer" :entryindex="index"></ProblemEntry>
      </div>

      <div v-show="problemdata.length==0">
        <h1>暂无题目</h1>
      </div>



  </div>
</template>

<script>
import ProblemEntry from "@/components/ProblemEntry";
import ProblemListAPI from "@/api/ProblemListAPI";
import ProblemAPI from "@/api/ProblemAPI";
export default {
  name: "ProblemEntryList",
  components: {
    ProblemEntry,
  },
  data(){
    return {
      problemdata:[],
    }
  },
  computed(){

  },

  mounted() {
    (this.loadData)();

  },
  methods:{
    editProblemTitle(entryIndex,title,answer){
      console.log(entryIndex+title+answer)
    },
    editProblemAnswer(entryIndex,index,answerItem){
      this.problemdata[entryIndex].answer[index]=answerItem;
      let title=this.problemdata[entryIndex].title;
      let answer=this.problemdata[entryIndex].answer;
      let tag=this.problemdata[entryIndex].tag;
      ProblemAPI.putProblem(this.STORE.state.host,title,answer,tag);

    },

    async loadData() {
      this.problemdata=[];
      let response=await ProblemListAPI.getProblemList(this.STORE.state.host);
      let ans=response.data.data;
      if(ans!=null){
        for(let i in ans){
          this.problemdata.push(ans[i]);
        }
      }
    },

  },
}
</script>

<style scoped>
.board{
  text-align: center;
  margin: 0 auto;
  width: 1000px;
}
</style>