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
            <el-image class="qrimg" v-if="qrimg !== ''" :src="qrimg" />
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { createQrKey, createQr, checkQr, getLoginStatus, logout } from "@/api/user/index.ts";
import { userStore } from "@/store/user.ts";
const user = userStore()    // 用户的pinia状态

// 如果 pinia 中用户信息不存在，重新获取
if (Object.keys(user.userInfo).length <= 0) {
    getLoginStatus().then(res => {
        user.userInfo = Object.assign(res.data.data.account, res.data.data.profile)
    })
}
// 如果 pinia 中token不存在，退出登录
if (user.token.length <= 0) {
    logout()
}

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
                        // 7、将token和用户信息存入pinia
                        user.token = res.data.cookie
                        getLoginStatus().then(res => {
                            user.userInfo = Object.assign(res.data.data.account, res.data.data.profile)
                            open.value = false
                            clearInterval(timer)
                            ElMessage({
                                message: '登陆成功，将在两秒后刷新页面！',
                                type: 'success'
                            })
                            setTimeout(() => {
                                location.reload()
                            }, 2000);
                        })
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
        user.token = ''
        user.userInfo = {}
        ElMessage({
            message: '注销成功，将在两秒后刷新页面！',
            type: 'success'
        })
        setTimeout(() => {
            location.reload()
        }, 2000);
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