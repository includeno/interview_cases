<template>
  <div style="width: 1200px;display: flex;height: auto;margin: 0 -70px">
    <div >
      <a-card style="width: 750px;height: 100%">
        <div slot="title">{{simpleTitle}}</div>

        <button slot="extra" v-on:click="speakTitle()">阅读题目</button>
        <button v-if="recordings.length>0" slot="extra" v-on:click="speakAnswer()">阅读所有答案</button>

        <div v-for="(item,index) in simpleAnswer" v-bind:key="index">
          <div><p align="left"><button slot="extra" v-on:click="speak(item)">阅读答案</button>{{index}}. {{item}}</p></div>

        </div>

      </a-card>


    </div>
    <div style="width: 400px" class="ant-card ant-card-bordered">
      <VueRecordAudio @result="onResult"></VueRecordAudio>

      <div v-if="recordings.length>0" class="recorded-audio">
        <div v-for="(record, index) in recordings" :key="index" class="recorded-item">
          <div class="audio-container"><audio :src="record.src" controls /></div>
          <div><button @click="removeRecord(index)" class="button is-dark">delete</button></div>
        </div>
      </div>
    </div>


  </div>
</template>

//折叠面板https://ant.design/components/collapse-cn/
//ant design 自定义title的问题 https://blog.csdn.net/ks8380/article/details/117462419

//音频录制 yarn add @musoftware/vue-record
https://yarnpkg.com/package/@musoftware/vue-record
<script>
export default {
  name: 'ProblemDetail',
  props: ['title','answer'],
  data() {
    return {
      recordMode: {
        audio: 'hold',
        video: 'press'
      },
      recordings: []
    }
  },
  mounted() {

  },
  methods:{
    speakTitle(){
      this.speak(this.simpleTitle);
    },
    speakAnswer(){
      for(let i in this.simpleAnswer){
        this.speak(this.simpleAnswer[i]);
      }

    },
    speak(text){
      //https://blog.csdn.net/weixin_42999453/article/details/107974781
      var msg = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(msg);
    },
    onAudioResult(data){
      console.log('The blob data:', data);
      console.log('Downloadable audio', window.URL.createObjectURL(data));

      let url=window.URL.createObjectURL(data)
      var a = document.createElement('a');
      a.href = url;
      a.download = 'data.mp3';
      a.click();
      window.URL.revokeObjectURL(url);

    },
    removeRecord (index) {
      this.recordings.splice(index, 1)
    },
    onResult (data) {
      this.recordings.push({
        src: window.URL.createObjectURL(data)
      })
    }
  },
  computed:{
    simpleTitle(){
      return this.title;
    },
    simpleAnswer(){
      return this.answer;
    }

  }
}
</script>

<style>
td{
  width: 300px;
}
.title{
  border: 1px solid #d4d4d4;
  width: 300px;
  height: 20px;
  margin-left: -1px;
  margin-right: -1px;
}
.answer{
  width: 300px;
  margin-bottom: 20px;
  border: 1px solid #d4d4d4;
  border-radius: 2px;
  padding: 12px 20px 13px;
  background: #fff;
  display: block;
  word-break: break-all;

}


.recorded-audio {
  margin: 0 auto;
  height: auto;
  overflow: auto;
  border: thin solid #eee;
  background-color: #f7f7f7;
  padding: 10px 5px;


}
.recorded-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.audio-container {
  display: flex;
  height: 54px;
  margin-right: 16px;
}
</style>