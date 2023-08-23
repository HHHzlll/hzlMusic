<template>
    <div class="container">
        <h2>您的每日推荐</h2>
        <el-skeleton :loading="loading" animated :count="9">
            <template #template>
                <el-card>
                    <el-skeleton-item variant="image" class="img" style="width: 60px;height: 60px;" />
                    <div class="info">
                        <el-skeleton-item variant="p" />
                        <br>
                        <el-skeleton-item variant="p" />
                    </div>
                </el-card>
            </template>
            <template #default>
                <Song :list="dailyRecommendations" :type="'carousel'" />
            </template>
        </el-skeleton>
    </div>
</template>

<script setup lang="ts">
import { getDailyRecommendations } from "@/api/recommend";
import Song from "@/components/Song/Song.vue";

const loading: Ref<boolean> = ref(true)
const dailyRecommendations: any = ref()
getDailyRecommendations().then(res => {
    dailyRecommendations.value = res.data.data.dailySongs
    loading.value = false
})
</script>

<style scoped>
.el-skeleton {
    display: flex;
    flex-wrap: wrap;
}

.el-card {
    width: 30%;
    height: calc(60px + 2rem);
    margin: 0 1rem 1rem 0;
    box-shadow: none;
    border: none;
    background: var(--bg-color);
    cursor: pointer;
    border-radius: 5px;
}

.img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 1rem;
}

.el-card :deep(.el-card__body) {
    display: flex;
    padding: 1rem;
    position: relative;
}

.info {
    position: relative;
    width: calc(100% - 60px);
    height: 100%;
}
</style>