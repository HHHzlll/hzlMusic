import axios, {AxiosInstance} from 'axios'
const pendingRequest = new Map()
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
function generateReqKey(config: any) {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
} function resGenerateReqKey(config: any) {
    const { method, url, params, data } = config
    return [method, url, params, data].join('&')
}

function addPendingRequest(config: any) {
    const requestKey = generateReqKey(config)
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel: any) => {
            if (!pendingRequest.has(requestKey)) {
                pendingRequest.set(requestKey, cancel)
            }
        })
}
function removePendingRequest(config: any) {
    const requestKey = generateReqKey(config)
    if (pendingRequest.has(requestKey)) {

        config.cancelToken = source.token;
        source.cancel()

    }
}
function clearPending() {
    for (const [requestKey, cancelToken] of pendingRequest) {
        cancelToken(requestKey)
    }
    pendingRequest.clear()
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    withCredentials: true
});
service.interceptors.request.use(
    function (config: any) {
        if (localStorage.token) {
            //通过请求拦截器实现如果有token自动添加token，如果没有token就不携带token
            config.headers['Authorization'] = `Bearer ${localStorage.token}`
        }
        removePendingRequest(config) // 检查是否存在重复请求，若存在则取消已发的请求
        addPendingRequest(config) // 把当前请求信息添加到pendingRequest对象中

        return config
    },
    (error) => {
        // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象
        pendingRequest.clear()
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    (response) => {
        const requestKey = resGenerateReqKey(response.config)

        pendingRequest.delete(requestKey)
        // 从pendingRequest对象中移除请求
        if (response.data.code != 200) {
            alert(response.data.msg)
        }
        return response
    },
    (error) => {
        removePendingRequest(error.config || {}) // 从pendingRequest对象中移除请求
        if (axios.isCancel(error)) {
            return Promise.reject(error)
        } else {
            // 添加其它异常处理
        }
        return Promise.reject(error)
    }
)

export default service
export { clearPending } 
