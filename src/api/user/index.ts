import request from '@/utils/request.ts'
// 登录
// 1、二维码 key 生成
export function createQrKey() {
    return request({
        url: '/login/qr/key?timestamp' + new Date().getTime(),
        method: 'get'
    })
}

// 2、二维码生成
export function createQr(key: string) {
    return request({
        url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${new Date().getTime()}`,
        method: 'get'
    })
}

// 3、检测扫码状态
/* 
轮询此接口可获取二维码扫码状态
800 为二维码过期
801 为等待扫码
802 为待确认
803 为授权登录成功(803 状态码下会返回 cookies)
如扫码后返回502,则需加上noCookie参数,如&noCookie=true
*/
export function checkQr(key: string) {
    return request({
        url: `/login/qr/check?key=${key}&timestamp=${new Date().getTime()}`,
        method: 'get'
    })
}

// 退出登录
export function logout() {
    return request({
        url: '/logout?timestamp=' + new Date().getTime(),
        method: 'get'
    })
}

// 获取登陆状态
export function getLoginStatus(cookie: string) {
    const data = { cookie }
    return request({
        url: '/login/status?timestamp=' + new Date().getTime(),
        method: 'post',
        data
    })
}

// 通过id获取用户信息
export function getUserDetail(uid: number) {
    const params = { uid }
    return request({
        url: '/user/detail',
        method: 'get',
        params
    })
}