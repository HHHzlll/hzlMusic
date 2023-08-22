import { defineStore } from "pinia";
import {ref} from "vue";

export const searchStore = defineStore('searchStore', () => {
    const search: any = ref([])
    const params: any = ref({})

    function changeSearch(arr: Array<any>) {
        search.value = arr
    }

    function changeParams(keywords: string, type?: number, limit?: number, offset?: number) {
        params.value = {keywords, type, limit, offset}
    }


    return { search, params, changeSearch, changeParams }
}, {
    persist: {
        storage: window.sessionStorage
    }
})