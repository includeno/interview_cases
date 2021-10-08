<template>
  <div style="display: block" align="center">
    <div style="display: flex;" >
      <a-upload
          name="file"
          :fileList="fileList"
          :beforeUpload="beforeUpload"
      >
        <a-button> <a-icon type="upload"/>上传</a-button>
      </a-upload>
      <a-button v-on:click="confirm"> <a-icon type="confirm"/>加载</a-button>
    </div>

    <br>
    <a-textarea v-model="inputProblemText" style="height: 1000px"/>


  </div>
</template>

<script>
import ProblemAPI from "@/api/ProblemAPI";
export default {
  name: "ProblemImport",
  data() {
    return {
      inputProblemText:"",
      isHeight:true,
      minHeight:0,

      fileList:[],//文件列表
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleInputChange(value) {
      //只解析带#开头的文本
      if(this.inputProblemText.startsWith("#")&&this.inputProblemText.search("\n")!=-1){

        let index=this.inputProblemText.search("\n");
        let title=this.inputProblemText.substring(0,index-1);
        let answer=this.inputProblemText.substring(index+1,this.inputProblemText.length);
        this.form.setFieldsValue({
          Title: title,
          Answer:answer,
        });

      }
      else {
        this.form.setFieldsValue({
          Title: ``,
          Answer:``,
        });
      }

    },
    async confirm() {
      if (this.inputProblemText != '') {
        let array = (JSON.parse((this.inputProblemText)));//数组
        for (let i = 0; i < array.length; i++) {

          let temp = []
          for (let j in array[i].answer) {
            temp.push(array[i].answer[j]);
          }

          await ProblemAPI.postProblem(this.STORE.state.host,array[i].title, array[i].answer, array[i].tag)
        }
      }
    },
    beforeUpload(file){
      var that=this;
      //只读取json文件
      if(file.type === 'application/json'){
        var reader = new FileReader();
        //将文件以文本形式读入页面
        reader.readAsText(file);
        reader.onload=async ()=>{
          //let array=(JSON.parse((reader.result)));//数组
          this.inputProblemText=reader.result;

          // for(let i=0;i<array.length;i++){
          //
          //   let temp=[]
          //   for(let j in array[i].answer){
          //     temp.push(array[i].answer[j]);
          //   }
          //
          //   await ProblemAPI.postProblem(array[i].title,array[i].answer,array[i].tag)
          // }
          that.fileList=[]
          return true;
        }
      }
      else{
        alert("file not exist!");
        return false;
      }
    },
  },
};
</script>