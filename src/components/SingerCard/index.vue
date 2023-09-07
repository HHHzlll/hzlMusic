<script setup lang="ts">
const prop = defineProps(['list'])
</script>

<template>
  <el-card class="el-card" shadow="hover" v-for="i in prop.list" :key="i.component">
    <el-avatar :src="i.picUrl + '?param=100y100'" :size="150" />
    <el-text size="large" >{{ i.name }}</el-text>
  </el-card>
</template>

<style scoped>
.el-card {
  display: inline-block;
  width: 200px;
  height: 200px;
  margin: 1rem;
}

.el-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
</style>