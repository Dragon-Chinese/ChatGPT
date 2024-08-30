import { getCurrentInstance, defineComponent, onMounted, ref } from "vue";
import { useStore } from '@/store/index'
import people from '@/assets/images/people.png'
import './index.scss'
import { useRouter, useRoute } from 'vue-router';
import dataAll from '../data.js'
const Header_md = defineComponent({
  props: {
  },
  setup(props) {
    const store = useStore()
    const route = useRoute();
    const router = useRouter()
    const user = ref(null)
    const back = () => {
      router.go(-1)
    }
    const pathUrl = (url) => {
      console.log(url)
      store.message.messages = []
      store.system = '我是智宝AI，可以理解并回答你的问题'
      store.tabId = null
      router.push({
        name: url
      })
    }
    onMounted(() => {
      user.value = JSON.parse(localStorage.getItem('user'))
    })

    const systemFil = (val) => {
      let a = '智宝AI助手'
      dataAll.forEach(element => {
        if(element.description == store.system) {
          a = element.title
        }
      });

      return a
    }
    return () => (
      <>
        {route.path == '/' ? <div className="header-md">
                  <p><img src={user.value ? user.value.avatar : people} alt="" /> 智宝AI</p><el-icon onClick={() => {pathUrl('chat')}}><Edit /></el-icon>
          </div> : 
          <div className="header-md header-chat">
                <el-icon onClick={() => {back()}}><ArrowLeftBold /></el-icon>
                <div className="mid">
                  <p>{store.headTit}</p>
                  {route.path == '/chat' && <span>{systemFil()}</span>}
                  {/* <el-icon><CaretBottom /></el-icon> */}
                  <span></span>
                </div>
                <el-icon ><Share /></el-icon>
          </div> 
          
          }
      </>
         
    )
  },
});
export default Header_md