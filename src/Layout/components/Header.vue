<script setup lang="ts">
import {searchSuggest} from "@/api/search.ts";
import {Ref, ref, UnwrapRef} from "vue";
import router from "@/router";

let searchContent: Ref<UnwrapRef<string>> = ref('')

/**
 * 触发搜索功能 */
async function handleSearch(keywords: string, type?: number, limit?: number) {
  if (keywords.length === 0) return
  await router.push({name: 'Home'})
  await router.push({
    name: 'search', query: {
      keywords, type, limit
    }
  })
}

/**
 * 获取搜索建议
 * @param queryString 搜索字符串
 * @param cb el-autocomplete自带的回调函数，接收[{value: '', link: ''}]类型的搜索列表
 * */
async function searchSuggestAsync(queryString: string, cb: any) {
  if (searchContent.value.length === 0) return;
  const suggest: any = await searchSuggest(queryString)
  if (suggest.data.result.allMatch === undefined) return;
  const result: any = suggest.data.result.allMatch.map((item: any) => {
    return {'value': item.keyword}
  })
  cb(result)
}
</script>

<template>
  <div class="header">
    <div class="search">
      <el-autocomplete class="search" v-model="searchContent" @keyup.enter="handleSearch(searchContent)"
                       @select="handleSearch(searchContent)"
                       :fetch-suggestions="searchSuggestAsync" :trigger-on-focus="false">
        <template #prefix>
          <el-icon class="el-input__icon" style="font-size: 1.2rem;cursor: pointer;"
                   @click="handleSearch(searchContent)">
            <search/>
          </el-icon>
        </template>
      </el-autocomplete>
    </div>

    <div class="user">
      <UserInfo/>
      <Login/>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
}

.search, .user {
  display: flex;
}

.search :deep(.el-input__wrapper) {
  height: 40px;
  width: 300px;
  border-radius: 10px;
  background: linear-gradient(90deg, #EAF0FA, #F8EFF7);
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--primary-color) inset;
}
</style>