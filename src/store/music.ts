import { defineStore } from "pinia";

export const useMusicStore = defineStore('music', () => {
    // 等待播放的歌曲列表
    const waitingPlaylist: any = ref([])

    // 第一首歌的详细信息
    const musicDetail = computed(() => {
        if (waitingPlaylist.value.length <= 0) return {}
        return waitingPlaylist.value[0]
    })

    function changeWaitingPlaylist(arr: any) {
        waitingPlaylist.value = []
        waitingPlaylist.value = arr
    }

    return {
        musicDetail, waitingPlaylist,
        changeWaitingPlaylist
    }
}, {
    persist: {
        storage: window.sessionStorage
    },
})