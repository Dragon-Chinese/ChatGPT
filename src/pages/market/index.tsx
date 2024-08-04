import { getCurrentInstance, defineComponent, reactive, onMounted, ref } from "vue";
import { toggleDark, isDark } from '@/composables/index.ts'
import { Search } from '@element-plus/icons-vue'
import people from '@/assets/images/people.png'
import './index.scss'
import tou from '@/assets/images/tou.png'
import data from './data.js'
const Market = defineComponent({
    props: {
    },
    setup(props) {
        const clickA = () => {
            toggleDark(!isDark.value)
        }
        const input2 = ref('')
        onMounted(() => {
            console.log(data)
        })

        return () => (
            <div class='market'>
                <el-input
                    v-model={input2.value}
                    placeholder="搜索助手名称介绍或关键词..."
                    prefix-icon={Search}
                    style="margin-top: -.3rem"
                    class='input_md'
                />

                <ul>
                    {
                        data.tags.map(item => {
                            return <li key={item}>
                                <span>
                                    {item}
                                </span>
                            </li>
                        })
                    }
                </ul>

                <h2>
                    全部助手
                </h2>
                <ol>
                    {
                        data.agents.map(item => {
                            return <li>
                            <div class="title">{item.meta.title}</div>
                            <p>{item.meta.description}</p>
                            <div className="ul">
                                {
                                    item.meta.tags.map(val => {
                                        return <span>
                                            {val}
                                        </span>
                                    })
                                }
                            </div>
                        </li>
                        })
                    }
                    
                </ol>
            </div>
        )
    },
});
export default Market