<script setup lang="ts">
import Single from "@/views/Search/tabs/Single.vue";
import Album from "@/views/Search/tabs/Album.vue";
import Singer from "@/views/Search/tabs/Singer.vue";
import SingingList from "@/views/Search/tabs/SingingList.vue";
import Users from "@/views/Search/tabs/Users.vue";
import MV from "@/views/Search/tabs/MV.vue";
import RadioStation from "@/views/Search/tabs/RadioStation.vue";
import Video from "@/views/Search/tabs/Video.vue";
import {useRoute} from "vue-router";
import {watch, ref} from "vue";
import {search} from "@/api/search.ts";

const tabType = ref(1)

const params = ref(useRoute().query); // 搜索参数
const searchContent: any = ref([]);  // 搜索内容
const offset = ref(-1)

// 监听tabs变化
watch([tabType, offset], async () => {
  const {data: {result: searchResult}} = await search(params.value.keywords, tabType.value, params.value?.limit || 30, offset.value * 30)
  searchContent.value.push(searchResult)
})

const loading = ref(); // loading元素
onMounted(() => {
  const observer = new IntersectionObserver(
      entries => {
        entries;
        offset.value++
      }
  )
  observer.observe(loading.value)
})

function tabChange() {
  offset.value = 0;
  searchContent.value = [];
}
</script>

<template>
  <el-scrollbar height="calc(100vh - 140px)">
    <el-tabs v-model="tabType" class="el-tabs" @tabChange="tabChange">
      <el-tab-pane lazy label="单曲" :name="1">
        <Single :search-content="searchContent"/>
      </el-tab-pane>
      <el-tab-pane lazy label="专辑" :name="10">
        <Album :search-content="searchContent"/>
      </el-tab-pane>
      <el-tab-pane lazy label="歌手" :name="100">
        <Singer/>
      </el-tab-pane>
      <el-tab-pane lazy label="歌单" :name="1000">
        <SingingList/>
      </el-tab-pane>
      <el-tab-pane lazy label="用户" :name="1002">
        <Users/>
      </el-tab-pane>
      <el-tab-pane lazy label="MV" :name="1004">
        <MV/>
      </el-tab-pane>
      <el-tab-pane lazy label="电台" :name="1009">
        <RadioStation/>
      </el-tab-pane>
      <el-tab-pane lazy label="视频" :name="1014">
        <Video/>
      </el-tab-pane>
    </el-tabs>

    <div ref="loading">
      <el-icon class="is-loading">
        <Loading/>
      </el-icon>
    </div>
  </el-scrollbar>
</template>

<style scoped>
:deep(.el-table__header-wrapper) {
  display: none;
}
</style>