import { getCurrentInstance, defineComponent, reactive, onMounted, ref } from "vue";
import { toggleDark, isDark } from '@/composables/index.ts'
import { Search } from '@element-plus/icons-vue'
import people from '@/assets/images/people.png'
import './index.scss'
import tou from '@/assets/images/tou.png'
import data from '../data.js'
import { useStore } from '@/store/index.ts'
import router from "@/router";
import { useRouter, useRoute } from 'vue-router';
const Market = defineComponent({
    props: {
    },
    setup(props) {
        const store = useStore()
        const router = useRouter()
        const clickA = () => {
            toggleDark(!isDark.value)
        }
        const input2 = ref('')
        onMounted(() => {
            console.log(data)
            store.headTit = '精选助手'
        })
        // const systemFil = (val) => {
        //     let a = '我是智宝AI，可以理解并回答你的问题'
        //     data.forEach(element => {
        //       if(element.description == val) {
        //         a = element.userPerspective
        //         console.log(a)
        //       }
        //     });
      
        //     return a
        //   }

        const systemAct = (val) => {
            console.log(val)
            store.message.messages = []
            store.system = val.description
            // console.log(systemFil(store.system))
            store.message.messages.push({
              content: val.description,
              role: "system"
            })
            store.tabId = null
            router.push({name: 'chat'})
          }

        return () => (
            <div class='market'>
                <el-input
                    v-model={input2.value}
                    placeholder="搜索助手名称介绍或关键词..."
                    prefix-icon={Search}
                    style="margin: .3rem 0"
                    class='input_md'
                />

                {/* <ul>
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
                </h2> */}
                <ol>
                    {
                        data.map(item => {
                            return <li onClick={() => {systemAct(item)}}>
                            <div class="title">{item.title}</div>
                            <p>{item.userPerspective}</p>
                            {/* <div className="ul">
                                {
                                    item.tags.map(val => {
                                        return <span>
                                            {val}
                                        </span>
                                    })
                                }
                            </div> */}
                        </li>
                        })
                    }
                    
                </ol>
            </div>
        )
    },
});
export default Market