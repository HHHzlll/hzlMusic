import { defineStore } from "pinia";

export const useMusicStore = defineStore('music', () => {
    const music = ref({})
    const musicDetail = ref({})
    
    return { music, musicDetail }
}, {
    persist: {
        storage: window.sessionStorage
    },
})