import axios from "axios";

const BASE_URL = "skripsi-rizky.up.railway.app";

const Axios = axios.create({
    baseURL: BASE_URL,
});

export default Axios;
