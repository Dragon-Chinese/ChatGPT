import { defineComponent, ref, watch } from "vue";
import { useStore } from '@/store/index';
import { useRouter, useRoute } from "vue-router";
import { isDark } from '@/composables/index.ts';
import './index.scss';
import Header_md from '@/pages/header/index';
import Footer_md from '@/pages/footer/index';

const Main = defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const showFooter = ref(true);

    // 监听路由变化
    watch(() => route.path, (newPath) => {
      showFooter.value = newPath !== '/chat';
    });

    return () => (
      <div class="body" data-theme={isDark.value ? 'dark' : 'light'}>
        <el-container>
          <el-aside class="hidden-xs-only" width="60px">Aside</el-aside>
          <el-container>
            <el-header style="height: 1.2rem">
              <Header_md />
            </el-header>
            <el-main style={{
              paddingTop: '0rem',
              paddingRight:'0.4rem',
              paddingLeft:'0.4rem'
            }}>
              <RouterView />
            </el-main>
            {showFooter.value && (
              <el-footer style="border-top:1px solid rgba(69, 68, 72, 0.25); height:1.3rem">
                <Footer_md />
              </el-footer>
            )}
          </el-container>
        </el-container>
      </div>
    );
  },
});

export default Main;
