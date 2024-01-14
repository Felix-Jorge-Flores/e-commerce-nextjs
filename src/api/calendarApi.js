import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: 'http://localhost:8888'
});


// TODO: Configurar interceptores

calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        // 'x-token': localStorage.getItem('token')
    }

    return config;
});



export default calendarApi;