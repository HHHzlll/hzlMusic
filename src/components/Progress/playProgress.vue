<template>
    <div class="play-progress" v-if="length">
        <el-text type="info" size="small">{{ formatMilliseconds(progress * 1000) }}</el-text>
        <el-slider v-model="progress" :max="length" :show-tooltip="false" @change="changeProgress" />
        <el-text type="info" size="small">{{ formatMilliseconds(length * 1000) }}</el-text>
    </div>
</template>

<script setup lang="ts">
import { formatMilliseconds } from "@/utils/function.ts";
import { useMusicStore } from "@/store/music.ts";
import { nextMusic } from "@/utils/playlist.ts";
// 父组件的参数
const prop = defineProps(['audio', 'isPaused'])
// 当前进度
const progress: Ref<number> = ref(0)
// 总长度
const length: Ref<number> = ref(0)

nextTick(() => {
    setInterval(setTime, 1000)
})
function setTime() {
    // 当前播放过的时间
    progress.value = Number(prop.audio.currentTime.toFixed(0))
    // 总时间
    length.value = Number(prop.audio.duration.toFixed(0))

    // 播完自动下一首
    if (prop.audio.ended) {
        // 如果播完且仅有一首歌，则重新播放
        if (useMusicStore().waitingPlaylist.length === 1){
            prop.audio.currentTime = 0
            prop.audio.play()
        }
        nextMusic()
    }
}

// 改变播放进度
function changeProgress(e: number) {
    prop.audio.currentTime = e
}
</script>

<style scoped>
.play-progress {
    width: 500px;
    transform: translateX(-40%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
}

.el-slider {
    padding: 0 1rem;
    --el-slider-main-bg-color: var(--primary-color);
}

.el-slider :deep(.el-slider__button-wrapper) {
    display: none;
}
</style>