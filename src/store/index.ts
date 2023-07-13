
import { defineStore } from 'pinia' //引入pinia
import { getChats, getChat, sendMsg } from '@/api/mixin'
//这里官网是单独导出  是可以写成默认导出的  官方的解释为大家一起约定仓库用use打头的单词 固定统一小仓库的名字不易混乱
export const useStore = defineStore("data", {
  state: () => {
    return ({
      title: "AI 小助手",
      tabId: null,
      session: [],
      message: null,
      navList: null,
      loading: false
    }) //为了避免出错，返回的值用()包起来
  },
  actions: {
    // 切换会话
    ActiveChat(id: any) {
      this.tabId = id
      this.GetChat()
    },
    // 获取消息
    GetChat() {
      getChat({ id : this.tabId }).then(res => {
        this.message = res.chat
        console.log(this.message)
      })
    },
    // 获取消息列表
    GetChats () {
      getChats({until: +new Date()}).then(res => {
        console.log(res)
        this.navList = res.chats
        if(!res.chats.length) {
          return this.CreateMessage()
        }
        if(!this.tabId) {
          this.tabId = this.navList[0].id
          this.GetChat()
        }
      })
    },
    // 发送消息
    SenMsg (txt: String) {
      if (!txt) return
        this.message.messages.push({
            role: 'user',
            content: txt
        })
        this.message.messages.push({
            role: 'assistant',
            content: ''
        })
        this.loading = true
        sendMsg({message: txt, id: this.tabId}).then(res => {
            this.message.messages[this.message.messages.length - 1].content = res.message.content
            this.loading = false
            if(!this.tabId) {
              this.tabId = res.id
              this.GetChats()
            }
        })
    },
    // 创建新会话
    CreateMessage () {
      this.tabId = null
      this.message = {
        messages: []
      }
      this.message.messages.push({
        role: 'assistant',
        content: '您好，我是AI，有什么可以帮助您的'
      })
    }
  }
})
