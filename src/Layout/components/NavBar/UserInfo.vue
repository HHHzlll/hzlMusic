<template>
    <div class="userInfo" v-if="user.userInfo.profile">
        <el-avatar :size="40" :src="user.userInfo.profile.avatarUrl + '?param=40y40'" class="avatar" />
        <el-text truncated>{{ user.userInfo.profile.nickname }}</el-text>
    </div>
    <div class="userInfo" v-else>
        <el-avatar :size="40" class="avatar" />
        <el-text truncated>游客</el-text>
    </div>
</template>

<script setup lang="ts">
import { userStore } from "@/store/user";

const user: any = userStore()
</script>

<style scoped>
.userInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

.avatar {
    position: absolute;
    left: 0;
    border-radius: 50%;
    margin: 0 .5rem;
}

.el-text {
    padding-left: 50px;
}
</style>