import { defineStore } from "pinia";

export const useMusicStore = defineStore('music', () => {
    // 等待播放的歌曲列表
    const waitingPlaylist: any = ref([])

    // 第 i 首歌的详细信息
    const index: Ref<number> = ref(0)
    const musicDetail = computed(() => {
        if (waitingPlaylist.value.length <= 0) return {}
        return waitingPlaylist.value[index.value]
    })

    function changeWaitingPlaylist(arr: any) {
        waitingPlaylist.value = []
        waitingPlaylist.value = arr
    }

    function changeIndex(i: number, enforce?: boolean) {
        // 忽略越界判断，强制执行
        console.log(i);
        if (enforce) return index.value = i
        if (i < 0) {
            index.value = 0
        } else if (i > waitingPlaylist.length) {
            i = waitingPlaylist.length
        } else {
            index.value = i
        }
    }

    return {
        index, musicDetail, waitingPlaylist,
        changeWaitingPlaylist, changeIndex
    }
}, {
    persist: {
        storage: window.sessionStorage
    },
})