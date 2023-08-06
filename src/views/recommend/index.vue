<template>
    <div>
        <DailyRecommendations v-if="userStore().token" />
        <Recommend />
        <Suspense>
            <SongStyle />
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import Recommend from "./recommend.vue";
import DailyRecommendations from "./dailyRecommendations.vue";
import SongStyle from "./songStyle/songStyle.vue";

import { userStore } from "@/store/user";
</script>

<style scoped></style>