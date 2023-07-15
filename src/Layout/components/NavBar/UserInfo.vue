<template>
    <div class="userInfo">
        <el-avatar :size="40" :src="userInfo.avatarUrl + '?param=50y50'" />
        {{ userInfo.nickname }}
    </div>
</template>

<script setup lang="ts">
import { userStore } from "@/store/user";

const userInfo: any = userStore().userInfo
</script>

<style scoped>
.userInfo{
    display: flex;
    align-items: center;
    justify-content: center;
}
.el-avatar {
    margin: 0 .5rem;
}
</style>