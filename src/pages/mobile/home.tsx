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
import Popup from '@/components/mobile/popup'
import { useStore } from '@/store/index.ts'
import { nextTick } from "process";
const Main = defineComponent({
  props: {
  },
  setup(props) {
    // 008AFF
    const store = useStore()
    const txt = ref('')
    const childRef = ref(null)
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
    })

    return () => (
      <div class='wrapper'>
        <Popup ref={childRef} />
        <div class="box">
          <header>
            <van-nav-bar left-text="返回" left-arrow
              v-slots={{
                left: <img onClick={() => {}} src={Set} alt="" />,
                title: <p>{store.title}</p>,
                right: <img onClick={() => {PopupTab()}} src={Ask} alt="" />
              }}
            >
            </van-nav-bar>
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
                        <span>小助手</span>
                      </div>
                      <div class='mark'>
                        {index+1 === store.message.messages.length ? (!store.loading ? <Markdown source={val.content} /> : <span class={'think'}>努力思考中... <img src={Loading} alt="" /></span>) : <Markdown source={val.content} /> }
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
      </div>
    )
  },
});
export default Main