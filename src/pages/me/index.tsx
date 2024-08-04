import { getCurrentInstance, defineComponent, reactive, onMounted, ref } from "vue";
import { toggleDark, isDark } from '@/composables/index.ts'
import { Search } from '@element-plus/icons-vue'
import people from '@/assets/images/people.png'
import './index.scss'
import tou from '@/assets/images/tou.png'
import share from '@/assets/icon/share.svg'
const Me = defineComponent({
    props: {
    },
    setup(props) {
        // const clickA = () => {
        //     toggleDark(!isDark.value)
        // }
        // const input2 = ref('')
        // onMounted(() => {
        //     console.log(isDark)
        // })
        const textarea = ref('')

        return () => (
            <div class='me'>
                <div class="head">
                    <div class="li">
                        
                        <p>
                            <img src={people} alt="" />
                            <span>卢本伟</span>
                        </p>
                        <span>
                            免费版
                        </span>
                    </div>
                    <div class="li">
                        <div className="span">
                            <p>30</p>
                            <span>剩余消息次数</span>
                            
                        </div>
                        <div className="span">
                             <p>9</p>
                            <span>话题</span>
                        </div>
                        <div className="span">
                            <p>0</p>
                            <span>剩余会员天数</span>
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className="card">
                        <p>
                            我的邀请码：HJLK52
                        </p>
                        <p class="share">
                            点击分享
                             <el-icon><Share /></el-icon>
                        </p>
                        <span>
                            每成功邀请一人可获得10次消息次数！
                        </span>
                        
                </div>
                <div className="card">
                        <p>反馈意见</p>
                        <el-input
                            v-model={textarea.value}
                            maxlength="200"
                            placeholder="提供有价值的意见可获得消息次数哦！"
                            show-word-limit
                            type="textarea"
                            class="textarea_me"
                        />
                        <div className="but">
                        <el-button>提交</el-button>
                        </div>
                </div>
                {/* <li onClick={() => { store.OpenOff() }}>
                        <p>
                            我的邀请码：HJLK52
                        </p>
                        <span>
                            每邀请一人可获得10次消息次数！
                        </span>
                        <img src={share} alt="" />
                    </li>
                    <li>
                        <span>反馈意见</span>
                        <textarea name="" id="" placeholder="提供有价值的意见可获得消息次数哦！" cols="30" rows="10" maxlength={100}></textarea>
                        <div className="but">
                            <van-button type="primary" onClick={() => {  }} size="small">提交</van-button>
                        </div>

                    </li> */}
            </div>
        )
    },
});
export default Me