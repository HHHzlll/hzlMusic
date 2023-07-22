//  src/utils/request.ts
import axios from 'axios';
import { userStore } from "@/store/user";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.params['cookie'] = userStore().token
    return config
  }
);

// 响应拦截器
service.interceptors.response.use(
);

// 导出 axios 实例
export default service;