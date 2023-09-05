import request from '../utils/request'

// 发送消息
export function sendMsg<T>(data: T): any {
    return request({
        // url: 'http://192.168.1.152:8080/api/v1/ai/chat',
        url: 'https://jetbra.top/api/v1/ai/chat',
        method: 'post',
        data
    })
}

// 获取会话列表
export function getChats(params: any): Object {
    return request({
        url: 'https://jetbra.top/api/v1/ai/chats',
        method: 'get',
        params
    })
}

// 获取消息
export function getChat(params: any): Object {
    return request({
        url: 'https://jetbra.top/api/v1/ai/chat',
        method: 'get',
        params
    })
}

// 删除消息
export function delChat(params: any): Object {
    return request({
        url: 'https://jetbra.top/api/v1/ai/chat',
        method: 'delete',
        params
    })
}

// 发送消息
export function getToken<T>(data: T): any {
    return request({
        // url: 'http://192.168.1.152:8080/api/v1/ai/chat',
        url: 'https://jetbra.top/api/v1/wx/oauth',
        method: 'post',
        data
    })
}
