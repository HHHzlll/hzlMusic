<template>
    <div class="userInfo">
        <el-avatar :src="userInfo.avatarUrl + '?param=50y50'" class="avatar" />
        <!-- <el-image src="https://p1.music.126.net/jS92kW49E37VDr8f6A1ZKg==/109951167550777780.jpg?param=200y200" class="avatar" /> -->
        <el-text truncated>{{ userInfo.nickname }}</el-text>
    </div>
</template>

<script setup lang="ts">
import { userStore } from "@/store/user";

const userInfo: any = toRefs(userStore().userInfo)
</script>

<style scoped>
.userInfo{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.avatar {
    width: 50px;
    height: 40px;
    border-radius: 50%;
    margin: 0 .5rem;
}
</style>