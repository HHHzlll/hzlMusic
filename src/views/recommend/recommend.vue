<template>
    <h2 class="title">推荐歌单<svg-icon icon-class="right" /></h2>
    <el-skeleton :loading="loading" animated :count="limit">
        <template #template>
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <el-skeleton-item class="listImg" variant="image" style="width: 200px;height: 260px;" />
            </el-card>
        </template>
        <template #default>
            <SongList :list="RecommendList" />
        </template>
    </el-skeleton>
</template>

<script setup lang="ts">
import { getRecommendList } from "@/api/recommend";
import SongList from "@/components/SongList/SongList.vue";

// 歌单渲染
const loading: Ref<boolean> = ref(true)
const limit: number = 10
const RecommendList: Ref<Array<any>> = ref([{}])
getRecommendList(limit).then(res => {
    RecommendList.value = res.data.result
    loading.value = false
})
</script>

<style scoped>
.el-card {
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 200px;
    height: 260px;
    margin: 0 2rem 2rem 0;
    border-radius: 10px;
    cursor: pointer;
}

/* 骨架屏中占位图片的样式 */
.el-skeleton__image {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>