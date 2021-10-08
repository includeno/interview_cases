<template>
  <div style="width: 1200px;display: flex;margin: 0 -70px">
    <div>
      <a-card style="width: 1200px;height: auto">

        <label slot="title">{{ simpleTitle }}</label>
        <div slot="extra" style="display: inline-flex;">
          <button v-on:click="speakTitle()">
            <a-icon type="sound"/>
          </button>
          <button v-on:click="speakTitle()">
            <a-icon type="delete"/>
          </button>
        </div>

        <div align="left">
          <button style="margin-top: 0;margin-bottom: 1em;" v-on:click="speakAnswer()">
            <a-icon type="sound"/>
            所有答案
          </button>
          <div v-for="(item,index) in simpleAnswer" v-bind:key="index">
            <div>
              <button slot="extra" v-on:click="speak(item)">
                <a-icon type="sound"/>
              </button>
              <button slot="extra" v-on:click="edit(index)">
                <a-icon type="edit"/>
              </button>
              <div v-show="editFlag[index]==0" align="left">

                <!--                <a-input v-model="editList[index]" />-->
                <p>
                  {{ editList[index] }}
                </p>
              </div>
              <div v-show="editFlag[index]==1" v-on:blur="blur(index)">
                <a-textarea v-model="editList[index]" v-on:change="onChange(index)"/>

                <a-button v-on:click="confirm(index)"><a-icon type="check" /></a-button>
                <a-button v-on:click="cancel(index)"><a-icon type="close" /></a-button>
              </div>

            </div>
          </div>
        </div>

      </a-card>


    </div>


  </div>
</template>
<script>
export default {
  name: "ProblemEntry",
  props: ['title', 'answer', 'entryindex'],
  data() {
    return {
      editList: [],
      editFlag: [],
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.editList = [];
      for (let i in this.answer) {
        this.editList.push(this.answer[i]);
        this.editFlag.push(0);
      }
    },
    loadWithoutFlag() {
      this.editList = [];
      for (let i in this.answer) {
        this.editList.push(this.answer[i]);
      }
    },
    blur(index){
      this.cancel(index);
    },
    onChange(index){
      let answer=this.editList[index];
      answer=answer.replace("\n","");
      this.editList[index]=answer;
    },
    confirm(index) {
      this.$parent.editProblemAnswer(this.entryindex, index, this.editList[index]);
      this.editFlag[index] = 0;
      this.loadWithoutFlag();
    },
    cancel(index) {
      console.log("cancel:" + index );
      this.editFlag[index] = 0;
      this.loadWithoutFlag();
    },
    edit(index) {

      if (this.editFlag[index] == 0) {
        this.editFlag[index] = 1;
      } else {
        this.editFlag[index] = 0;
      }

      this.loadWithoutFlag();
    }
    ,
    speakTitle() {
      this.speak(this.simpleTitle);
    }
    ,
    speakAnswer() {
      for (let i in this.simpleAnswer) {
        this.speak(this.simpleAnswer[i]);
      }

    }
    ,
    speak(text) {
      //https://blog.csdn.net/weixin_42999453/article/details/107974781
      var msg = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(msg);
    }
    ,
    onAudioResult(data) {
      console.log('The blob data:', data);
      console.log('Downloadable audio', window.URL.createObjectURL(data));

      let url = window.URL.createObjectURL(data)
      var a = document.createElement('a');
      a.href = url;
      a.download = 'data.mp3';
      a.click();
      window.URL.revokeObjectURL(url);

    }
    ,


  },
  computed: {
    simpleTitle() {
      return this.title;
    }
    ,
    simpleAnswer() {
      return this.answer;
    }

  }
}
</script>


<style>
td {
  width: 300px;
}

.title {
  border: 1px solid #d4d4d4;
  width: 300px;
  height: 20px;
  margin-left: -1px;
  margin-right: -1px;
}

.answer {
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