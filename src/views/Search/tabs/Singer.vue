<script setup lang="ts">
import SingerCard from "@/components/SingerCard/index.vue"
const prop = defineProps(['searchContent'])
</script>

<template>
    <SingerCard v-for="item in prop.searchContent.list" :key="item.component" :list="item"/>
</template>

<style scoped>
</style>