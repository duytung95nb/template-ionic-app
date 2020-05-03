import axios, { AxiosRequestConfig } from 'axios';
import authService from '../services/authService';

export class BaseDataService {

    protected get<T>(url: string, config?: AxiosRequestConfig) {
        var axiosConfig = this.requestOptionsWithHeaders(config);
        axiosConfig.method = "GET";
        return axios.get<T>(url, axiosConfig);
    }

    protected put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        var axiosConfig = this.requestOptionsWithHeaders(config);
        return axios.put<T>(url, data, axiosConfig);
    }

    protected post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        var axiosConfig = this.requestOptionsWithHeaders(config);
        return axios.post<T>(url, data, axiosConfig);
    }

    private requestOptionsWithHeaders(config?: AxiosRequestConfig): AxiosRequestConfig {
        let token = authService.getAccessTokenSubscription().getValue();
        var authorizationHeaderValue = `Bearer ${token}`;
        if (config === undefined) {
            config = { headers: {} };
        }
        var configHeaders = config === undefined
            ? { 'Authorization': authorizationHeaderValue }
            : {
                ...config.headers,
                'Authorization': authorizationHeaderValue,
            };
        if(token == null) {
            delete configHeaders['Authorization'];
        }
        config = {
            ...config,
            headers: configHeaders
        };
        return config;
    }
}