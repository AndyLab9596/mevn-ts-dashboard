import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { useGlobalStore } from '@/stores/globalStore';


const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${globalStore.token}`
    }
})

// Add a request interceptor
axiosClient.interceptors.request.use(function (config: AxiosRequestConfig) {
    const globalStore = useGlobalStore();
    (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${globalStore.token}`
    // Do something before request is sent
    return config;
}, function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // return response;
    return response.data;
}, function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient;