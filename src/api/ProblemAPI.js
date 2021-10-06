import axios from "axios";
import host from "@/api/Host";

class ProblemAPI{
    path=host+"/problem"

    constructor() {
    }

    async getProblem() {
        try {
            const response = await axios.get(this.path+'');
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async postProblem(title,answer,tag) {
        try {
            let formdata=new FormData();
            formdata.append("title",title);
            formdata.append("answer",JSON.stringify(answer));
            formdata.append("tag",tag);
            const response = await axios.post(this.path+'',formdata);
            //console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async putProblem() {
        try {
            const response = await axios.get(this.path+'');
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProblem() {
        try {
            const response = await axios.get(this.path+'');
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new ProblemAPI();