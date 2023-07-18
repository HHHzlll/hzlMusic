import { defineStore } from "pinia";

export const usePlaylistStore = defineStore('playlist', () => {
    const playlistDetail: Ref<object> = ref({})

    function changePlaylistDetail(obj : object) {
        playlistDetail.value = obj
    }

    return { playlistDetail, changePlaylistDetail }
}, {
    persist: {
        storage: window.sessionStorage
    },
})