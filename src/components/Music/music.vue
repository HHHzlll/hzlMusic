<template>
    <div class="music">
        <!-- audio -->
        <audio ref="audio" :src="music?.value?.url" />
        <!-- 音乐信息 -->
        <el-avatar :class="[{rotate:isPaused},{musicImg: true}]" :src="musicDetail?.value?.al?.picUrl + '?param=50y50'" :size="60" />
        <el-text size="large" tag="b">
            {{ musicDetail?.value?.name }}
            <el-text size="small" type="info" tag="p" v-for="item in musicDetail?.value?.ar">{{ item?.name
            }}&nbsp;&nbsp;</el-text>
        </el-text>

        <!-- 按钮控件 -->
        <div class="buttonList">
            <el-button type="danger" circle text><svg-icon icon-class="prevMusic" /></el-button>
            <el-button type="danger" circle text @click="playMusic">
                <svg-icon v-if="!isPaused" icon-class="playMusic" />
                <svg-icon v-else icon-class="stopMusic" />
            </el-button>
            <el-button type="danger" circle text><svg-icon icon-class="nextMusic" /></el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
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
        if (audio.value?.src.length > 0) {
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
.music {
    display: flex;
    align-items: center;
    position: relative;
    white-space: nowrap;
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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>