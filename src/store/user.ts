import { defineStore } from "pinia";

export const userStore = defineStore('userStore', () => {
    const token: Ref<string> = ref('')
    const userInfo: Ref<object> = ref({})

    function changeToken(str: string) {
        token.value = str
    }

    function changeUserInfo(obj: object){
        userInfo.value = obj
    }

    return { token, userInfo, changeToken, changeUserInfo }
}, {
    persist: {
        storage: window.localStorage
    }
})