<template>
    <div class="awaitPlaylist">
        <svg-icon class="icon" icon-class="awaitPlaylist" />
        <el-table class="list">

        </el-table>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.awaitPlaylist{
    display: flex;
    align-items: center;
}
.icon {
    font-size: 1.3rem;
    color: var(--primary-color);
}

.list{
    position: absolute;
    right: 1rem;
    top: 100px;
    z-index: 10;
    width: 30vw;
    min-width: 300px;
    box-shadow: 0 0 10px #ccc;
}
</style>