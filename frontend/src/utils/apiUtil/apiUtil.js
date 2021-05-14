import axios from "axios";
import { getApiUrl } from "../../helperFunctions/getApiUrl";


const config = {
    baseURL: getApiUrl(),
}




export default axios.create(config)


