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

// 获取歌词
export function getLyric(id: number) {
    return request({
        url: '/lyric?id=' + id,
        method: 'get'
    })
}


// 喜欢音乐
export function likeMusic(id: number, like: boolean) {
    const params = { id, like }
    return request({
        url: '/like',
        method: 'get',
        params
    })
}

// 添加到歌单
export function addToPlaylist(o: boolean, pid: number, tracks: number | Array<number>) {
    // true为添加，false为删除
    let op: string = ''
    o ? op = 'add' : op = 'del'
    // 删除还是添加，歌单id，歌曲id
    const params = { op, pid, tracks }
    return request({
        url: '/playlist/tracks',
        method: 'get',
        params
    })
}