//  src/utils/request.ts
import axios from 'axios';

// 创建 axios 实例
const service = axios.create({
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
  res => {
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