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

// 日推
export function getDailyRecommendations() {
    return request({
        url: '/recommend/songs',
        method: 'get'
    })
}