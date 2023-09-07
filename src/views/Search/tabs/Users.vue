<script setup lang="ts">
import UserCard from '@/components/UserCard/index.vue'
const prop = defineProps(['searchContent'])
</script>

<template>
  <UserCard v-for="item in prop.searchContent.list" :list="item"/>
</template>

<style scoped>

</style>