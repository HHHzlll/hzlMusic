<script setup lang="ts">
import {search, searchSuggest} from "@/api/search.ts";
import {Ref, ref, UnwrapRef} from "vue";
import router from "@/router";
import {searchStore} from "@/store/search.ts";

let searchContent: Ref<UnwrapRef<string>> = ref('')

/**
 * 触发搜索功能 */
async function handleSearch() {
  const searchResult: any = await search(searchContent.value)
  await router.push({name: 'Home'})
  await router.push({name: 'search'})
  searchStore().changeSearch(searchResult.data.result)
}

/**
 * 获取搜索建议
 * @param queryString 搜索字符串
 * @param cb el-autocomplete自带的回调函数，接收[{value: '', link: ''}]类型的搜索列表
 * */
async function searchSuggestAsync(queryString: string, cb: any) {
  const suggest: any = await searchSuggest(searchContent.value)
  const result: any = suggest.data.result.allMatch.map((item: any) => {
    return {'value': item.keyword}
  })
  cb(result)
}
</script>

<template>
  <div class="header">
    <el-form class="search">
      <el-autocomplete class="search" v-model="searchContent" @keyup.enter="handleSearch" @select="handleSearch"
                       :fetch-suggestions="searchSuggestAsync" :trigger-on-focus="searchContent !== ''"/>
    </el-form>

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

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--primary-color) inset;
}
</style>