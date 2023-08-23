// 获取歌单详情
import { getPlaylist } from "@/api/playlist";
import { usePlaylistStore } from "@/store/playlist";

/**
 * 传入歌单 id 获取歌单详情，在 Layout/index.vue 会监听歌单详情，达成跳转到歌单内的方法
 * @param id 歌单id*/
export function getPlaylistDetail(id: number) {
    const playlistStore = usePlaylistStore()
    getPlaylist(id).then(res => {
        // 存储到sessionStorage中
        playlistStore.changePlaylistDetail(res.data)
    })
}

/**
 * 将歌曲添加到待播列表，参数是歌曲的详细信息
 * @param list 歌曲列表*/
import { useMusicStore } from "@/store/music";
const musicStore = useMusicStore()
export async function addWaitingPlaylist(list: any, row?: any) {
    // 如果是非数组类型，将他放到一个新的数组中
    if (Object.prototype.toString.call(list).slice(8, -1) !== 'Array') list = [list]
    // 如果有row，也就是用户指定了单曲
    if (row) {
        list.map((item: any, index: number) => {
            if (item.id === row.id) {
                return musicStore.changeIndex(index)
            }
        })
    } else {    // 没有row则播放第一首
        musicStore.changeIndex(0)
    }
    await musicStore.changeWaitingPlaylist(list)
}

/**
* 播放音乐
* @param audio 音频DOM*/
import {getMusicUrl} from "@/api/music";
export function playMusic(audio: any) {
    if (musicStore.musicDetail?.id === undefined) {
        return ElNotification({
            type: 'error',
            message: '待播列表为空，请选择要播放的音乐！'
        })
    }
    getMusicUrl(musicStore.musicDetail.id, 'standard').then(res => {
        // 如果url为null
        if(res.data.data[0].url === null) {
            return ElNotification({
                type: 'error',
                title: musicStore.musicDetail.name,
                message: '未购买专辑或暂无版权！',
                duration: 2000
            })
        }
        // 如果audio的url和接口返回的url不同 重新赋值
        if (audio.value.src !== res.data.data[0].url) audio.value.src = res.data.data[0].url
        if (audio.value.src.length > 0) {
            isPaused.value = audio.value.paused
            // 循环查看音频的网络状态
            const timer = setInterval(() => {
                // 当音频加载完成，播放或暂停
                if (audio.value.networkState === 1) {
                    clearInterval(timer)
                    ElNotification({
                        type: 'success',
                        title: musicStore.musicDetail.name,
                        message: audio.value.paused ? `播放成功!` : `暂停成功!`,
                        duration: 2000
                    })
                    audio.value.paused ? audio.value.play() : audio.value.pause()
                }
            }, 200)
        }
    }).catch(err => {
        console.log(err)
    })
}
export const isPaused = ref(false)

/**
 * 上一首下一首*/
import { debounce } from "./function";
// 使用防抖函数，1秒内只能执行一次
export const prevMusic = debounce(() => {
    if (useMusicStore().waitingPlaylist.length === 1) { return }
    useMusicStore().changeIndex(useMusicStore().index - 1)
}, 1000)

export const nextMusic = debounce(() => {
    if (useMusicStore().waitingPlaylist.length === 1) { return }
    useMusicStore().changeIndex(useMusicStore().index + 1)
}, 1000)