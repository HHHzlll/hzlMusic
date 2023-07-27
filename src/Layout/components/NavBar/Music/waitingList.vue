<template>
    <div class="waitingPlaylist">
        <svg-icon class="icon" icon-class="waitingPlaylist" @click="openWaitingPlaylist = !openWaitingPlaylist" />
        <el-table :class="{ open: !openWaitingPlaylist, list: true }" :data="musicStore.waitingPlaylist"
            @row-dblclick="addWaitingPlaylist(musicStore.waitingPlaylist, $event)" max-height="80vh">
            <el-table-column min-width="400px">
                <template #default="scope">
                    <div class="musicTitle">
                        <el-image :src="scope.row.al.picUrl + '?param=50y50'" />
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
import { useMusicStore } from "@/store/music";
import { formatMilliseconds } from "@/utils/function";
import { addWaitingPlaylist } from "@/utils/playlist";
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
    position: absolute;
    right: 0;
    top: 100px;
    z-index: 10;
    width: 500px;
    box-shadow: 0 0 10px #ccc;
    transition: opacity .5s;
}

.open {
    opacity: 0;
    z-index: -10;
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