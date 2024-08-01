
import { defineStore } from 'pinia' //引入pinia
import wx from "weixin-js-sdk"
import { getChats, getChat, sendMsg, delChat, getWx, getProfile, feedback } from '@/api/mixin'
import chartGPTIcon from '@/assets/icon/ie-ChatGPT.svg'
import { Toast } from 'vant';
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
      netErr: false,
      chatTimes: {chat_times: 10},
      shareShow: false
    }) //为了避免出错，返回的值用()包起来
  },
  actions: {
    //开关分享
    OpenOff() {
      this.shareShow = !this.shareShow
    },
    //建议
    SendFeedback(content: any) {
      feedback({content}).then(res => {
        Toast({
          message: '反馈成功！',
          position: 'top',
        });
      })
    },
    // 切换会话
    ActiveChat(id: any) {
      this.tabId = id
      this.GetChat()
    },
    // 获取消息
    GetChat() {
      getChat({ chat_id: this.tabId }).then(res => {
        res.chat.messages.unshift({
          role: 'assistant',
          content: '您好，我是AI，有什么可以帮助您的'
        });
        this.message = res.chat
        console.log(this.message)
      })
    },
    // 获取消息列表
    GetChats (code) {
      getChats({until: (this.updateTime && this.updateTime*1 - 1) || Math.floor(+new Date() / 1000) + 1000}).then(res => {
        res.chats && (this.navList = this.MergeAndRemoveDuplicatesByProperty(this.navList, res.chats, 'id'))
        const msg = sessionStorage.getItem('msg')
        if(!this.navList.length) {
          return this.CreateMessage()
        }else {
          this.updateTime = this.navList[this.navList.length -1].updated_at
          console.log(this.navList)
        }
        if(!this.tabId && !msg && location.hash !== '#/') {
          this.tabId = this.navList[0].id
          this.updateTime = this.navList[this.navList.length -1].updated_at
          this.GetChat(true)
        }
      })
    },
    // 发送消息
    SenMsg (txt: String) {
      if(this.chatTimes.chat_times <= 0) {
        Toast({
          message: '可用消息次数：0',
          position: 'top',
        });
        setTimeout(() => {
          this.OpenOff()
        }, 1000)
        return
      }
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
        sendMsg({message: txt, chat_id: this.tabId}).then(res => {
            this.message.messages[this.message.messages.length - 1].content = res.message.content
            this.loading = false
            if(!this.tabId) {
              this.tabId = res.chat_id
              this.GetChats()
            }
            this.chatTimes.chat_times --
            sessionStorage.removeItem('msg')
        }).catch(err => {
            this.message.messages[this.message.messages.length - 1].content = '发送失败，请稍后重试'
            this.loading = false
            this.netErr = false
        })
    },
    MergeAndRemoveDuplicatesByProperty (arr1, arr2, property) {
      const map = new Map();

      // 先添加 arr2 的元素，保持其顺序
      arr2.forEach(item => {
          if (!map.has(item[property])) {
              map.set(item[property], item);
          }
      });

      // 再添加 arr1 的元素
      arr1.forEach(item => {
          if (!map.has(item[property])) {
              map.set(item[property], item);
          }
      });

      return Array.from(map.values());
    },
    SenMsgAlgin () {

    },
    // 创建新会话
    CreateMessage () {
      this.tabId = null
      this.updateTime = ''
      this.message = {
        messages: [{
          role: 'assistant',
          content: '您好，我是AI，有什么可以帮助您的'
        }]
      }
    },
    // 删除会话
    DeleteItem (id: any) {
      delChat({chat_id: id}).then(res => {
        this.navList = []
        this.updateTime  = ''
        this.tabId = null
        this.GetChats()
      })
    },
    // 获取消息次数
    GetProfile () {
      getProfile().then(res => {
        console.log('..............por', res.user)
        this.chatTimes.chat_times = res.user.chat_times
      })
    },
    GetWx (code) {
      getWx({url: 'https://jetbra.top/'}).then(res => {
        console.log(res)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.app_id, // 必填，公众号的唯一标识
          timestamp: Number(res.timestamp), // 必填，生成签名的时间戳
          nonceStr: res.nonce_str, // 必填，生成签名的随机串
          signature: res.signature,// 必填，签名
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
        });
        const my = JSON.parse(localStorage.getItem('user'))
        setTimeout(() => {
          wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({ 
              title: 'AIchat 让一部分人先AI起来', // 分享标题
              desc: '让一部分人先AI起来', // 分享描述
              link: 'https://jetbra.top/#/?referral=' + my.referral_code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'https://img1.baidu.com/it/u=2917569892,3712639231&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 分享图标
              success: function () {
                // 设置成功
                console.log('11111111')
              }
            })
  
            wx.updateTimelineShareData({ 
              title: 'AIchat 让一部分人先AI起来', // 分享标题
              link: 'https://jetbra.top/#/?referral=' + my.referral_code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'https://img1.baidu.com/it/u=2917569892,3712639231&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500', // 分享图标
              success: function () {
                // 设置成功
                console.log('222222222')
              }
            })
            
          }); 
        }, 300)
       

      })
    }
  }
})
