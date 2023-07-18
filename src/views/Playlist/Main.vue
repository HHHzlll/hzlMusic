<template>
    <el-table :data="musicList" v-loading="loading" height="calc(100vh - 470px)" @row-dblclick="playMusic">
        <el-table-column type="index" label="#" width="50px" />
        <el-table-column label="标题" min-width="400px">
            <template #default="scope">
                <div class="musicTitle">
                    <el-image lazy :src="scope.row.al.picUrl + '?param=50y50'" />
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
// ================================================渲染部分================================================
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


// ================================================逻辑部分================================================
// 播放歌曲
import { playMusic } from "@/utils/playlist";
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