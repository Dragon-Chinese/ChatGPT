import { getCurrentInstance, defineComponent } from "vue";
import { computed, ref, watch } from "vue-demi";
import { ElMessage } from 'element-plus'
import '@/assets/h5.scss'
import { useStore } from '@/store/index'
import { RouterView } from "vue-router";
const Main = defineComponent({
  props: {
  },
  setup(props) {
    const store = useStore()
    return () => (
      <div class={'main'}>
        {store.shareShow && <div onClick={() => { store.OpenOff() }} class="share">
        <p>戳到这里可以</p>
        <p>分享到好友或朋友圈</p>
        <p>成功邀请一个好友可获得10次消息次数哦！！！</p>
        </div>}
        <RouterView />
      </div>
    )
  },
});
export default Main