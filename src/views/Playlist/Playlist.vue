<template>
    <div>
        <Header @play-music="() => all++" />
        <Main :playMusicAll="all" />
    </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Main from "./Main.vue";

// 接受子组件的参数
const all = ref(0)
</script>