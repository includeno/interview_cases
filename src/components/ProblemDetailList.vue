<template>
  <div class="board">
    <table align="center">
<!--        //eslint下必须:写法-->
        <div v-for="(entry,index) in problemdata" v-bind:key="index" >
          <ProblemDetail :title="entry.title" :answer="entry.answer"></ProblemDetail>
        </div>

    </table>

  </div>
</template>

<script>
import ProblemDetail from '@/components/ProblemDetail.vue'

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
    this.problemdata=[];
    this.problemdata.push({title:"CCCxxsxdfvbvndkjnjkdbjasbdhsbhdb shdbshabd hsabdhbs adhbsadlnjsabdjkasbdjsajdjasndjasdbsajbdjsabdjsbajdbas",answer:["BBB","C罗"]});
    this.problemdata.push({title:"A2",answer:["BBB","我爱我的祖国"]});
    this.problemdata.push({title:"Java基础",answer:["CPU",
      "文件系统\n" ,
      "Lnuix\n" ,
      "磁盘\n" ,
      "用户态:系统态:内核态\n" ,
      "协程:进程:线程\n",
      "管程\n" ,
      "虚拟内存","我爱我的祖国"]});

  },
  methods:{

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