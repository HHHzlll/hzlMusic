<template>
    <div v-for="item in list">
        <StyleItem :list="item" />
    </div>
    <div class="loading" ref="loading" v-show="index < styleList.data.data.length"></div>
</template>

<script setup lang="ts">
import { getStyleList, getStylePlaylist } from "@/api/playlist";
import StyleItem from "./styleItem.vue";

// 监听索引，用户划到底部加载更多
const index = ref(1)

const styleList: any = await getStyleList() // 所有风格的标签
const playlist = await getStylePlaylist(styleList.data.data[index.value - 1].tagId) // 风格歌单
const list: any = ref([])
const item = { title: '', data: '' }
item.title = styleList.data.data[index.value - 1]
item.data = playlist.data.data.playlist
list.value.push(item)

// 监听索引，用户已经看到loading，开始加载下面的歌单
watch(index, async () => {
    const playlist = await getStylePlaylist(styleList.data.data[index.value - 1].tagId)
    const item = { title: '', data: '' }
    item.title = styleList.data.data[index.value - 1]
    item.data = playlist.data.data.playlist
    list.value.push(item)
})

// 滚动加载------------------------------------------------------------------------------------------------
// DOM挂载完毕后，观察loading元素是否进入窗口
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
.loading {
    position: relative;
    left: 40%;
    width: 30px;
    height: 30px;
    border: 2px solid #000;
    border-top-color: rgba(0, 0, 0, 0.2);
    border-right-color: rgba(0, 0, 0, 0.2);
    border-bottom-color: rgba(0, 0, 0, 0.2);
    border-radius: 100%;

    animation: circle infinite 0.75s linear;
}

@keyframes circle {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>