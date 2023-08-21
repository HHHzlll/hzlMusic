<script setup lang="ts">
import {searchStore} from "@/store/search.ts";
import Song from '@/components/Song/Song.vue'

const search = searchStore().search
</script>

<template>
  <div>
    <Song :list="search.songs"/>
  </div>
</template>

<style scoped>

</style>