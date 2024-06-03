import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { AuthUser, authClient, lsIdUsuario, lsRToken, lsToken } from "../auth/authClient"
import { config } from '@/config'

const authProvider = axios.create({
    baseURL: `${config.api.url}api/`,
    headers: {
        'content-type': "application/json",
        'Accept': 'application/json',
    },
    validateStatus: function (status) {
        return status == 200 || status == 500; // padrão
      },
    //responseType: 'json',
});

authProvider.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem(lsToken);
        request.headers['Authorization'] = 'Bearer ' + token;
        if (config.api.debugger)
            console.log('Request Debugger -> ', JSON.stringify(request, null, 2)) 
        return request;
    },
    async (error) => {
        console.error('REQUEST ERRO: ', error)
        return Promise.reject(error);
    }
);

authProvider.interceptors.response.use(
    (response) => {
        if (config.api.debugger) {
            console.log('Response Debugger -> ', JSON.stringify(response, null, 2));
        }
        return response;
    }, 
    async (error) => {
        const originalRequest = error.config;
        if (
            error?.response?.status === 401 &&
            !originalRequest?.__isRetryRequest
        ) {
            const refreshToken = localStorage.getItem(lsRToken) as string;
            const { data } = await authClient.refreshToken({ cd_RefreshToken: refreshToken });
            if (data !== null && data !== undefined) {
                localStorage.setItem(lsToken, data.cd_Token);
                localStorage.setItem(lsIdUsuario, data.id_Usuario);
                localStorage.setItem(lsRToken, data.cd_RefreshToken);
            }

            return authProvider(originalRequest);
        }
        console.error('REQUEST ERRO: ', error)
        return Promise.reject(error);
    }
);

export default authProvider