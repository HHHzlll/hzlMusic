<script setup lang="ts">
import {useRouter} from "vue-router";
import AppMain from "./components/AppMain.vue"
import NavBar from '@/Layout/components/MusicBar/MusicBar.vue'
import SideBar from './components/SideBar.vue'
import Header from '@/Layout/components/Header.vue'

// 监听 pinia 歌单信息的变化，跳转路由
import {usePlaylistStore} from "@/store/playlist";

const router = useRouter()
watch(() => usePlaylistStore().playlistDetail, () => {
  router.push({name: 'Home'})
  setTimeout(() => {  // 放到延迟队列最后执行
    router.push({name: 'playlist'})
  });
})
</script>

<template>
  <div class="container">
    <!--        <el-container>-->
    <!--            <el-aside width="210px">-->
    <!--                <SideBar />-->
    <!--            </el-aside>-->
    <!--            <el-container>-->
    <!--                <el-header height="80px">-->
    <!--                    <MusicBar />-->
    <!--                </el-header>-->
    <!--                <el-main>-->
    <!--                    <KeepAlive>-->
    <!--                        <AppMain :is="true" />-->
    <!--                    </KeepAlive>-->
    <!--                </el-main>-->
    <!--            </el-container>-->
    <!--        </el-container>-->
    <el-container>
      <el-container>
        <el-aside width="210px">
          <SideBar/>
        </el-aside>
        <el-container>
          <el-header height="60px">
            <Header/>
          </el-header>
          <el-main>
            <AppMain/>
          </el-main>
        </el-container>
      </el-container>
      <el-footer height="80px">
        <NavBar/>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.el-main {
  height: calc(100vh - 80px);
  padding-right: 0;
  padding-bottom: 80px;
  padding-top: 0;
}

.el-footer {
  position: absolute;
  width: 100%;
  z-index: 999;
  bottom: 0;
  padding: 0;
}

* > * {
  background-color: var(--bg-color);
}
</style>