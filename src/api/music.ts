import request from '@/utils/request.ts'

// 获取音乐url
export function getMusicUrl(id: number | number[], level: string) {
    const params = { id, level }
    return request({
        url: '/song/url/v1',
        method: 'get',
        params
    })
}