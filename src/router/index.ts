// src/router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const Layout = () => import('@/Layout/index.vue')

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Layout,
        redirect: '/recommend',
        children: [
            {
                path: 'recommend',
                name: 'recommend',
                component: () => import('@/views/recommend/index.vue'),
                meta: { title: '为我推荐', icon: 'recommend' }
            },
            {
                path: 'likeMusic',
                name: 'likeMusic',
                component: () => import('@/views/likeMusic/index.vue'),
                meta: { title: '我喜欢的音乐', icon: 'likeMusic' }
            }
        ]
    },
    {
        path: '/playlist',
        name: 'playlist',
        component: Layout,
        redirect: '/playlist/detail',
        children: [
            {
                path: 'detail',
                name: 'detail',
                component: () => import('@/views/Playlist/Playlist.vue'),
            }
        ]
    }
]

//  创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes as RouteRecordRaw[]
})

//  重置路由
export function resetRouter() {
    router.replace({ path: '/login' })
    location.reload()
}

export default router