<template>
    <div v-for="item in list">
        <test :list="item" />
    </div>
    <span ref="loading" v-show="index < styleList.data.data.length">加载更多...</span>
</template>

<script setup lang="ts">
import { getStyleList, getStylePlaylist } from "@/api/playlist";
import test from "./test.vue";

// 监听索引，用户划到底部加载更多
const index = ref(1)

const styleList: any = await getStyleList()
const playlist = await getStylePlaylist(styleList.data.data[index.value - 1].tagId)
const list: any = ref([])
const item = { title: '', data: '' }
item.title = styleList.data.data[index.value - 1]
item.data = playlist.data.data.playlist
list.value.push(item)

watch(index, async () => {
    const playlist = await getStylePlaylist(styleList.data.data[index.value - 1].tagId)
    const item = { title: '', data: '' }
    item.title = styleList.data.data[index.value - 1]
    item.data = playlist.data.data.playlist
    list.value.push(item)
})

// 滚动加载------------------------------------------------------------------------------------------------
// DOM挂载完毕后
const loading = ref()
onMounted(() => {
    loadMore(loading.value)
})

function loadMore(e: Element) {
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                // 请求数据并插入列表
                index.value++
            }
        }
    )

    observer.observe(e) // 观察尾部元素
}

</script>

<style scoped>
</style>