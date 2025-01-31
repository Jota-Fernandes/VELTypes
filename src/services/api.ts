import axios from "axios";

const velApi = axios.create({
    baseURL: 'https://www.phcfocosistema.com.br/',
});

export default velApi;