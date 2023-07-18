<template>
    <div class="container">
        <Music />
        <UserInfo />
        <Login />
    </div>
</template>

<script setup lang="ts">
import Music from "./Music/music.vue";
import Login from "./Login.vue";
import UserInfo from "./UserInfo.vue";

</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 150px 60px;
    border-radius: 0 0 4px 4px;
}
</style>