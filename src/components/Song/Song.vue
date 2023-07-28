<template>
    <div class="container">
        <el-card v-for="item in prop.list.dailySongs" :key="item.id"
            @dblclick="addWaitingPlaylist(prop.list.dailySongs, item)">
            <el-image class="img" lazy :src="item.al.picUrl + '?param=60y60'" />
            <div class="info">
                <el-text size="large">{{ item.name }}</el-text>
                <br>
                <el-tag type="danger" size="small" v-if="item.reason">
                    {{ item.reason }}
                </el-tag>
                <el-text size="small" type="info" v-for="(i, index) in item.ar" :key="i.id" truncated>
                    {{ index + 1 === item.ar.length ? i.name : i.name + ' / ' }}
                </el-text>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { addWaitingPlaylist } from "@/utils/playlist";
const prop = defineProps(['list'])
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
}

.el-card {
    width: 30%;
    height: calc(60px + 2rem);
    margin: 0 1rem 1rem 0;
    box-shadow: none;
    border: none;
    background: var(--bg-color);
    cursor: pointer;
    border-radius: 5px;
}

.el-card :deep(.el-card__body) {
    display: flex;
    padding: 1rem;
}

.img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 1rem;
}

.info{
    position: relative;
    width: calc(100% - 60px);
    height: 100%;
}
.el-card:hover {
    background: #fff;
}
</style>