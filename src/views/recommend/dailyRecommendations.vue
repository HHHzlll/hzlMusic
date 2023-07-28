<template>
    <h2 class="title">您的每日推荐歌曲<svg-icon icon-class="right" /></h2>
    <el-skeleton :loading="loading" animated :count="10">
        <template #template>
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <el-skeleton-item class="listImg" variant="image" style="width: 200px;height: 260px;" />
            </el-card>
        </template>
        <template #default>
            <Song :list="dailyRecommendations" />
        </template>
    </el-skeleton>
</template>

<script setup lang="ts">
import { getDailyRecommendations } from "@/api/recommend";
import Song from "@/components/Song/Song.vue";

const loading: Ref<boolean> = ref(true)
const dailyRecommendations: any = ref()
getDailyRecommendations().then(res => {
    dailyRecommendations.value = res.data.data
    loading.value = false
})
</script>