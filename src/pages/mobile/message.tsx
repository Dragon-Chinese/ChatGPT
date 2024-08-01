import { getCurrentInstance, defineComponent, reactive, onMounted } from "vue";
import { computed, ref, watch } from "vue-demi";
import { ElMessage } from 'element-plus'
import Markdown from 'vue3-markdown-it';
// import { useMixin } from '@/hooks/useMixin'
import '@/assets/h5.scss'
import chartGPTIcon from '@/assets/icon/ie-ChatGPT.svg'
import UserIcon from '@/assets/icon/user.svg'
import Ask from '@/assets/icon/chatgpt_Ask_one.svg'
import Set from '@/assets/icon/set.svg'
import Loading from '@/assets/icon/loading.svg'
import Copy from '@/assets/icon/loading.svg'
import Popup from '@/components/mobile/popup'
import { useStore } from '@/store/index.ts'
import { nextTick } from "process";
import Drag from '@/components/Drag.vue'
import clipboard3 from 'vue-clipboard3'
import { Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';
import { sendMsg } from "@/api/mixin";
import pen from '@/assets/icon/pen.gif'
const Main = defineComponent({
  props: {
  },
  setup(props) {
    // 008AFF
    const store = useStore()
    const Route = useRoute()
    const txt = ref('')
    const childRef = ref(null)
    const user = ref(null)
    // 解构方法
    const { toClipboard } = clipboard3()
    // 发送消息
    const onSend = () => {
      store.SenMsg(txt.value)
      txt.value = ''
      setTimeout(() => {
        scrollBottoom()
      }, 100)
    }

    //计算滚到底部
    const scrollBottoom = () => {
      let a = document.querySelectorAll('#main ul>li')
      let b = a[a.length - 1]
      b && (document.querySelector('#main').scrollTop = b.offsetTop + b.offsetHeight)
    }

    // 打开侧边选项
    const PopupTab = () => {
      childRef.value.tabStatus()
    }

    watch(() => store.message, (n) => {
      nextTick(() => {
        store.message && store.message.messages.length && scrollBottoom()
      })
    }, { deep: true, immediate:true })

    onMounted(() => {
      const local = localStorage.getItem('user');
      const userData = local && JSON.parse(local);
      user.value = userData || null;
      document.title = user.value ? 'Hello！' + user.value.username : 'AI Chat1';
      const msg = sessionStorage.getItem('msg')
      msg && newChat()
    })

   
    const newChat = () => {
      console.log(Route.params)
      store.CreateMessage()
      txt.value = sessionStorage.getItem('msg')
      onSend()
    }

    const copy = async (val: any) => {
      try {
        await toClipboard(val)
        Toast({
          message: '复制成功',
          position: 'top',
        });
      } catch (err) {
          Toast({
            message: '复制失败',
            position: 'top',
          });
      }
    }

    const algin = () => {
      // 发送消息
      store.SenMsgAlgin()
    }

    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        // 在这里执行你想要的操作
        onSend()
      }
    };

    return () => (
      <div class='wrapper'>
        <Popup ref={childRef} />
        <div class="box">
          <header>
            {/* <van-nav-bar
              v-slots={{
                left: <img onClick={() => {}} src={Set} alt="" />,
                title: <p>{store.title}</p>,
                right: <img onClick={() => {PopupTab()}} src={Ask} alt="" />
              }}
            >
            </van-nav-bar> */}
          </header>
          <main id="main">
            <ul>
              {store.message && store.message.messages.map((val, index) => {
                return val.role === 'user' ? <li key={index} class={val.role}>
                  <div class="wrap">
                    <div class={'info'}>
                      <span> { user.value && user.value.username } </span>
                      <div class="pix"><img src={UserIcon} alt="" /></div>
                    </div>
                    <div class={'mark'}>
                      <Markdown source={val.content} />
                    </div>
                  </div>
                </li> :
                  <li key={index} class={val.role}>
                    <div class="wrap">
                      <div class='info'>
                        <div class="pix"><img src={chartGPTIcon} alt="" /></div>
                        <span>AI Chat</span>
                      </div> 
                      <div class='mark'>
                        {index+1 === store.message.messages.length ? (!store.loading ? <Markdown source={val.content} /> : <span class={'think'}>努力思考中... <img src={Loading} alt="" /></span>) : <Markdown source={val.content} /> }
                        {!!index && <van-divider />}
                        {!!index && !store.loading ? store.netErr ?  <img src={Loading} alt="" onClick={() => {algin}} />  : <img onClick={() => {copy(val.content)}} src={Copy} alt="" />  : '' }
                      </div>
                    </div>
                  </li>
              })}
            </ul>
          </main>
          <footer>
            {/* <van-search
              vModel={txt.value}
              showAction
              placeholder={'消息剩余：' + store.chatTimes.chat_times + ' 条'}
              onSearch={() => {onSend()}}
              onKeyup={handleEnter}
              v-slots={{
                action: <div onClick={() => { onSend() }}><van-button disabled={store.loading} type="primary" size="small">{!store.loading ? '发送' : '思考中'}</van-button></div>
              }}
            >
            </van-search> */}
            <div class="send">
                            <div class="send-msg">
                                <input type="text" onKeyup={handleEnter} vModel={txt.value} placeholder="请输入任意内容" />
                                <img src={pen}  onClick={() => {onSend()}} alt="" />
                            </div>
                        </div>
          </footer>

        </div>
        <Drag onClick={() => {PopupTab()}}></Drag>
      </div>
    )
  },
});
export default Main