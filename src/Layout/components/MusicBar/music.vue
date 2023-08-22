<template>
  <div class="music">
    <!-- audio -->
    <audio ref="audio" @timeupdate="audioChange"></audio>
    <playProgress :audio="audio" :isPaused="isPaused"/>

    <div class="nav-left">
      <!-- 音乐信息 -->
      <div class="musicInfo">
        <el-avatar :class="[{ rotate: isPaused }, { musicImg: true }]"
                   :src="musicStore.musicDetail?.al?.picUrl + '?param=50y50'" :size="50"/>
        <el-text size="large" tag="b" truncated>
          {{ musicStore.musicDetail?.name }}
          <el-text size="small" type="info" tag="p" v-for="item in musicStore.musicDetail?.ar">{{
              item?.name
            }}&nbsp;&nbsp;
          </el-text>
        </el-text>
      </div>
    </div>

    <div class="nav-center">
      <!-- 按钮控件 -->
      <div class="buttonList">
        <el-button class="scale" @click="prevMusic()" type="danger" circle text>
          <svg-icon icon-class="prevMusic"/>
        </el-button>
        <el-button class="scale" type="danger" circle text @click="handlePlayMusic">
          <Transition name="fade" mode="out-in">
            <svg-icon v-if="!isPaused" icon-class="playMusic"/>
            <svg-icon v-else icon-class="stopMusic"/>
          </Transition>
        </el-button>
        <el-button class="scale" @click="nextMusic()" type="danger" circle text>
          <svg-icon icon-class="nextMusic"/>
        </el-button>
      </div>
    </div>


    <div class="nav-right">
      <!-- 音量 -->
      <volume :audio="audio"/>
      <!-- 歌词 -->
      <Suspense>
        <lyric :audio="audio" ref="lrc"/>
      </Suspense>
      <!-- 播放列表 -->
      <waitingList/>
    </div>
  </div>
</template>

<script setup lang="ts">
import playProgress from "../../../components/Progress/playProgress.vue";
import volume from "../../../components/Volume/volume.vue";
import waitingList from "../../../components/WaitingList/waitingList.vue";
import lyric from "../../../components/Lyric/lyric.vue";
import {useMusicStore} from "@/store/music.ts";

const musicStore: any = useMusicStore()
const audio = ref()

// 监听歌曲信息，改变时播放音乐
import {playMusic} from "@/utils/playlist.ts";
import {prevMusic, nextMusic} from "@/utils/playlist.ts";
import {isPaused} from "@/utils/playlist.ts";

watch(() => useMusicStore().musicDetail, () => {
  playMusic(audio)
}, {deep: true})

function handlePlayMusic() {
  playMusic(audio)
}

// 使用ref获得子组件 调用他的函数
const lrc = ref()

function audioChange() {
  lrc.value.setOffset()
}
</script>

<style scoped>
.music {
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  position: relative;
}

.musicInfo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttonList{
  margin-bottom: 10px;
}
.nav-right {
  display: flex;
  align-items: center;
}

.musicInfo .el-text {
  width: 200px;
}

.musicImg {
  margin: 0 1rem;
  box-shadow: 0 0 0 8px #000;
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