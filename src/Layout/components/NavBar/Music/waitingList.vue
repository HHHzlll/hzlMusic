<template>
    <div class="waitingPlaylist">
        <svg-icon class="icon" icon-class="waitingPlaylist" @click="openWaitingPlaylist = !openWaitingPlaylist" />
        <Transition name="fade">
            <el-table class="list" :data="musicStore.waitingPlaylist" v-show="openWaitingPlaylist" @row-dblclick="addWaitingPlaylist" max-height="70vh">
                <el-table-column min-width="400px">
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
                <el-table-column width="100px">
                    <template #default="scope">
                        <el-text type="info">{{ formatMilliseconds(scope.row.dt) }}</el-text>
                    </template>
                </el-table-column>
            </el-table>
        </Transition>
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
    right: 10px;
    top: 100px;
    z-index: 10;
    width: 30vw;
    min-width: 500px;
    box-shadow: 0 0 10px #ccc;
}


.musicTitle {
    display: flex;
}

.musicTitle .el-image {
    border-radius: 8px;
    margin-right: .5rem;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform:scale(0);
}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease-out;
}
</style>