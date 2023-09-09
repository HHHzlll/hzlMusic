const pendingReq = new Map()

/**
 * 生成请求的key，将 method、url、参数 相同的请求认作同样的请求。
 * @param config 请求参数
 * @return key*/
export function createReqKey(config: any) {
    const {method, url, params, data} = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 将请求添加到pendingReq中,如果已存在则取消请求
 * @param config*/
export function addPendingReq(config: any) {
    const key = createReqKey(config)
    // 取消请求控制器
    const controller = new AbortController();
    config.signal = controller.signal
    // 如果没有重复的key
    if (!pendingReq.has(key)) {
        // 将key作为key，取消控制器作为value。传入Map
        pendingReq.set(key, controller)
    } else {
        // 取消请求
        controller.abort('repeated')
    }
}

/**
 * 放在响应拦截器中，请求响应后删除对应的key
 * @param config*/
export function removePendingReq(config:any) {
    pendingReq.delete(createReqKey(config))
}