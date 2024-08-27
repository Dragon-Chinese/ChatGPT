import request from '../utils/request'

// 发送消息
export function sendMsg<T>(data: T): any {
    return request({
        // url: 'http://192.168.1.152:8080/api/v1/ai/chat',
        url: 'https://api.zhibaoai.top/v1/chat',
        method: 'post',
        data
    })
}

// 获取会话列表
export function getChats(params: any): Object {
    return request({
        url: 'https://api.zhibaoai.top/v1/chats',
        method: 'get',
        params
    })
}

// 获取消息
export function getChat(chatID: number): Object {
    return request({
      url: `https://api.zhibaoai.top/v1/chat/${chatID}`,
      method: 'get'
    });
  }

// 删除消息
export function delChat(chatID: number): Object {
    return request({
        url: `https://api.zhibaoai.top/v1/chat/${chatID}`    ,
        method: 'delete'
    })
}

// 发送消息
export function getToken<T>(data: T): any {
    return request({
        // url: 'http://192.168.1.152:8080/api/v1/ai/chat',
        url: 'https://api.zhibaoai.top/v1/wechat/oauth',
        method: 'post',
        data
    })
}

// 发送消息
export function getWx<T>(data: T): any {
    return request({
        // url: 'http://192.168.1.152:8080/api/v1/ai/chat',
        url: 'https://api.zhibaoai.top/v1/wechat/token',
        method: 'post',
        data
    })
}

// 获取次数
export function getProfile(params: any): Object {
    return request({
        url: 'https://api.zhibaoai.top/v1/user/profile',
        method: 'get',
        params
    })
}

// 发送消息
export function feedback<T>(data: T): any {
    return request({
        // url: 'http://192.168.1.152:8080/api/v1/ai/chat',
        url: 'https://api.zhibaoai.top/v1/feedback',
        method: 'post',
        data
    })
}

