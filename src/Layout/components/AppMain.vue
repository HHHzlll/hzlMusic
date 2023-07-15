<template>
    <div class="main">
        <router-view v-slot="{ Component }">
            <Transition name="fade" appear mode="out-in">
                <component :is="Component" />
            </Transition>
        </router-view>
    </div>
</template>

<style scoped>
.main {
    max-height: calc(100vh - 80px);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-enter-active,
.fade-leave-active{
    transition: all .5s ease-out;
}
</style>