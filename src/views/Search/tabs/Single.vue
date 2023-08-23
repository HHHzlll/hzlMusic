<script setup lang="ts">
import Song from "@/components/Song/Song.vue"

const prop = defineProps(['searchContent'])

</script>

<template>
    <Song :list="item.songs" :type="'table'" :clear-index="true" v-for="item in prop.searchContent" :key="item.id"/>
</template>

<style scoped>
</style>