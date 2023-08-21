import { defineStore } from "pinia";
import {ref} from "vue";

export const searchStore = defineStore('searchStore', () => {
    const search: any = ref([])

    function changeSearch(arr: Array<any>) {
        search.value = arr
    }


    return { search, changeSearch }
}, {
    persist: {
        storage: window.sessionStorage
    }
})