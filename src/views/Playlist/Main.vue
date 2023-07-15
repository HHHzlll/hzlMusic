<template>
    <el-table :data="musicList" v-loading="loading" height="calc(100vh - 470px)" @row-dblclick="playMusic">
        <el-table-column type="index" label="#" width="50px" />
        <el-table-column label="标题" min-width="400px">
            <template #default="scope">
                <div class="musicTitle">
                    <el-image :src="scope.row.al.picUrl + '?param=50y50'" />
                    <div>
                        <el-text size="large">{{ scope.row.name }}</el-text>
                        <br>
                        <el-text size="small" type="info" v-for="item in scope.row.ar" :key="item.id">
                            {{ item.name }}&nbsp;&nbsp;
                        </el-text>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="al.name" label="专辑" width="400px" />
        <el-table-column label="时长" width="100px">
            <template #default="scope">
                <el-text type="info">{{ formatMilliseconds(scope.row.dt) }}</el-text>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { usePlaylistStore } from '@/store/playlist';
import { formatMilliseconds } from "@/utils/function";
// 解构赋值 歌单信息
const { playlist }: any = usePlaylistStore().playlistDetail

// 歌单列表部分
import { getMusicList } from "@/api/playlist";
const loading: Ref<boolean> = ref(true)
const musicList = ref([])
getMusicList(playlist.id).then(res => {
    musicList.value = res.data.songs
    loading.value = false
})

// 播放歌曲
import { useMusicStore } from "@/store/music";
import { getMusicUrl } from "@/api/music";
const music: any = useMusicStore().music
const musicDetail: any = useMusicStore().musicDetail
function playMusic(row: any) {
    getMusicUrl(row.id, 'standard').then(res => {
        // 将返回的url替换为 https:// 安全协议
        res.data.data[0].url = res.data.data[0].url.replace('http://', 'https://')
        music.value = res.data.data[0]  // 接口返回的音乐url
        musicDetail.value = row         // 用户点击的歌曲详情
    })
}
</script>

<style scoped>
.musicTitle {
    display: flex;
}

.musicTitle .el-image {
    border-radius: 8px;
    margin-right: .5rem;
}
</style>