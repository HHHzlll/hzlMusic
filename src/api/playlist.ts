import request from '@/utils/request.ts'

// 获取歌单详细信息
export function getPlaylist(id: number) {
    const params = { id }
    return request({
        url: '/playlist/detail',
        method: 'get',
        params
    })
}

// 获取歌曲列表
export function getMusicList(id: number, limit?: number, offset?: number) {
    const params = { id, limit, offset }
    return request({
        url: '/playlist/track/all',
        method: 'get',
        params
    })
}

// 获取用户歌单
export function getUserPlaylist(uid: number, limit?: number, offset?: number) {
    const params = { uid, limit, offset }
    return request({
        url: '/user/playlist',
        method: 'get',
        params
    })
}