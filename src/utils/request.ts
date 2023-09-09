import axios, {AxiosInstance} from 'axios';
// 防止重复请求
import {addPendingReq, removePendingReq} from './repeatedRequests.ts'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
    withCredentials: true
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        addPendingReq(config)
        return config
    }
);

// 响应拦截器
service.interceptors.response.use(
    (res):any => {
        removePendingReq(res.config)
        if (res.data.code > 400 && res.data.code < 500) return ElMessage({message: res.data.message, type: 'error'})
        return res
    },
    err => {
        if (err.config.signal.reason) return ; // 重复请求

        ElMessage({
            message: '网络或服务器不稳定！',
            type: 'error'
        });
        return Promise.reject(err)
    }
);

// 导出 axios 实例
export default service;