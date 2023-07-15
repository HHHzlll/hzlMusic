import request from '@/utils/request.ts'

// 获取推荐歌单
export function getRecommendList(limit?:number) {
    const params = { limit }
    return request({
        url: '/personalized',
        method: 'get',
        params
    })
}
