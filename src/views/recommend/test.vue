<template>
    <h2 class="title">
        {{ prop.list.title.showText ? prop.list.title.showText : prop.list.title.tagName }}
    </h2>
    <SongList :list="prop.list.data" />
</template>

<script setup lang="ts">
import SongList from "@/components/SongList/SongList.vue";
const prop = defineProps(['list'])
console.log(prop.list);
</script>

<style scoped>
</style>