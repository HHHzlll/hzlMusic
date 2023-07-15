// 获取歌单详情
import { getPlaylist } from "@/api/playlist";
import { usePlaylistStore } from "@/store/playlist";

export function getPlaylistDetail(id: number) {
    const playlistStore = usePlaylistStore()
    getPlaylist(id).then(res => {
        // 存储到sessionStorage中
        playlistStore.playlistDetail = res.data
    })
}