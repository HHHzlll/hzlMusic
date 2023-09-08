import request from "@/utils/request.ts"

// 搜索
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
/**
 * @param keywords 搜索字符串
 * @param type 搜索类型
 * @param limit 返回长度
 * @param offset 分页*/
export function search(keywords: any, type?: any, limit?: any, offset?: any) {
    const params = {keywords, type, limit, offset}
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