<template>
    <div class="volume">
        <svg-icon v-if="!(volume > 0)" @click="volume = 100" class="icon scale" icon-class="volume-open"></svg-icon>
        <svg-icon v-else @click="volume = 0" class="icon scale" icon-class="volume-close"></svg-icon>
        <el-slider v-model="volume" />
    </div>
</template>

<script setup lang="ts">
const volume = ref(50)
const prop = defineProps(['audio'])

nextTick(() => {
    watch(volume, () => {
        prop.audio.volume = volume.value / 100
    }, { immediate: true })
})
</script>

<style scoped>
.volume {
    display: flex;
    align-items: center;
    width: 150px;
}

.icon {
    font-size: 2rem;
    color: var(--primary-color);
    cursor: pointer;
}

.el-slider {
    padding: 0 1rem;
    --el-slider-main-bg-color: var(--primary-color);
}
</style>