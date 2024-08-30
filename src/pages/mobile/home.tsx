import { getCurrentInstance, defineComponent, reactive, onMounted, ref } from "vue";
import { toggleDark, isDark } from '@/composables/index.ts'
import { Search } from '@element-plus/icons-vue'
import people from '@/assets/images/people.png'
import './index.scss'
import tou from '@/assets/images/tou.png'
import { useRouter, useRoute } from 'vue-router';
import { sendMsg, getChat } from '@/api/mixin'
import { useStore } from '@/store/index.ts'
const Home = defineComponent({
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
            // let chatID = null; // 你可以根据实际情况设置chatID

            // let messagePayload = {
            //     message: '写一个递归算法',
            //     system: "你是一个高级的js程序员，请仔细回答我的问题"
            // };

            // if (chatID) {
            //     messagePayload.chatID = chatID;
            // }
            // console.log(isDark)
            // sendMsg(messagePayload).then(res => {
            //     console.log(msg)
            // })
            store.GetChats()
            setTimeout(() => {
                store.GetWx()
            }, 0)
        })
        const handleCommand = (command: string | number | object) => {
            console.log(`click on item ${command}`)
            store.DeleteItem(command)
        }

        const message = (id: any) => {
            if(!id) {
                store.tabId = null
                store.message.messages = []
                console.log(id)
                router.push({name: 'chat'})
            } else {
                router.push({
                    name: 'chat',
                    query: { id }
                })
            }
            
        }

        const market = () => {
            router.push({
                name: 'market'
            })
        }

        return () => (
            <div class='home'>
                <el-input
                    v-model={input2.value}
                    placeholder="搜索对话"
                    prefix-icon={Search}
                    style="margin-top: -.3rem"
                    class='input_md'
                />
                <div className="top_chat" onClick={() => {message('')}}>
                    <img src={people} alt="" /> <p>创建新对话</p>
                </div>
                <div className="title_ul">
                    <p>历史对话</p>
                </div>
                
                <ul>
                    {console.log(store.navList)}
                    {store.navList.length ? store.navList.map(item => {
                        const options = {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: true, // 使用12小时制
                        };

                        const formattedDate = new Date(item.createdAt * 1000).toLocaleString('zh-CN', options).replace('上午', ' 上午').replace('下午', ' 下午');

                        return <li>
                            <img src={tou} alt="" />
                            <div className="right_li" onClick={() => { message(item.id) }}>
                                <p>{item.title}</p>
                                <span>创建时间：{formattedDate}</span>
                            </div>
                            <ElDropdown
                                trigger="click"
                                onCommand={handleCommand}
                                v-slots={{
                                    dropdown: () => (
                                        <ElDropdownMenu>
                                            <ElDropdownItem command={item.id}>删除</ElDropdownItem>
                                        </ElDropdownMenu>
                                    ),
                                }}
                            >
                                <span class="el-dropdown-link">
                                    <ElIcon class="el-icon--right">
                                        <More />
                                    </ElIcon>
                                </span>
                            </ElDropdown>
                        </li>
                    }) : <el-empty description="您还没有历史对话">
                    <el-button plain onClick={() => {message('')}}>新建对话</el-button>
                    <el-button plain onClick={() => {market()}}>精选助手</el-button>
                </el-empty>}

                </ul>
                {/* <button
                    class="border-none w-full bg-transparent cursor-pointer"
                    style="height: var(--ep-menu-item-height)"
                    onClick={() => clickA()}
                >
                    点
                </button> */}
            </div>
        )
    },
});
export default Home