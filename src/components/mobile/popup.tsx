import { getCurrentInstance, defineComponent, reactive, onMounted } from "vue";
import { computed, ref, watch } from "vue-demi";
import { ElMessage } from 'element-plus'
import { useMixin } from '@/hooks/useMixin'
import '@/assets/popup.scss'
const Popup = defineComponent({
  props: {
  },
  setup(props, context) {
    const { allData, defaultId, CreateMessage, TabId, a } = useMixin()
    const show = ref(false)
    const tabStatus = () => {
      show.value = !show.value
      console.log(allData)
    }
    const activeChat = (val: number) => {
      TabId(val)
      show.value = false
    }
    context.expose({tabStatus})

    return () => (
        <van-popup vModel:show={show.value} position="right" style={{width: '70%',height: '100%' }}>
          <div class={'main-popup'}>
            <div class={'data-header'}>
              <span class={'add-button'} onClick={() => {CreateMessage()}}> + 创建新对话</span>
            </div>
            <div class={'data-view'}>
              <ul>
                {
                  allData.map((val, index) => {
                    return <li key={index} class={index*1 === defaultId.value*1 && 'active'} onClick={() => {activeChat(val.id)}}>
                      {val.message.length > 1 ? val.message[1].content : 'New Chat'}
                    </li>
                  })
                }
              </ul>
            </div>
            <div class={'data-bottom'}>
              <p class={'tips'}>登录后可自动同步设备聊天记录</p>
              <div class={'clear-button'}>清空所有会话</div>
            </div>
          </div>
        </van-popup>
    )
  },
});
export default Popup