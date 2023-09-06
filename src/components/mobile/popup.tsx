import { getCurrentInstance, defineComponent, reactive, onMounted } from "vue";
import { computed, ref, watch } from "vue-demi";
import { ElMessage } from 'element-plus'
import del from '@/assets/icon/del.svg'
// import { useMixin } from '@/hooks/useMixin'
import { useStore } from '@/store/index'
import '@/assets/popup.scss'
const Popup = defineComponent({
  props: {
  },
  setup(props, context) {
    const store = useStore()
    const show = ref(false)
    const tabStatus = () => {
      show.value = !show.value
    }
    const activeChat = (val: number) => {
      if(store.tabId == val) return;
      store.ActiveChat(val)
      tabStatus()
    }
    const newChat = () => {
      store.CreateMessage()
      tabStatus()
    }
    const getMore = () => {
      store.GetChats()
    }
    const deleteItem = (id: any) => {
      store.DeleteItem(id)
    }
    context.expose({tabStatus})

    return () => (
        <van-popup vModel:show={show.value} position="right" style={{width: '70%',height: '100%' }}>
          <div class={'main-popup'}>
            <div class={'data-header'}>
              <span class={'add-button'} onClick={() => {newChat()}}> + 创建新对话</span>
            </div>
            <div class={'data-view'}>
              <ul>
                {
                  store.navList.length ? store.navList.map((val, index) => {
                    return <li key={index} class={val.id*1 === store.tabId*1 && 'active'} onClick={() => {activeChat(val.id)}}>
                      {val.title || 'New Chat'} {val.id*1 === store.tabId*1 && <img onClick={() => {deleteItem(val.id)}} src={del} alt="" />}
                    </li> 
                  }) : null
                }
              </ul>
              <span class={'more'} onClick={() => {getMore()}}>加载更多...</span>
            </div>
            <div class={'data-bottom'}>
              {/* <p class={'tips'}>登录后可自动同步设备聊天记录</p> */}
              {/* <div class={'clear-button'}>清空所有会话</div> */}
            </div>
          </div>
        </van-popup>
    )
  },
});
export default Popup