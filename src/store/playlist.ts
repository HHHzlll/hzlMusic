import { defineStore } from "pinia";

export const usePlaylistStore = defineStore('playlist', () => {
    const playlistDetail: Ref<object> = ref({})
    const playlistAll: Ref<any> = ref([])

    function changePlaylistDetail(obj : object) {
        playlistDetail.value = obj
    }
    function changePlaylistAll(arr: any) {
        playlistAll.value = arr
    }

    return { playlistDetail, playlistAll, changePlaylistDetail, changePlaylistAll }
}, {
    persist: {
        storage: window.sessionStorage
    },
})