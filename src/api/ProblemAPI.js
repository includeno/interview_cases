import axios from "axios";

class ProblemAPI{
    path="/problem";

    constructor() {
    }

    async getProblem(host) {
        try {
            const response = await axios.get(host+this.path+'');
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async postProblem(host,title,answer,tag) {
        try {
            let formdata=new FormData();
            formdata.append("title",title);
            formdata.append("answer",JSON.stringify(answer));
            formdata.append("tag",tag);
            const response = await axios.post(host+this.path+'',formdata);
            //console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async putProblem(host,title,answer,tag) {
        try {
            let formdata=new FormData();
            formdata.append("title",title);
            formdata.append("answer",JSON.stringify(answer));
            formdata.append("tag",tag);
            const response = await axios.put(host+this.path,formdata);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProblem(host) {
        try {
            const response = await axios.get(host+this.path);
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new ProblemAPI();