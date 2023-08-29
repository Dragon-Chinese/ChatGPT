
import { defineStore } from 'pinia' //引入pinia
import { getChats, getChat, sendMsg, delChat } from '@/api/mixin'
//这里官网是单独导出  是可以写成默认导出的  官方的解释为大家一起约定仓库用use打头的单词 固定统一小仓库的名字不易混乱
export const useStore = defineStore("data", {
  state: () => {
    return ({
      title: "AI Chat",
      tabId: null,
      session: [],
      message: null,
      navList: [],
      loading: false,
      updateTime: '',
      netErr: false
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
      getChats({until: this.updateTime || +new Date()}).then(res => {
        res.chats && (this.navList = [...this.navList, ...res.chats])
        if(!res.chats) {
          console.log('123')
          return this.CreateMessage()
        }else {
          this.updateTime = this.navList[this.navList.length -1].update_time
        }
        if(!this.tabId) {
          this.tabId = this.navList[0].id
          this.updateTime = this.navList[this.navList.length -1].update_time
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
        this.netErr = false
        sendMsg({message: txt, id: this.tabId}).then(res => {
            this.message.messages[this.message.messages.length - 1].content = res.message.content
            this.loading = false
            if(!this.tabId) {
              this.tabId = res.id
              this.GetChats()
            }
        }).catch(err => {
            this.message.messages[this.message.messages.length - 1].content = '发送失败，请稍后重试'
            this.loading = false
            this.netErr = false
        })
    },
    SenMsgAlgin () {

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
    },
    // 删除会话
    DeleteItem (id: any) {
      delChat({id}).then(res => {
        this.navList = []
        this.updateTime  = ''
        this.tabId = null
        this.GetChats()
      })
    }
  }
})
