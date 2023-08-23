<script setup lang="ts">

const prop = defineProps(['searchContent']);
console.log(prop.searchContent)
</script>

<template>
<div>
  <SongList :list="item.albums" v-for="item in prop.searchContent"/>
</div>
</template>

<style scoped>

</style>