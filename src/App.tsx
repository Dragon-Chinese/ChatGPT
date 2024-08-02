import { defineComponent } from "@vue/runtime-core";
import { onMounted } from "vue";
import Main from '@/layout/main';
const App = defineComponent({
  setup() {
    onMounted (() => {
    })
    return () => (
     <Main />
    )
  },
});
export default App;