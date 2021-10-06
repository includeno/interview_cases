import axios from "axios";
import host from "@/api/Host";

class ProblemListAPI{
    path=host+"/problemList"

    constructor() {
    }

    async getProblemList() {
        try {
            const response = await axios.get(this.path+'');
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }


}

export default new ProblemListAPI();