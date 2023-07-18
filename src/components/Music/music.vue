<template>
    <div class="music">
        <!-- audio -->
        <audio ref="audio" :src="music?.value?.url" />
        <!-- 音乐信息 -->
        <div class="musicInfo">
            <el-avatar :class="[{ rotate: isPaused }, { musicImg: true }]"
                :src="musicDetail?.value?.al?.picUrl + '?param=50y50'" :size="60" />
            <el-text size="large" tag="b" truncated>
                {{ musicDetail?.value?.name }}
                <el-text size="small" type="info" tag="p" v-for="item in musicDetail?.value?.ar">{{ item?.name
                }}&nbsp;&nbsp;</el-text>
            </el-text>
        </div>

        <!-- 按钮控件 -->
        <div class="buttonList">
            <el-button type="danger" circle text><svg-icon icon-class="prevMusic" /></el-button>
            <el-button type="danger" circle text @click="playMusic">
                <svg-icon v-if="!isPaused" icon-class="playMusic" />
                <svg-icon v-else icon-class="stopMusic" />
            </el-button>
            <el-button type="danger" circle text><svg-icon icon-class="nextMusic" /></el-button>
        </div>

        <!-- 播放列表 -->
        <awaitPlaylist />
    </div>
</template>

<script setup lang="ts">
import awaitPlaylist from "./awaitPlaylist.vue";
import { useMusicStore } from "@/store/music";
let { music, musicDetail }: any = useMusicStore()
const audio = ref()
const isPaused: Ref<boolean> = ref(false)

// 监听歌曲信息，改变时播放音乐
watch(music, () => {
    playMusic()
})

// 播放音乐
function playMusic() {
    // 如果src存在
    nextTick(() => { // 在下一次DOM更新后执行,避免audio元素未创建就读取值
        if (audio.value.src.length > 0) {
            // 循环查看音频的网络状态
            const timer = setInterval(() => {
                // 当音频加载完成，播放或暂停
                if (audio.value.networkState === 1) {
                    isPaused.value = audio.value.paused
                    clearInterval(timer)
                    ElNotification({
                        type: 'success',
                        title: musicDetail.value.name,
                        message: isPaused.value ? `播放成功!` : `暂停成功!`,
                        duration: 2000
                    })
                    isPaused.value ? audio.value.play() : audio.value.pause()
                }
            }, 200)
        }
    })
}
</script>

<style scoped>
.music,
.musicInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
}

.musicInfo .el-text {
    width: 200px;
}

.musicImg {
    margin: 0 1rem;
}

.rotate {
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}

.el-button {
    padding: 0;
    font-size: 2rem;
}

.buttonList {
    justify-self: center;
    transform: translateX(-100%);
}
</style>