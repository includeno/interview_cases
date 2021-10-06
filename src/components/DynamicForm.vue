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
  name: "DynamicForm",
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      inputProblemText:"",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          ProblemAPI.postProblem(values["Title"],values["Answer"],values["Tag"]);
          console.log('Received values of form: ', values);
        }
      });

    },
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
  },
};
</script>