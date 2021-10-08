<template>
  <div>

    <table align="center">
      <!--        //eslint下必须:写法-->
      <a-button v-show="problemdata.length>0" v-on:click="changeMode()">改变模式</a-button>

      <div v-show="problemdata.length==0">
        <h1>暂无题目</h1>
      </div>

      <div v-if="mode=='single'">
        <a-button v-show="problemdata.length!=0" v-on:click="modeIndexSubstract">-</a-button>
        <a-button v-show="problemdata.length!=0" v-on:click="modeIndexAdd">+</a-button>
        <label v-show="problemdata.length!=0" >当前第{{modeIndex+1}}个</label>

        <div v-show="problemdata.length>0">
          <ProblemDetail v-if="problemdata.length>=0" :title="problemdata[modeIndex].title" :answer="problemdata[modeIndex].answer"></ProblemDetail>
        </div>
      </div>
      <div v-else>
        <div v-show="mode=='list'&&problemdata.length!=0" v-for="(entry,index) in problemdata" v-bind:key="index">
          <ProblemDetail v-show="mode=='list'&&problemdata.length!=0" :title="entry.title" :answer="entry.answer"></ProblemDetail>
        </div>
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
  props: {},
  data() {
    return {
      problemdata: [],
      mode:"list",//single list
      modeIndex:0,
    }
  },
  mounted() {
    (this.loadData)();

  },
  methods: {
    modeIndexAdd(){
      if(this.modeIndex<this.problemdata.length-1){
        this.modeIndex++;
      }
    },
    modeIndexSubstract(){
      if(this.modeIndex>0){
        this.modeIndex--;
      }
    },
    changeMode() {
      if(this.mode=='list'){
        this.mode='single';

        if(this.modeIndex>this.problemdata.length-1){
          this.modeIndex=0;
        }
      }
      else{
        this.mode='list';
      }

    },

    async loadData() {
      this.problemdata = [];
      let response = await ProblemListAPI.getProblemList(this.STORE.state.host);
      if(response==null){
        alert("！")
        return;
      }
      let ans = response.data.data;
      if (ans != null) {
        console.log(ans)
        for (let i in ans) {
          if(ans[i]==null){
            continue;
          }
          console.log(ans[i])
          let title=ans[i].title;
          let answer=ans[i].answer;
          let tag=ans[i].tag;

          this.problemdata.push({title:title,answer:answer,tag:tag});
        }
        this.modeIndex=0;
      }
    },

  },
  computed: {}
}
</script>

<style>
.board {
  text-align: center;
  margin: 0 auto;
  width: 1000px;
}
</style>