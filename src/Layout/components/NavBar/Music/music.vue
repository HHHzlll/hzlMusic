<template>
    <div class="music">
        <!-- audio -->
        <audio ref="audio" />

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
                <el-button @click="prevMusic()" type="danger" circle text><svg-icon icon-class="prevMusic" /></el-button>
                <el-button type="danger" circle text @click="handlePlayMusic">
                    <Transition name="fade" mode="out-in">
                        <svg-icon v-if="!isPaused" icon-class="playMusic" />
                        <svg-icon v-else icon-class="stopMusic" />
                    </Transition>
                </el-button>
                <el-button @click="nextMusic()" type="danger" circle text><svg-icon icon-class="nextMusic" /></el-button>

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
const musicStore: any = useMusicStore()
const audio = ref()

// 监听歌曲信息，改变时播放音乐
import { playMusic } from "@/utils/playlist";
import { prevMusic, nextMusic } from "@/utils/playlist";
import { isPaused } from "@/utils/playlist";
watch(() => useMusicStore().musicDetail, () => {
    playMusic(audio)
}, { deep: true })

function handlePlayMusic() {
    playMusic(audio)
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