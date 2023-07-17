import axios from "axios";

const BASE_URL = "https://skripsi-rizky.up.railway.app";

const Axios = axios.create({
    baseURL: BASE_URL,
});

export default Axios;
