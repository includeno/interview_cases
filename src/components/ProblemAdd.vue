<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="Title">
      <a-input
          v-decorator="['Title', { rules: [{ required: true, message: 'Please input your Title!' }] }]"
      />
    </a-form-item>

    <a-form-item label="Answer">
      <a-textarea
          v-decorator="['Answer', { rules: [{ required: false, message: 'Please input your Answer!' }] }]"
      />
    </a-form-item>

    <a-form-item label="Tag">
      <a-select
          v-decorator="[
          'Tag',
          { rules: [{ required: true, message: 'Please select your Tag!' }] },
        ]"
          placeholder="Select a option and change input text above"
      >
        <a-select-option value="Java">
          Java
        </a-select-option>
        <a-select-option value="Redis">
          Redis
        </a-select-option>

        <a-select-option value="MySQL">
          MySQL
        </a-select-option>
        <a-select-option value="Kafka">
          Kafka
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="InputArea">
      <a-textarea v-model="inputProblemText" @change="handleInputChange"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import ProblemAPI from "@/api/ProblemAPI";

export default {
  name: "ProblemAdd",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {name: 'coordinated'}),
      inputProblemText: "",
    };
  },
  methods: {
    //去左空格;
    ltrim(s) {
      return s.replace(/(^\s*)/g, "");
    },
    //去右空格;
    rtrim(s) {
      return s.replace(/(\s*$)/g, "");
    },
    //去左右空格;
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let answer = values["Answer"];
          let array = answer.split("\n");
          let temp = [];
          for (let i in array) {
            if (this.trim(array[i]) != '') {
              temp.push(array[i]);
            }
          }
          ProblemAPI.postProblem(this.STORE.state.host,values["Title"], temp, values["Tag"]);

        }
      });

    },
    // eslint-disable-next-line no-unused-vars
    handleInputChange(value) {
      //只解析带#开头的文本
      if (this.inputProblemText.startsWith("#") && this.inputProblemText.search("\n") != -1) {

        let index = this.inputProblemText.search("\n");
        let title = this.inputProblemText.substring(0, index - 1);
        let answer = this.inputProblemText.substring(index + 1, this.inputProblemText.length);
        this.form.setFieldsValue({
          Title: title,
          Answer: answer,
        });

      } else {
        this.form.setFieldsValue({
          Title: ``,
          Answer: ``,
        });
      }

    },
  },
};
</script>