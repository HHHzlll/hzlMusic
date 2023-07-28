<template>
    <div>
        <DailyRecommendations v-if="userStore().token" />
        <Recommend />
    </div>
</template>

<script setup lang="ts">
import Recommend from "./recommend.vue";
import DailyRecommendations from "./dailyRecommendations.vue";

import { userStore } from "@/store/user";
</script>

<style scoped>

</style>