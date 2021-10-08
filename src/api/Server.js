import axios from "axios";

class ProblemListAPI{
    path="/connect"

    constructor() {
    }

    async connect(host) {
        try {
            const response = await axios.get(host+this.path);
            return response;
        } catch (error) {
            console.error(error);
        }
    }


}

export default new ProblemListAPI();