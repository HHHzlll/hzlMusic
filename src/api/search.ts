import request from "@/utils/request.ts"

// 搜索
export function search(keywords: string, type?: number, limit?: number) {
    const params = {keywords, type, limit}
    return request({
        url: '/cloudsearch',
        method: 'get',
        params
    })
}

// 搜索建议
export function searchSuggest(keywords: string) {
    const params = {keywords, type:'mobile'}
    return request({
        url: '/search/suggest',
        method: 'get',
        params
    })
}