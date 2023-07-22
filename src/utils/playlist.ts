// 获取歌单详情
import { getPlaylist } from "@/api/playlist";
import { usePlaylistStore } from "@/store/playlist";

// 传入歌单 id 获取歌单详情，在 Layout/index.vue 会监听歌单详情，达成跳转到歌单内的方法
export function getPlaylistDetail(id: number) {
    const playlistStore = usePlaylistStore()
    getPlaylist(id).then(res => {
        // 存储到sessionStorage中
        playlistStore.changePlaylistDetail(res.data)
    })
}

// 播放单首歌曲，参数是歌曲的详细信息
import { useMusicStore } from "@/store/music";
const music = useMusicStore()
export function playMusic(list: any) {
    // 如果是非数组类型，将他放到一个新的数组中
    if (Object.prototype.toString.call(list).slice(8, -1) !== 'Array') list = [list]
    music.changeWaitingPlaylist(list)
}