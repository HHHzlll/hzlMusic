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
import {search} from "@/api/search.ts";

const tabType = ref("1") // tab栏类型

const params = ref(useRoute().query); // 搜索参数
const disabledTabs = ref(true);

// 搜索内容，key对应接口的type
const searchContent: any = ref({
// 使用 markRaw 将对象标记为非响应式
  [1]: {label: '单曲', count: 0, list: [], offset: 0, component: markRaw(Single), isEnd: false},
  [10]: {label: '专辑', count: 0, list: [], offset: 0, component: markRaw(Album), isEnd: false},
  [100]: {label: '歌手', count: 0, list: [], offset: 0, component: markRaw(Singer), isEnd: false},
  [1000]: {label: '歌单', count: 0, list: [], offset: 0, component: markRaw(SingingList), isEnd: false},
  [1002]: {label: '用户', count: 0, list: [], offset: 0, component: markRaw(Users), isEnd: false},
  [1004]: {label: 'MV', count: 0, list: [], offset: 0, component: markRaw(MV), isEnd: false},
  [1009]: {label: '电台', count: 0, list: [], offset: 0, component: markRaw(RadioStation), isEnd: false},
  [1014]: {label: '视频', count: 0, list: [], offset: 0, component: markRaw(Video), isEnd: false},
});

// 更新数据的函数
async function updateData() {
  disabledTabs.value = true
  const {data: {result: searchResult}} = await search(params.value.keywords, tabType.value, params.value?.limit || 30, searchContent.value[tabType.value].offset * 30)
  for (const key in searchResult) {
    const item = searchResult[key]
    if (Object.prototype.toString.call(item).slice(8, -1) === 'Array') searchContent.value[tabType.value].list.push(item)
    if (Object.prototype.toString.call(item).slice(8, -1) === 'Number') {
      // 搜索结束接口会返回count0,
      if (item === 0) {
        searchContent.value[tabType.value].isEnd = true;
        continue;
      }
      searchContent.value[tabType.value].count = item;
      if ( item <= 30) searchContent.value[tabType.value].isEnd = true;
    }
  }
  searchContent.value[tabType.value].offset++
  disabledTabs.value = false; // 加载完成后再启用tab栏
}

// 监听用户是否滑动结束
const loading = ref(); // loading元素
onMounted(() => {
  const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          updateData()
        }
      }
  )
  observer.observe(loading.value)
})
</script>

<template>
  <el-scrollbar height="calc(100vh - 140px)">
    <el-tabs v-model="tabType" class="el-tabs">
      <el-tab-pane v-for="(item, index) in searchContent" :key="item.component" :name="index" :label="item.label" lazy :disabled="disabledTabs">
        <component :is="item.component" :search-content="item"/>
      </el-tab-pane>
    </el-tabs>

<!--    加载的动画 -->
    <div ref="loading" v-show="!searchContent[tabType].isEnd">
      <el-icon class="is-loading">
        <Loading/>
      </el-icon>
    </div>
<!--    加载完成 -->
    <el-divider v-show="searchContent[tabType].isEnd">
      <el-text size="small" type="info">搜索结束，共{{searchContent[tabType].count}}条结果</el-text>
    </el-divider>
  </el-scrollbar>
</template>

<style scoped>
:deep(.el-table__header-wrapper) {
  display: none;
}

:deep(.el-tabs__active-bar){
  background-color: var(--primary-color);
}

:deep(.el-tabs__item.is-active),
:deep(.el-tabs__item:hover) {
  color: var(--primary-color);
}
</style>