<template>
  <div>
    <Header/>
    <Song :list="musicList" :type="'table'"/>
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Song from "@/components/Song/Song.vue";
import {getMusicList} from "@/api/playlist";
import {usePlaylistStore} from "@/store/playlist.ts";
import {Ref, ref} from "vue";


// 解构赋值 歌单信息
const {playlist}: any = usePlaylistStore().playlistDetail

// 歌单列表部分
const loading: Ref<boolean> = ref(true)
const musicList = ref([])
getMusicList(playlist.id).then(res => {
  musicList.value = res.data.songs
  loading.value = false
})
</script>