<script setup lang="ts">

const prop = defineProps(['searchContent']);
</script>

<template>
<div>
  <SongList :list="item" v-for="item in prop.searchContent.list"/>
</div>
</template>

<style scoped>

</style>