import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { authClient } from "../auth/authClient"
import { config } from '@/config'

const baseProvider = axios.create({
    baseURL: `${config.api.url}api/`,
    headers: {
        'content-type': "application/json",
        'Accept': 'application/json',
    },
    responseType: 'json',
});

baseProvider.interceptors.request.use(
    async (request) => {
        if (config.api.debugger)
            console.log('Request Debugger -> ', JSON.stringify(request, null, 2))
        return request;
    },
    async (error) => {
        console.error('REQUEST ERRO: ', error)
        return Promise.reject(error);
    }
);

baseProvider.interceptors.response.use(
    (response) => {
        if (config.api.debugger) {
            console.log('Response Debugger -> ', JSON.stringify(response, null, 2));
        }
        return response;
    },
    async function (error) { //Local para futuro tratamento genérico de erros, inclusive de token// 
       
        return Promise.reject(error);
    }
);

export default baseProvider