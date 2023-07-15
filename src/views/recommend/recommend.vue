<template>
    <h2 class="title">推荐歌单<svg-icon icon-class="right" /></h2>
    <el-skeleton :loading="loading" animated :count="limit">
        <template #template>
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <el-skeleton-item class="listImg" variant="image" style="width: 200px;height: 260px;" />
            </el-card>
        </template>
        <template #default>
            <el-card :body-style="{ padding: '0px' }" shadow="hover" v-for="item in playList" :key="item.id" v-once
                @click="getPlaylistDetail(item.id)">
                <el-image class="listImg" :src="item.picUrl + '?param=200y200'" lazy />
                <el-image class="listImg" :src="item.picUrl + '?param=200y60'" style="filter:blur(50px)" lazy />
                <span class="listInfo">{{ item.name }}</span>
            </el-card>
        </template>
    </el-skeleton>
</template>

<script setup lang="ts">
import { getRecommendList } from "@/api/recommend";
import { getPlaylistDetail } from "@/utils/playlist";

// 歌单渲染
const loading: Ref<boolean> = ref(true)
const limit: number = 10
const playList: Ref<Array<any>> = ref([{}])
getRecommendList(limit).then(res => {
    playList.value = res.data.result
    setTimeout(() => {
        loading.value = false
    }, 500);
})
</script>

<style scoped>
.title {
    display: flex;
    align-items: center;
}

.el-card {
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 200px;
    height: 260px;
    margin: 0 2rem 2rem 0;
    border-radius: 10px;
    cursor: pointer;
}

.el-card:hover {
    filter: brightness(1.2);
}

.listImg {
    display: block;
    width: 100%;
    height: 100%;
    transition: filter .2s;
}

.listInfo {
    position: absolute;
    display: block;
    bottom: 0;
    font-size: .9rem;
    padding: .5rem;
}

/* 骨架屏中占位图片的样式 */
.el-skeleton__image {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>