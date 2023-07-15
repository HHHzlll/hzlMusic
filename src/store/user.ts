import { defineStore } from "pinia";

export const userStore = defineStore('userStore', () => {
    const token: Ref<string> = ref('')
    const userInfo: Ref<object> = ref({})

    return { token, userInfo }
}, {
    persist: {
        storage: window.localStorage
    }
})