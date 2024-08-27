import { getCurrentInstance, defineComponent, onMounted, ref } from "vue";
import { useStore } from '@/store/index'
import people from '@/assets/images/people.png'
import './index.scss'
import { useRouter, useRoute } from 'vue-router';
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
    onMounted(() => {
      user.value = JSON.parse(localStorage.getItem('user'))
    })
    return () => (
      <>
        {route.path == '/' ? <div className="header-md">
                  <p><img src={user.value ? user.value.avatar : people} alt="" /> 智宝AI</p><el-icon><Edit /></el-icon>
          </div> : 
          <div className="header-md header-chat">
                <el-icon onClick={() => {back()}}><ArrowLeftBold /></el-icon>
                <div className="mid">
                  <p>新会话</p>
                  <span>随便聊聊 <el-icon><CaretBottom /></el-icon></span>
                </div>
                <el-icon><Share /></el-icon>
          </div> 
          
          }
      </>
         
    )
  },
});
export default Header_md