<template>
  <div v-for="item in list">
    <StyleItem :list="item"/>
  </div>
  <scroll-loading @loading="updateData" :is-show="!(list.length === styleList.length && list.length !== 0)" :count="list.length"/>
</template>

<script setup lang="ts">
import {getStyleList, getStylePlaylist} from "@/api/playlist";
import StyleItem from "./styleItem.vue";

const list: any = ref([])
const {data: {data: styleList}}: any = await getStyleList() // 所有风格的标签

// 监听索引，用户已经看到loading，开始加载下面的歌单
async function updateData() {
  const playlist = await getStylePlaylist(styleList[list.value.length].tagId)
  const item = {title: '', data: ''}
  item.title = styleList[list.value.length]
  item.data = playlist.data.data.playlist
  list.value.push(item)
}
</script>

<style scoped>
</style>