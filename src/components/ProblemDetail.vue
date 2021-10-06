<template>
  <div style="width: 1200px;display: flex;margin: 0 -70px">
    <div >
      <a-card style="width: 750px;height: auto">

        <label  slot="title">{{simpleTitle}}</label>
        <div slot="extra" style="display: inline-flex;">
          <button  v-on:click="speakTitle()"><a-icon type="sound" /></button>
          <VueRecordAudio style="height: 27px;width: 30px;display: block;border-radius: unset;background-color: #2A6DE7"   @result="onResult"></VueRecordAudio>

        </div>


        <div align="left">
          <button style="margin-top: 0;margin-bottom: 1em;"  v-show="recordings.length>0" v-on:click="speakAnswer()"><a-icon type="sound" />所有答案</button>
          <div v-show="recordings.length>0" v-for="(item,index) in simpleAnswer" v-bind:key="index">
            <div><p align="left"><button slot="extra" v-on:click="speak(item)"><a-icon type="sound" /></button>  {{item}}</p></div>

          </div>
        </div>

      </a-card>


    </div>
    <div >
      <a-card style="width: 400px;height: auto">
        <label slot="title">音频记录</label>
        <div v-show="recordings.length>0" >
          <div v-for="(record, index) in recordings" :key="index" class="recorded-item">
            <div class="audio-container"><audio :src="record.src" controls /><button @click="removeRecord(index)" class="button is-dark">delete</button></div>
            <div></div>
          </div>
        </div>
      </a-card>
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
  height: 54px;
}
.audio-container {
  display: flex;
  height: 54px;
  margin-right: 16px;
}
</style>