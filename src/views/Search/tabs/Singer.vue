<script setup lang="ts">
import SingerCard from "@/components/SingerCard/index.vue"
const prop = defineProps(['searchContent'])
</script>

<template>
  <span v-for="item in prop.searchContent.list" :key="item.component">
    <SingerCard :list="item"/>
  </span>

</template>

<style scoped>
</style>