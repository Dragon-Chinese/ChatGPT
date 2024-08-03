import { getCurrentInstance, defineComponent, reactive, onMounted, ref } from "vue";
import { toggleDark, isDark } from '@/composables/index.ts'
import { Search } from '@element-plus/icons-vue'
import people from '@/assets/images/people.png'
import './index.scss'
import tou from '@/assets/images/tou.png'
const Home = defineComponent({
    props: {
    },
    setup(props) {
        const clickA = () => {
            toggleDark(!isDark.value)
        }
        const input2 = ref('')
        onMounted(() => {
            console.log(isDark)
        })

        return () => (
            <div class='home'>
              <el-input
                v-model={input2.value}
                placeholder="搜索助手"
                prefix-icon={Search}
                style="margin-top: -.3rem"
                class='input_md'
              />
            <div className="top_chat">
                <img src={people} alt="" /> <p>随便聊聊</p>
            </div>
            <div className="title_ul">
                <p>AI助手列表</p>
            </div>
              <ul>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>
                <li>
                    <img src={tou} alt="" />
                    <div className="right_li">
                        <p>脏话学习助手</p>
                        <span>啊八八八八啊八八八八八八八八阿八八八</span>
                    </div>
                </li>

              </ul>
                <button
                    class="border-none w-full bg-transparent cursor-pointer"
                    style="height: var(--ep-menu-item-height)"
                    onClick={() => clickA()}
                >
                    点
                </button>
            </div>
        )
    },
});
export default Home