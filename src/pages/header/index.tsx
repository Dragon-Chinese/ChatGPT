import { getCurrentInstance, defineComponent } from "vue";
import { useStore } from '@/store/index'
import people from '@/assets/images/people.png'
import './index.scss'
const Header_md = defineComponent({
  props: {
  },
  setup(props) {
    const store = useStore()
    return () => (
         <div className="header-md">
                <p><img src={people} alt="" /> 智宝AI</p><el-icon><Edit /></el-icon>
         </div>
    )
  },
});
export default Header_md