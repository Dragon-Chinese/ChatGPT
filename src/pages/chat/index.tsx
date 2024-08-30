import { defineComponent, ref, onMounted, reactive, watch, nextTick } from "vue";
import { ElMessage } from 'element-plus';
import MarkdownRenderer from '@/components/MarkdownRenderer.tsx'; // 导入自定义 Markdown 渲染组件
import Had from '@/assets/images/had.png';
import './index.scss';
import tou from '@/assets/images/tou.png';
import token from '@/assets/images/tokennum.png';
import { useStore } from '@/store/index.ts';
import UserIcon from '@/assets/images/UserIcon.png';
import Copy from '@/assets/icon/copy.svg';
import { useRouter, useRoute } from 'vue-router';
import dataAll from '../data.js';
import Loading from '@/assets/svg/loading.svg';
import { showSuccessToast } from 'vant';
import clipboard3 from 'vue-clipboard3'

const Chat = defineComponent({
  setup() {
    const resultText = ref(''); // 用于保存识别结果
    const isListening = ref(false); // 用于指示是否正在监听
    let recognition;
    const store = useStore();
    const route = useRoute();
    const user = ref(null);
    const { toClipboard } = clipboard3()
    const data = reactive({
      data: [
        {
          title: "数学老师",
          description: "我想让你当数学老师。我将提供一些数学方程式或概念，你的工作是用易于理解的术语解释它们。这可能包括提供解决问题的分步说明，演示各种视觉效果技术或建议在线资源以供进一步研究。",
          userPerspective: "我将会当数学老师。我会提供一些数学方程式或概念，并用易于理解的术语解释它们。这可能包括提供解决问题的分步说明，演示各种视觉效果技术或建议在线资源以供进一步研究。"
        },
        {
          title: "AI 辅助医生",
          description: "我想让你扮演一名人工智能辅助医生。我将为您提供患者的详细信息，您的任务是使用最新的人工智能工具，例如医学成像软件和其他机器学习程序，以诊断最可能导致其症状的原因。您还应该将体检、实验室测试等传统方法纳入您的评估过程，以确保准确性。",
          userPerspective: "我将会扮演一名人工智能辅助医生。我会提供患者的详细信息，并使用最新的人工智能工具，例如医学成像软件和其他机器学习程序，以诊断最可能导致其症状的原因。我还会将体检、实验室测试等传统方法纳入评估过程，以确保准确性。"
        }
      ]
    });

    const getChats = () => {
      const chatId = route.query.id;
      if (chatId) {
        store.tabId = chatId;
        store.ActiveChat(chatId);
        store.headTit = route.query.msg;
      } else {
        store.headTit = '新会话';
      }
    };

    // 初始化语音识别
    onMounted(() => {
      getChats();
      store.GetProfile();
      user.value = JSON.parse(localStorage.getItem('user'));
      if (!('webkitSpeechRecognition' in window)) {
        ElMessage.error('你的浏览器不支持 Web Speech API');
        return;
      }

      recognition = new webkitSpeechRecognition();
      recognition.continuous = true; // 持续识别
      recognition.interimResults = true; // 显示临时结果
      recognition.lang = 'zh-CN'; // 设置语言，根据需要修改

      recognition.onstart = () => {
        isListening.value = true;
        console.log('语音识别已启动');
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        resultText.value = `${finalTranscript}  ${interimTranscript} `;
        console.log(resultText.value); // 调试输出识别结果
      };

      recognition.onerror = (event) => {
        switch (event.error) {
          case 'no-speech':
            ElMessage.error('未检测到语音，请重新尝试。');
            break;
          case 'audio-capture':
            ElMessage.error('未检测到麦克风，请确保麦克风已连接并正常工作。');
            break;
          case 'not-allowed':
            ElMessage.error('未获得麦克风权限，请检查浏览器设置。');
            break;
          case 'network':
            ElMessage.error('网络错误，请检查你的网络连接。');
            break;
          default:
            ElMessage.error(`识别错误: ${event.error}`);
        }
        console.error('识别错误:', event.error);
      };

      recognition.onend = () => {
        isListening.value = false;
        console.log('语音识别已停止');
      };
    });

    const startListening = () => {
      recognition.start();
    };

    const stopListening = () => {
      recognition.stop();
    };

    //计算滚到底部
    const scrollBottoom = () => {
      let a = document.querySelectorAll('#main ul>li');
      let b = a[a.length - 1];
      b && (document.querySelector('#main').scrollTop = b.offsetTop + b.offsetHeight);
    };

    watch(() => store.message, (n) => {
      nextTick(() => {
        store.message && store.message.messages.length && scrollBottoom();
      });
    }, { deep: true, immediate: true });

    const msg = ref('');

    const onSend = (val) => {
      console.log(msg.value);
      store.SenMsg(msg.value || val);
      msg.value = '';
      setTimeout(() => {
        scrollBottoom();
      }, 100);
    };

    const systemFil = (val) => {
      let a = '我是智宝AI，可以理解并回答你的问题';
      dataAll.forEach(element => {
        if (element.description === val) {
          a = element.userPerspective;
        }
      });

      return a;
    };

    const systemAct = (val) => {
      store.system = val.description;
      store.message.messages.push({
        content: val.description,
        role: "system"
      });
    };

    const copy = async (val: any) => {
      try {
        await toClipboard(val)
        showSuccessToast({
          message: '复制成功',
          position: 'bottom',
        });
      } catch (err) {
        console.log(err)
        showSuccessToast({
          message: '复制失败',
          position: 'bottom',
        });
      }
    }

    return () => (
      <div class='chat'>
        {store.message && store.message.messages.length ?
          <div className="message" id="main">
            <ul class="ul">
              {store.message && store.message.messages.map((val, index) => {
                return val.role === 'user' ? (
                  <li key={index} class={val.role}>
                    <div class="wrap">
                      <div class="info">
                        <div class="pix"><img src={UserIcon} alt="" /></div>
                      </div>
                      <div class="mark">
                        <MarkdownRenderer content={val.content} />
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={index} class={val.role}>
                    <div class="wrap">
                      <div class="info">
                        <div class="pix"><img src={UserIcon} alt="" /></div>
                      </div>
                      <div class="mark">
                        {store.loading ? '思考中....' : <MarkdownRenderer content={val.role === 'system' ? systemFil(val.content) : val.content} />}
                        {!store.loading && <Copy onClick={() => {copy(val.content)}} />}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          : <div className="hello">
              <h2>
                <img src={Had} alt="" />
                <p>{user.value && user.value.name}，你好呀！</p>
              </h2>
              <div className="action">
                我是您的私人智能助理 智宝AI ，请问现在能帮您做什么？
                <br />
                如果需要获得专业的助手，可以点击 发现 找寻合适您的助手应用。
              </div>
              <div className="help">
                <h3>助手推荐</h3>
                <ol>
                  {data.data.map(item => (
                    <li onClick={() => { systemAct(item); }}>
                      <img src={tou} alt="" />
                      <div class="right">
                        <div class="title">{item.title}</div>
                        <p>{item.userPerspective}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <h3>大家都在问</h3>
                <div className="msg" onClick={() => { onSend('智宝AI 是什么？'); }}>
                  智宝AI 是什么？
                </div>
                <div className="msg" onClick={() => { onSend('我能用 智宝AI 做什么？'); }}>
                  我能用 智宝AI 做什么？
                </div>
              </div>
            </div>
        }
        <div className="send">
          <div className="top">
            <div className="token">
              <img src={token} alt="" />
              <span>剩余次数：{store.chatTimes.chat_times}</span>
            </div>
          </div>
          <div className="bot">
            <el-input
              v-model={msg.value}
              placeholder=""
              style="margin-top: -.3rem"
              class="input_md"
            />
            <div className="send_but" onClick={() => { !store.loading && onSend(); }}>
              <el-icon><Promotion /></el-icon>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default Chat;
