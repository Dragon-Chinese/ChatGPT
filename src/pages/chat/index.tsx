import { defineComponent, ref, onMounted, reactive } from "vue";
import { ElMessage } from 'element-plus';
import Markdown from 'vue3-markdown-it';
import 'github-markdown-css/github-markdown.css';
import Had from '@/assets/images/had.png'
import './index.scss'
import tou from '@/assets/images/tou.png'
import token from '@/assets/images/tokennum.png'
const Chat = defineComponent({
  props: {},
  setup() {
    const resultText = ref(''); // 用于保存识别结果
    const isListening = ref(false); // 用于指示是否正在监听
    let recognition;
    const data = reactive({
      data: [
        {
            "author": "YBGuoYang",
            "createAt": "2024-07-28",
            "homepage": "https://github.com/YBGuoYang",
            "identifier": "sichuan-university-941-c-programming-assistant",
            "meta": {
                "avatar": "🧙‍♂️",
                "description": "辅助我进行c程序设计的学习",
                "tags": [
                    "941"
                ],
                "title": "c程序学习助手"
            },
            "schemaVersion": 1
        },
        {
            "author": "tayhe",
            "createAt": "2024-07-08",
            "homepage": "https://github.com/tayhe",
            "identifier": "deutsche-b-1",
            "meta": {
                "avatar": "🗣️",
                "description": "为B1级学习者提供流利的德语会话伙伴",
                "tags": [
                    "语言交流",
                    "学习支持",
                    "教育",
                    "德语学习"
                ],
                "title": "B1级德语会话伙伴"
            },
            "schemaVersion": 1
        },
      ]
    })
    // 初始化语音识别
    onMounted(() => {
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
    const input2 = ref('')
    return () => (
      <div class='chat'>
        <div className="hello">
          <h2>
            <img src={Had} alt="" />
            <p>
                中午好
            </p>
          </h2>
          <div className="action">
            我是您的私人智能助理 智宝AI ，请问现在能帮您做什么？
            <br />
            如果需要获得专业的助手，可以点击 发现 找寻合适您的助手应用。
          </div>
          <div className="help">
            <h3>小助手推荐</h3>
            <ol>
                    {
                        data.data.map(item => {
                            return <li>
                              <img src={tou} alt="" />
                              <div className="right">
                                <div class="title">{item.meta.title}</div>
                                <p>{item.meta.description}</p>
                              </div>
                        </li>
                        })
                    }
                    
                </ol>

                <h3>大家都在问</h3>
                
                <div className="msg">
                  智宝AI 是什么？
                </div>
                <div className="msg">
                  我能用 智宝AI 做什么？
                </div>
          </div>
        </div>
        {/* <div className="message">

        </div> */}
        <div className="send">
          <div className="top">
          <el-icon><Microphone /></el-icon> <el-icon><Picture /></el-icon>
          <div className="token">
                  <img src={token} alt="" />
                  <span>30</span>
          </div>
          </div>
          <div className="bot">
                <el-input
                    v-model={input2.value}
                    placeholder=""
                    style="margin-top: -.3rem"
                    class='input_md'
                />
                <div className="send_but">
                  <el-icon><Promotion /></el-icon>
                </div>
          </div>
        </div>
        {/* <div>
          <button onClick={startListening} disabled={isListening.value}>开始录音</button>
          <button onClick={stopListening} disabled={!isListening.value}>停止录音</button>
        </div> */}
        {/* <div class="markdown-body">
            {resultText.value}
          <Markdown>{resultText.value}</Markdown>
        </div> */}

      </div>
    );
  },
});

export default Chat;
