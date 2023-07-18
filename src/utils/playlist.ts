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