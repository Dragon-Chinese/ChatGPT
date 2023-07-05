import { getCurrentInstance, defineComponent } from "vue";
import { computed, ref, watch } from "vue-demi";
import { ElMessage } from 'element-plus'
import '@/assets/h5.scss'
import { RouterView } from "vue-router";
const Main = defineComponent({
  props: {
  },
  setup(props) {
    return () => (
      <div class={'main'}>
        <RouterView />
      </div>
    )
  },
});
export default Main