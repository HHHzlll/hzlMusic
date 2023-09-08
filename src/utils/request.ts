//  src/utils/request.ts
import axios, {AxiosInstance} from 'axios';

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    withCredentials: true
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    }
);

// 响应拦截器
service.interceptors.response.use(
    (res):any => {
        if (res.data.code > 400 && res.data.code < 500) return ElMessage({message: res.data.message, type: 'error'})
        return res
    },
    err => {
        ElMessage({
            message: err.message,
            type: 'error'
        })
    }
);

// 导出 axios 实例
export default service;