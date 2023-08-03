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

// 曲风
// 曲风列表--曲风列表及其对应的 tagId
export function getStyleList() {
    return request({
        url: '/style/list',
        method: 'get'
    })
}

// 曲风详情--获取该曲风的描述信息
export function getStyleDetail(tagId: number) {
    return request({
        url: '/style/detail?tagId=' + tagId,
        method: 'get'
    })
}

// 曲风歌曲--获取该曲风对应的歌曲
export function getStyleSong(tagId: number, size?: number) {
    const params = { tagId, size }
    return request({
        url: '/style/song',
        method: 'get',
        params
    })
}

// 曲风歌单--获取该曲风对应的歌单
export function getStylePlaylist(tagId: number, size?: number) {
    const params = { tagId, size }
    return request({
        url: '/style/playlist',
        method: 'get',
        params
    })
}