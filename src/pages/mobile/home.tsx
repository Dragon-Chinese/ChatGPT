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
import Copy from '@/assets/icon/copy.svg'
import Popup from '@/components/mobile/popup'
import { useStore } from '@/store/index.ts'
import { nextTick } from "process";
import Drag from '@/components/Drag.vue'
import clipboard3 from 'vue-clipboard3'
import { Toast } from 'vant';
const Main = defineComponent({
  props: {
  },
  setup(props) {
    // 008AFF
    const store = useStore()
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
      const local = sessionStorage.getItem('user')
      const user = local && JSON.parse(local)
      user.value = user || null
      document.title = user ? 'Hello！' + user.username : 'AI Chat'
    })

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
                      <span> 用户 </span>
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
            <van-search
              vModel={txt.value}
              showAction
              placeholder="您的问题..."
              onSearch="onSearch"
              v-slots={{
                action: <div onClick={() => { onSend() }}><van-button disabled={store.loading} type="primary" size="small">{!store.loading ? '发送' : '思考中'}</van-button></div>
              }}
            >
            </van-search>
          </footer>

        </div>
        <Drag onClick={() => {PopupTab()}}></Drag>
      </div>
    )
  },
});
export default Main