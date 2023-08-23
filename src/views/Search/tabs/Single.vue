<script setup lang="ts">
import Song from "@/components/Song/Song.vue"
import {search} from '@/api/search.ts';
import {Ref, ref, watch, onMounted} from "vue";
import {useRoute} from "vue-router";

const currentPage: Ref<number> = ref(1) // 当前页
const loading = ref(); // loading元素

const searchContent: any = ref([]);  // 搜索内容
const params = ref(useRoute().query); // 搜索参数
// 监听当前页变化
watch(currentPage, async () => {
  const {data: {result: { songs: searchResult}}} = await search(params.value.keywords, 1, params.value?.limit, currentPage.value)
  // searchContent.value = [...searchContent.value, ...searchResult]
  searchContent.value.push(searchResult)
})


onMounted(() => {
  const observer = new IntersectionObserver(
      entries => {
        entries
        currentPage.value++
      }
  )
  observer.observe(loading.value)
})

</script>

<template>
  <el-scrollbar height="calc(100vh - 200px)" style="overflow:auto;">
<!--    <Song :list="searchContent" type="table" v-if="searchContent"/>-->
    <Song :list="item" type="table" v-for="item in searchContent" :key="item.id"/>
    <div ref="loading"><el-icon class="is-loading"><Loading /></el-icon></div>
  </el-scrollbar>
</template>

<style scoped>
:deep(.el-table__header-wrapper) {
  display: none;
}
</style>