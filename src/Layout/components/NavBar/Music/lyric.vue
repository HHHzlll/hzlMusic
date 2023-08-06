<template>
    <div class="lyric">
        <el-text type="danger" tag="b" @click="openLyric = !openLyric">词</el-text>

        <div :class="{ open: openLyric, list: true }" ref="div">
            <ul class="lyric" :style="{ transform: `translateY(${offset}px)` }">
                <li v-for="(item, index) in  lyric " :key="item.time" :class="{ active: index === lightIndex }"
                    @click="$props.audio.currentTime = item.time"
                    :style="{ height: liHeight + 'px', lineHeight: liHeight + 'px', }">
                    {{ item.words }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getLyric } from "@/api/music";
import { useMusicStore } from "@/store/music";
const openLyric = ref(false) // 开关歌词
const lyric: any = ref('') // 歌词
const prop = defineProps(['audio']) // audio的DOM

// 监听歌曲信息变化，改变歌词
watch(() => useMusicStore().musicDetail, async () => {
    const { data } = await getLyric(useMusicStore().musicDetail.id)
    lyric.value = parseLyric(data.lrc.lyric)
}, { immediate: true })

/**
 * 解析歌词
 * @param lyric 歌词字符串
 * @returns 解析后的歌词对象
 */
function parseLyric(lyric: string) {
    const result: Array<object> = []

    lyric.split('\n').map(item => {
        let parts = item.split(']')
        if (parts.length !== 2) {
            parts.forEach((element, index) => {
                if (index < parts.length - 1) result.push({ time: parseTime(element.substring(1)), words: parts[parts.length - 1] })
            })
            return
        }
        result.push({ time: parseTime(parts[0].substring(1)), words: parts[1] })
    })
    return result.sort((a: any, b: any) => a.time - b.time)
}

/**
 * 解析歌词时间
 * @param timeStr 歌词的时间字符串
 * @returns 解析后的时间
 */
function parseTime(timeStr: string) {
    let parts = timeStr.split(':')
    return +(Number(parts[0]) * 60 + Number(parts[1])).toFixed(2)
}

/**
 * 应该高亮显示的歌词的下标
 * @param lyric 歌词对象
 * @returns 下标
 */
function findIndex(lyric: any) {
    let currentTime = prop.audio.currentTime
    for (let i = 0; i < lyric.length; i++) {
        if (currentTime < lyric[i].time) {
            return i - 1
        }
    }
    return lyric.length - 1
}

/**
 * 计算容器偏移量
 */
const lightIndex = ref() // 高亮的下标
const div = ref()   // 容器DOM
const liHeight = 40 // 单行高度
const offset = ref()    // 偏移量
function setOffset() {
    lightIndex.value = findIndex(lyric.value)
    offset.value = -(liHeight * lightIndex.value - div.value.clientHeight / 2 + div.value.clientHeight * 0.1)
}

// 将函数暴露
defineExpose({ setOffset });
</script>

<style scoped>
.el-text {
    font-size: 1.2rem;
    margin: 0 1rem;
    color: var(--primary-color);
    cursor: pointer;
}

.list {
    position: absolute;
    right: 0;
    top: 100px;
    z-index: 11;
    width: 500px;
    height: 80vh;
    overflow: hidden;
    box-shadow: 0 0 10px #ccc;
    transform: scale(0);
    transform-origin: top center;
    transition: all .5s;
    background-color: #fff;
    text-align: center;
}

.lyric {
    margin: 0;
    padding: 1rem 0;
    list-style-type: none;
    color: #aaa;
    transition: .6s;
}

.lyric li.active {
    color: var(--primary-color);
    transform: scale(1.3);
}

.lyric li {
    transition: .6s;
    cursor: pointer;
}

.lyric li:hover {
    background-color: #F0F3F6;
}

.open {
    transform: scale(1);
}
</style>