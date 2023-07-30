<template>
    <div class="login">
        <el-button class="loginBtn" size="small" type="danger" @click="handleLogin" v-if="!user.token">登 录</el-button>
        <!-- 退出登录确认框 -->
        <el-popconfirm v-else confirm-button-text="是" cancel-button-text="否" title="确定要注销吗？" @confirm="handleLogout">
            <template #reference>
                <el-button class="loginBtn" size="small" type="info">注 销</el-button>
            </template>
        </el-popconfirm>
        <!-- 登录对话框 -->
        <el-drawer v-model="open" width="500px">
            <h2>请使用网易云音乐App 扫码登录</h2>
            <p>{{ loginStatus }}</p>
            <el-divider />
            <el-image class="qrimg" v-if="qrimg !== ''" :src="qrimg" />
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { createQrKey, createQr, checkQr, getLoginStatus, logout } from "@/api/user/index.ts";

import { userStore } from "@/store/user.ts";
const user = userStore()    // 用户的pinia状态


// 登录功能
const qrimg: Ref<string> = ref('')
const open: Ref<boolean> = ref(false)
let uniKey: string
const loginStatus: Ref<string> = ref('')
// 1、用户点击登录
function handleLogin() {
    // 2、打开对话框
    open.value = true
    // 3、创建key
    createQrKey().then(res => {
        uniKey = res.data.data.unikey
        // 4、使用key创建二维码
        createQr(uniKey).then(res => {
            qrimg.value = res.data.data.qrimg
            // 5、定时器循环查看用户的扫码状态
            const timer = setInterval(() => {
                checkQr(uniKey).then(res => {
                    loginStatus.value = res.data.message
                    // 6、用户登陆成功
                    if (res.data.code === 803) {
                        // 7、将token存入pinia
                        user.changeToken(res.data.cookie)
                        document.cookie = res.data.cookie
                        // 8、将用户信息存入pinia
                        getLoginStatus(user.token).then(res => user.changeUserInfo(res.data.data))
                        ElMessage({
                            message: '登陆成功！',
                            type: 'success'
                        })
                        open.value = false
                        clearInterval(timer)
                    }
                    if(res.data.code === 800){
                        clearInterval(timer)
                    }
                    if (open.value === false) clearInterval(timer)
                })
            }, 1000)
        })
    })
}

// 注销
function handleLogout() {
    logout().then(() => {
        // 清空pinia中的token和用户信息
        user.changeToken('')
        user.changeUserInfo({})
        ElMessage({
            message: '注销成功！',
            type: 'success'
        })
        // location.reload()
    })
}

</script>

<style scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
}

.loginBtn {
    margin: 0 .5rem;
}
</style>