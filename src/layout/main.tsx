import { getCurrentInstance, defineComponent } from "vue";
import { computed, ref, watch } from "vue-demi";
import { ElMessage } from 'element-plus'
import { useStore } from '@/store/index'
import { RouterView } from "vue-router";
import { toggleDark, isDark } from '@/composables/index.ts'
import './index.scss'
import Header_md from '@/pages/header/index'
import Footer_md from '@/pages/footer/index'
const Main = defineComponent({
  props: {
  },
  setup(props) {
    const store = useStore()
    return () => (
      <div class={'body'} data-theme={isDark ? 'dark' : 'light'}>
        {/* {store.shareShow && <div onClick={() => { store.OpenOff() }} class="share">
        <p>戳到这里可以</p>
        <p>分享到好友或朋友圈</p>
        <p>成功邀请一个好友可获得10次消息次数哦！！！</p>
        </div>} */}
        <el-container>
          <el-aside class="hidden-xs-only" width="60px">Aside</el-aside>
          <el-container>
            <el-header style="height: 1.2rem">
              < Header_md />
            </el-header>
            <el-main style={{
              paddingTop: '0rem',
              paddingRight:'0.4rem',
              paddingLeft:'0.4rem'
            }}>
              <RouterView />
            </el-main>
            <el-footer style="border-top:1px solid rgba(69, 68, 72, 0.25);height:1.3rem"><Footer_md /></el-footer>
          </el-container>
          
        </el-container>

      </div>
    )
  },
});
export default Main