<template>
    <div class="container" v-if="!prop.carousel">
        <el-card v-for="item in prop.list" :key="item.id"
            @dblclick="addWaitingPlaylist(prop.list, item)">
            <el-image class="img" lazy :src="item.al.picUrl + '?param=60y60'" />
            <svg-icon icon-class="playMusic" />
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

    <el-carousel :autoplay="false" :loop="false" arrow="always" trigger="click" indicator-position="none" v-if="prop.carousel">
        <el-carousel-item v-for="(item, index) in list" :key="index">
            <el-card v-for="i in item" @dblclick="addWaitingPlaylist(prop.list, i)">
                <el-image class="img" :src="i.al.picUrl + '?param=60y60'" />
                <svg-icon icon-class="playMusic" />
                <div class="info">
                    <el-text size="large">{{ i.name }}</el-text>
                    <br>
                    <el-tag type="danger" size="small" v-if="i.reason">
                        {{ i.reason }}
                    </el-tag>
                    <el-text size="small" type="info" v-for="(j, index) in i.ar" :key="j.id" truncated>
                        {{ index + 1 === i.ar.length ? j.name : j.name + ' / ' }}
                    </el-text>
                </div>
            </el-card>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup lang="ts">
import { addWaitingPlaylist } from "@/utils/playlist";
/*
list: 渲染列表
carousel：是否以轮播图的形式展示
*/
const prop = defineProps(['list', 'carousel'])

const list: Ref<any> = ref([])
for (let i = 0; i < Math.ceil(prop.list.length / 9); i++) {
    list.value.push(prop.list.slice(i * 9, (i + 1) * 9));
}
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
}
.el-carousel__item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.el-card {
    width: 30%;
    height: calc(60px + 2rem);
    /* margin: 0 1rem 1rem 0; */
    box-shadow: none;
    border: none;
    background: var(--bg-color);
    cursor: pointer;
    border-radius: 5px;
}

.el-card :deep(.el-card__body) {
    display: flex;
    padding: 1rem;
    position: relative;
}

.svg-icon {
    position: absolute;
    font-size: 40px;
    color: #FFF;
    left: calc(1rem + 10px);
    top: calc(1rem + 10px);
    opacity: 0;
    transition: opacity .3s;
}

.img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 1rem;
}

.info {
    position: relative;
    width: calc(100% - 60px);
    height: 100%;
}

.el-card:hover {
    background: #F0F3F6;
}

.el-card:hover .svg-icon {
    opacity: 1;
}
</style>