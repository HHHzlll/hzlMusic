<script setup lang="ts">
import { useRouter } from "vue-router";
import AppMain from "./components/AppMain.vue"
import NavBar from './components/NavBar/NavBar.vue'
import SideBar from './components/SideBar.vue'

// 监听 pinia 歌单信息的变化，跳转路由
import { usePlaylistStore } from "@/store/playlist";
const router = useRouter()
watch(() => usePlaylistStore().playlistDetail, () => {
    router.push({ name: 'Home' })
    setTimeout(() => {  // 延迟执行
        router.push({ name: 'playlist' })
    });
})
</script>

<template>
    <div class="container">
        <el-container>
            <el-aside width="210px">
                <SideBar />
            </el-aside>
            <el-container>
                <el-header height="80px">
                    <NavBar />
                </el-header>
                <el-main>
                    <KeepAlive>
                        <AppMain :is="true" />
                    </KeepAlive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.el-main {
    height: calc(100vh - 80px);
    padding-right: 0;
}

*>*{
    background-color: var(--bg-color);
}
</style>