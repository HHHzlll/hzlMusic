import { defineStore } from "pinia";

export const usePlaylistStore = defineStore('playlist', () => {
    const playlistDetail: Ref<object> = ref({})
    
    return { playlistDetail }
}, {
    persist: {
        storage: window.sessionStorage
    },
})