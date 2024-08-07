import { getCurrentInstance, defineComponent } from "vue";
import { useStore } from '@/store/index'
import people from '@/assets/images/people.png'
import './index.scss'
import { useRoute } from 'vue-router';
const Header_md = defineComponent({
  props: {
  },
  setup(props) {
    const store = useStore()
    const route = useRoute();
    return () => (
      <>
        {route.path == '/' ? <div className="header-md">
                  <p><img src={people} alt="" /> 智宝AI</p><el-icon><Edit /></el-icon>
          </div> : 
          <div className="header-md header-chat">
                <el-icon><ArrowLeftBold /></el-icon>
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