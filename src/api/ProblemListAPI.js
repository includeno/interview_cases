import axios from "axios";

class ProblemListAPI{
    path="/problemList"

    constructor() {
    }

    async getProblemList(host) {
        try {
            const response = await axios.get(host+this.path);
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }


}

export default new ProblemListAPI();