<template>
    <el-scrollbar height="100vh" class="container">
        <el-menu :default-active="route.path" :default-openeds="['user']" router class="menu">
            <el-menu-item @click="router.push({name:'Home'})">
                <el-avatar :size="30"
                    :src="logo" />
                <h2 class="title">{{ title }}</h2>
            </el-menu-item>
            <!-- 列表渲染所有路由 -->
            <el-menu-item v-for="(route, index) in routesList" :key="index" :index="route.path" :route="route">
                <svg-icon class="icon" :icon-class="route.meta.icon" />
                {{ route.meta.title }}
            </el-menu-item>

            <el-sub-menu index="user" v-if="userLogin()">
                <template #title>
                    <el-text>用户创建的歌单</el-text>
                </template>
                <el-menu-item v-for="item in userPlaylist" :key="item.id" @click="getPlaylistDetail(item.id)">
                    <el-avatar :src="item.coverImgUrl + '?param=50y50'" :size="30" />
                    <el-text truncated>{{ item.name }}</el-text>
                </el-menu-item>
            </el-sub-menu>
            <el-text v-else>登录后查看更多~</el-text>
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import logo from '@/assets/logo.webp'
const route = useRoute()

// 获取所有路由列表
const router = useRouter()
const routes = router.getRoutes()
const routesList = routes.filter(item => Object.keys(item.meta).length > 0) // 只保留meta不为空的路由
// 页面标题
const title = import.meta.env.VITE_APP_TITLE

// 用户创建的歌单
import { getUserPlaylist } from "@/api/playlist";
import { userStore } from "@/store/user";
import { getPlaylistDetail } from '@/utils/playlist';

const user: any = userStore()
const userPlaylist: any = ref([])
function userLogin() {
    if (user.userInfo.profile) {
        getUserPlaylist(user.userInfo.profile.userId).then(res => {
            userPlaylist.value = res.data.playlist
        })
    }
    return user.userInfo.profile
}
</script>

<style scoped>
/* 侧边栏高度铺满 */
.container, ul {
    height: 100vh;
    background: #F0F3F6;
}

/* logo和标题 */
.el-avatar {
    margin: 0 10px 0 -10px;
}

.title {
    font-family: "STHupo",serif;
}

/* 菜单栏 */
.icon {
    margin-right: 10px;
}

.menu {
    padding: 1rem;
    border: none;
    --el-menu-bg-color: opacity: 0;
    --el-menu-text-color: #787F8D;
    --el-menu-active-color: #FFFFFF;
}

.el-menu-item {
    margin: 10px 0;
    border-radius: 10px;
}

.el-menu-item.is-active {
    background: var(--primary-color);
}
</style>