<template>
    <el-scrollbar class="scrollbar">
        <DailyRecommendations v-if="userStore().token" />
        <Recommend />
        <Suspense>
            <SongStyle />
        </Suspense>
    </el-scrollbar>
</template>

<script setup lang="ts">
import Recommend from "./recommend.vue";
import DailyRecommendations from "./dailyRecommendations.vue";
import SongStyle from "./songStyle/songStyle.vue";
import { userStore } from "@/store/user";
</script>

<style scoped>
.scrollbar{
  height: calc(100vh - 80px - 60px);
}
</style>