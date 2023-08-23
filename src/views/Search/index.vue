<script setup lang="ts">
import Single from "@/views/Search/tabs/Single.vue";
import Album from "@/views/Search/tabs/Album.vue";
import Singer from "@/views/Search/tabs/Singer.vue";
import SingingList from "@/views/Search/tabs/SingingList.vue";
import Users from "@/views/Search/tabs/Users.vue";
import MV from "@/views/Search/tabs/MV.vue";
import RadioStation from "@/views/Search/tabs/RadioStation.vue";
import Video from "@/views/Search/tabs/Video.vue";

const tabType = '1'
</script>

<template>
  <div>
    <el-tabs v-model="tabType" class="el-tabs">
      <el-tab-pane label="单曲" name="1">
        <Single/>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="10">
        <Album/>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="100">
        <Singer/>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="1000">
        <SingingList/>
      </el-tab-pane>
      <el-tab-pane label="用户" name="1002">
        <Users/>
      </el-tab-pane>
      <el-tab-pane label="MV" name="1004">
        <MV/>
      </el-tab-pane>
      <el-tab-pane label="电台" name="1009">
        <RadioStation/>
      </el-tab-pane>
      <el-tab-pane label="视频" name="1014">
        <Video/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>

</style>