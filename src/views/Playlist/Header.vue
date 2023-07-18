<template>
    <el-card class="header" :body-style="{ display: 'grid', gridTemplateColumns: '300px 1fr' }">
        <el-image class="headerImg" :src="playlist.coverImgUrl + '?param=300y300'" />
        <div class="playlistInfo">
            <h2 style="white-space: nowrap;">{{ playlist.name }}</h2>
            <el-text style="display: block;max-height: 4rem;overflow:hidden;">{{ playlist.description }}</el-text>
            <el-divider />
            <el-avatar :src="user.avatarUrl" size="small" />
            <el-text style="margin: 0 .5rem;">{{ user.nickname }}</el-text>
            <el-text type="info">{{ playlist.createTime }}创建</el-text>
            <div class="button">
                <el-button type="danger" size="large" @click="emit('playMusic')">
                    <svg-icon icon-class="playMusic" />&nbsp;播放全部
                </el-button>
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { usePlaylistStore } from '@/store/playlist';
import { getUserDetail } from "@/api/user/index";
import { formatTimestamp } from "@/utils/function";
// 解构赋值 歌单信息
const { playlist }: any = usePlaylistStore().playlistDetail
// 用户信息
const user: Ref<any> = ref({})
// 格式化时间
playlist.createTime = formatTimestamp(playlist.createTime, 'YYYY-MM-DD')

// 获取用户信息
getUserDetail(playlist.userId).then(res => {
    user.value = res.data.profile
})

// 播放当前歌单下的全部歌曲
const emit: any = defineEmits(['playMusic'])
// function playMusicAll() {
//     emit('playMusic')
// }
</script>

<style scoped>
.header {
    height: 340px;
    grid-template-columns: 300px 1fr;
}

.headerImg {
    width: 300px;
    height: 300px;
    /* border-radius: var(--el-card-border-radius); */
}

.el-avatar,
.headerImg {
    vertical-align: middle;
}

.playlistInfo {
    position: relative;
    margin-left: 2rem;
}

.el-button {
    height: 45px;
    font-size: 1rem;
}

.button {
    position: absolute;
    bottom: 0;
}
</style>