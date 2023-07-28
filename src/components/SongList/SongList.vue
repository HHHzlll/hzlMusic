<template>
    <el-card :body-style="{ padding: '0px' }" shadow="hover" v-for="item in prop.list" :key="item.id" v-once
        @click="getPlaylistDetail(item.id)">
        <svg-icon icon-class="playMusic" />
        <el-image class="listImg" :src="item.picUrl + '?param=200y200'" lazy />
        <el-image class="blurListImg" :src="item.picUrl + '?param=200y60'" lazy />
        <span class="listInfo">{{ item.name }}</span>
    </el-card>
</template>

<script setup lang="ts">
// 公用获取歌单详情的函数
import { getPlaylistDetail } from "@/utils/playlist";

const prop = defineProps(['list'])
</script>

<style scoped>
.el-card {
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 200px;
    height: 260px;
    margin: 0 2rem 2rem 0;
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
}

.listImg {
    display: block;
    width: 100%;
    height: 100%;
    transition: filter .3s;
}

.blurListImg {
    filter: blur(20px);
    transform: scale(2);
}

.listInfo {
    position: absolute;
    display: block;
    bottom: 0;
    font-size: .9rem;
    padding: .5rem;
}

.svg-icon {
    position: absolute;
    z-index: 1;
    font-size: 50px;
    bottom: 70px;
    right: 10px;
    opacity: 0;
    transition: opacity .3s;
}

.el-card:hover .listImg {
    filter: brightness(.6);
}

.el-card:hover .svg-icon {
    opacity: 1;
}
</style>