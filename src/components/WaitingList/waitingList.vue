<template>
    <div class="waitingPlaylist">
        <svg-icon class="icon scale" icon-class="waitingPlaylist" @click="openWaitingPlaylist = !openWaitingPlaylist" />
        <el-table :class="{ open: openWaitingPlaylist, list: true }" :data="musicStore.waitingPlaylist"
            @row-dblclick="addWaitingPlaylist(musicStore.waitingPlaylist, $event)" max-height="80vh" empty-text="暂无数据">
            <el-table-column min-width="400px">
                <template #default="scope">
                    <div class="musicTitle">
                        <el-image :src="scope.row.al.picUrl + '?param=50y50'" lazy />
                        <div>
                            <el-text size="large" :class="{ activeTitle: scope.$index === musicStore.index }">{{
                                scope.row.name }}</el-text>
                            <br>
                            <el-text size="small" type="info" v-for="(item, index) in scope.row.ar" :key="item.id">
                                {{ index + 1 === scope.row.ar.length ? item.name : item.name + ' / ' }}
                            </el-text>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column width="100px">
                <template #default="scope">
                    <el-text type="info">{{ formatMilliseconds(scope.row.dt) }}</el-text>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/store/music.ts";
import { formatMilliseconds } from "@/utils/function.ts";
import { addWaitingPlaylist } from "@/utils/playlist.ts";
const musicStore = useMusicStore()

const openWaitingPlaylist = ref(false)
</script>

<style scoped>
.waitingPlaylist {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.icon {
    font-size: 1.3rem;
    color: var(--primary-color);
}

.list {
    position: fixed;
    right: 50px;
    bottom: 100px;
    z-index: 11;
    width: 500px;
    box-shadow: 0 0 10px #ccc;
    transform: scale(0);
    transform-origin: bottom right;
    transition: all .5s;
}

.open {
    transform: scale(1);
}

.musicTitle {
    display: flex;
}

.musicTitle .el-image {
    border-radius: 8px;
    margin-right: .5rem;
}

.activeTitle {
    font-weight: 900;
    color: var(--primary-color);
}
</style>