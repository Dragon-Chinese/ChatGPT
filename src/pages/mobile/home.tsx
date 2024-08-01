import { getCurrentInstance, defineComponent, reactive, onMounted, ref } from "vue";
import '@/assets/h5.scss'
import { Tab, Tabs } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import pen from '@/assets/icon/pen.gif'
import { useRouter, useRoute } from 'vue-router';
import Popup from '@/components/mobile/popup'
import his from '@/assets/icon/jl.svg'
import share from '@/assets/icon/share.svg'
import { useStore } from '@/store/index.ts'
import { Toast } from 'vant';
const Home = defineComponent({
    props: {
    },
    setup(props) {
        const Router = useRouter()
        const childRef = ref(null)
        const store = useStore()
        const feed = ref('')
        const list = reactive({
            data: [
                {
                    title: 'AI创作',
                    child: [
                        {
                            title: '帮我写一篇写一篇生活vlog脚本 →'
                        },
                        {
                            title: '帮我写一篇跑步文案，重点提炼自律和健康 →'
                        },
                        {
                            title: '帮我写一个高中语文现代文教学策略1000字作文 →'
                        }
                    ]
                },
                {
                    title: '智能编程',
                    child: [
                        {
                            title: '请帮我写一段测试cudaMalloc接口的代码 →'
                        },
                        {
                            title: '如何用Javascript发出HTTP请求?'
                        },
                        {
                            title: '如何学习编程、如何学习新的语言 '
                        }
                    ]
                },
                {
                    title: '工作生活助手',
                    child: [
                        {
                            title: '我是电商运营，请帮我写一份周报 →'
                        },
                        {
                            title: '如何激发创造力？”、“如何写一篇好的演讲稿？→'
                        },
                        {
                            title: '请简短介绍一下无限极企业 →'
                        }
                    ]
                }
            ]
        })

        const sendFeedback = () => {
            if(feed.value.length <= 5) {
                return  Toast({
                    message: '不能少于5个字哦！',
                    position: 'top',
                  });
            }
            store.SendFeedback(feed.value)
            feed.value = ''
        }

        const activeName = ref(0)

        const info = (msg: any) => {
            sessionStorage.setItem('msg', msg)
            Router.push({
                path: '/message',
            })
        }

        const handleEnter = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                // 在这里执行你想要的操作
                info(txt.value)
            }
        };

        const txt = ref('')
        const type = ref(1)
        const local = ref(null)
        // 打开侧边选项
        const PopupTab = () => {
            childRef.value.tabStatus()
        }

        onMounted(() => {
            getCamera()
            store.GetProfile()
            local.value = JSON.parse(localStorage.getItem('user'));
            console.log(local.value)
            setTimeout(() => {
                store.GetWx()
            }, 0)
        })

        const onClickTab = (e) => {
            if(e.name !== type.value) {
                console.log(e)
                store.GetProfile()
                type.value = e.name
            }
        }

         // 调用打开摄像头功能
    const getCamera = () => {
        const media = navigator.mediaDevices;
        console.log(media)
      }

        return () => (
            <div class='home'>
                <Popup ref={childRef} />
                <div class="wrap">
                    {type.value == 1 && <header>
                        <span>剩余消息次数：<span>{store.chatTimes.chat_times}</span></span>
                        <img src={his} onClick={() => { PopupTab() }} alt="" />
                    </header>}
                    {type.value == 1 ?<main>
                        <div class="one">
                        <img src="https://img1.baidu.com/it/u=2917569892,3712639231&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="" />
                        <h4> 国内中文版,全新Ai模型 </h4>
                        <van-collapse vModel={activeName.value} accordion>
                            {
                                list.data.map((item, ind) => {
                                    return <van-collapse-item title={item.title} name={ind}>
                                        {
                                            item.child.map(val => {
                                                return <p onClick={() => { info(val.title) }}>
                                                    {
                                                        val.title
                                                    }
                                                </p>
                                            })
                                        }
                                    </van-collapse-item>
                                })
                            }

                        </van-collapse>
                        <div class="send">
                            <div class="send-msg">
                                <input type="text" onKeyup={handleEnter} vModel={txt.value} placeholder="请输入任意内容" />
                                <img src={pen} onClick={() => { info(txt.value) }} alt="" />
                            </div>
                        </div>
                        </div>
                       
                    </main>
                    :
                    <main>
                        <div class="two">
                            <ul>
                                <li>
                                    <img src={local.value && local.value.avatar} alt="" />
                                    <p> 
                                        <span>{local.value && local.value.username}</span>
                                        <span>剩余消息次数：<span>{store.chatTimes.chat_times}</span></span>
                                   </p>
                                    
                                </li>
                                <li onClick={() => {store.OpenOff()}}>
                                <p>
                                      我的邀请码：{local.value && local.value.referral_code}
                                </p>
                                <span>
                                    每邀请一人可获得10次消息次数！
                                </span>
                                <img src={share} alt="" />
                                </li>
                                <li>
                                    <span>反馈意见</span> 
                                    <textarea name="" id="" vModel={feed.value} placeholder="提供有价值的意见可获得消息次数哦！" cols="30" rows="10" maxlength={100}></textarea>
                                    <div className="but">
                                    <van-button type="primary" onClick={() => { sendFeedback() }} size="small">提交</van-button>
                                    </div>
                                    
                                </li>
                            </ul>
                        </div>
                    </main>
                    }
                    <footer>
                        <van-tabs onClickTab={onClickTab}>
                            <van-tab name={1} title="AI聊天"></van-tab>
                            <van-tab name={2} title="我的"></van-tab>
                        </van-tabs>
                    </footer>
                </div>
            </div>
        )
    },
});
export default Home