<template>
    <div class="music">
        <!-- audio -->
        <audio ref="audio" :src="musicUrl.url" />
        <div class="nav-left">
            <!-- 音乐信息 -->
            <div class="musicInfo">
                <el-avatar :class="[{ rotate: isPaused }, { musicImg: true }]"
                    :src="musicStore.musicDetail?.al?.picUrl + '?param=50y50'" :size="60" />
                <el-text size="large" tag="b" truncated>
                    {{ musicStore.musicDetail?.name }}
                    <el-text size="small" type="info" tag="p" v-for="item in musicStore.musicDetail?.ar">{{ item?.name
                    }}&nbsp;&nbsp;</el-text>
                </el-text>
            </div>

            <!-- 按钮控件 -->
            <div class="buttonList">
                <el-button type="danger" circle text><svg-icon icon-class="prevMusic" /></el-button>
                <el-button type="danger" circle text @click="playMusic">
                    <Transition name="fade" mode="out-in">
                        <svg-icon v-if="!isPaused" icon-class="playMusic" />
                        <svg-icon v-else icon-class="stopMusic" />
                    </Transition>
                </el-button>
                <el-button type="danger" circle text><svg-icon icon-class="nextMusic" /></el-button>

                <playProgress :audio="audio" :isPaused="isPaused" />
            </div>
        </div>

        <div class="nav-right">
            <!-- 音量 -->
            <volume :audio="audio" />
            <!-- 播放列表 -->
            <waitingList />
        </div>
    </div>
</template>

<script setup lang="ts">
import playProgress from "./playProgress.vue";
import volume from "./volume.vue";
import waitingList from "./waitingList.vue";
import { useMusicStore } from "@/store/music";
import { getMusicUrl } from "@/api/music";
const musicStore: any = useMusicStore()
const audio = ref()
const isPaused: Ref<boolean> = ref(false)

// 监听歌曲信息，改变时播放音乐
const musicUrl = ref({ url: '' })
watch(() => useMusicStore().musicDetail, () => {
    playMusic()
}, { deep: true })

// 播放音乐
function playMusic() {
    // 如果src存在
    nextTick(() => { // 在下一次DOM更新后执行,避免audio元素未创建就读取值
        if (musicStore.musicDetail?.id === undefined) {
            return ElNotification({
                type: 'error',
                message: '待播列表为空，请选择要播放的音乐！'
            })
        }
        getMusicUrl(musicStore.musicDetail.id, 'standard').then(res => {
            // 将返回的url替换为 https:// 安全协议
            res.data.data[0].url = res.data.data[0].url.replace('http://', 'https://')
            musicUrl.value = res.data.data[0]
            if (audio.value.src.length > 0) {
                // 循环查看音频的网络状态
                const timer = setInterval(() => {
                    // 当音频加载完成，播放或暂停
                    if (audio.value.networkState === 1) {
                        isPaused.value = audio.value.paused
                        clearInterval(timer)
                        ElNotification({
                            type: 'success',
                            title: musicStore.musicDetail.name,
                            message: isPaused.value ? `播放成功!` : `暂停成功!`,
                            duration: 2000
                        })
                        isPaused.value ? audio.value.play() : audio.value.pause()
                    }
                }, 200)
            }
        })

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

.nav-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
}

.nav-right {
    display: flex;
    align-items: center;
}

.buttonList {
    position: relative;
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

.fade-enter-from,
.fade-leave-to {
    transform: scale(0);
}

.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease-out;
}
</style>