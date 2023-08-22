<script setup lang="ts">
import Song from '@/components/Song/Song.vue'
import {search} from "@/api/search.ts";
import {Ref} from "vue";
import {useRoute} from "vue-router";

const currentPage: Ref<number> = ref(1)
const loading: Ref<boolean> = ref(true)

const searchContent1: any = ref(false);
const params = ref(useRoute().query);
// 监听当前页变化
watch(currentPage, async () => {
  loading.value = true

  const searchResult1 = await search(params.value.keywords, 1, params.value?.limit, currentPage.value)
  searchContent1.value = searchResult1.data.result

  setTimeout(()=> loading.value = false, 500)
}, {
  immediate: true
})
</script>

<template>
  <el-row v-loading="loading">
    <Song :list="searchContent1.songs" v-if="searchContent1"/>
    <el-pagination layout="prev, pager, next" :page-size="30" :total="searchContent1 ? searchContent1.songCount : 0"
                   v-model:current-page="currentPage"/>
  </el-row>
</template>

<style scoped>

</style>