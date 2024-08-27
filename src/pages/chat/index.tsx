import { defineComponent, ref, onMounted, reactive, watch, nextTick } from "vue";
import { ElMessage } from 'element-plus';
import Markdown from 'vue3-markdown-it';
import VueMarked from 'vue-marked';
import 'github-markdown-css/github-markdown.css';
import Had from '@/assets/images/had.png'
import './index.scss'
import tou from '@/assets/images/tou.png'
import token from '@/assets/images/tokennum.png'
import { useStore } from '@/store/index.ts'
import UserIcon from '@/assets/images/UserIcon.png'
import Copy from '@/assets/icon/loading.svg'
import marked from 'marked';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useRouter, useRoute } from 'vue-router';
const Chat = defineComponent({
  props: {},
  setup() {
    // 直接设置 marked 配置
    const md = new MarkdownIt({
      breaks: true, // 自动换行
      highlight: function (str, lang) {
        // 这里你可以添加代码高亮逻辑
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              hljs.highlight(str, { language: lang }).value +
              '</code></pre>';
          } catch (__) { }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    });
    const resultText = ref(''); // 用于保存识别结果
    const isListening = ref(false); // 用于指示是否正在监听
    let recognition;
    const store = useStore()
    const route = useRoute()
    const user = ref(null)
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

    const getChats = () => {
      const chatId = route.query.id
      if (chatId) {
        store.tabId = chatId
        store.ActiveChat(chatId)
      }
    }

    // 初始化语音识别
    onMounted(() => {
      getChats()
      store.GetProfile()
      user.value = JSON.parse(localStorage.getItem('user'))
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
      let a = document.querySelectorAll('#main ul>li')
      let b = a[a.length - 1]
      b && (document.querySelector('#main').scrollTop = b.offsetTop + b.offsetHeight)
    }

    watch(() => store.message, (n) => {
      nextTick(() => {
        store.message && store.message.messages.length && scrollBottoom()
      })
    }, { deep: true, immediate: true })

    const msg = ref('')

    const onSend = (val) => {
      console.log(msg.value)
      store.SenMsg(msg.value || val, '我是智宝AI，可以理解并回答你的问题')
      msg.value = ''
      setTimeout(() => {
        scrollBottoom()
      }, 100)
    }
    return () => (
      <div class='chat'>
        {store.message && store.message.messages.length ?


          <div className="message" id="main">
            <ul class={'ul'}>
              {store.message && store.message.messages.map((val, index) => {
                return val.role === 'user' ? <li key={index} class={val.role}>
                  <div class="wrap">
                    <div class={'info'}>
                      {/* <span> { 'User' } </span> */}
                      <div class="pix"><img src={UserIcon} alt="" /></div>
                    </div>
                    <div class={'mark'} v-html={md.render(val.content)}>

                      {/* <Markdown v-if={val.content} source={val.content} /> */}
                    </div>
                  </div>
                </li> :
                  <li key={index} class={val.role}>
                    <div class="wrap">
                      <div class='info'>
                        <div class="pix"><img src={UserIcon} alt="" /></div>
                        {/* <span>AI Chat</span> */}
                      </div>
                      <div class='mark' v-html={md.render(val.content)}>
                        {/* {index+1 === store.message.messages.length ? (!store.loading ? <Markdown source={val.content} /> : <span class={'think'}>努力思考中... <img src={Loading} alt="" /></span>) : <Markdown source={val.content} /> }
                {!!index && <van-divider />}
                {!!index && !store.loading ? store.netErr ?  <img src={Loading} alt="" onClick={() => {algin}} />  : <img onClick={() => {copy(val.content)}} src={Copy} alt="" />  : '' } */}
                      </div>
                    </div>
                  </li>
              })}
            </ul>
          </div>


          : <div className="hello">
            <h2>
              <img src={Had} alt="" />
              <p>
                {user.value && user.value.name}，你好呀！
              </p>
            </h2>
            <div className="action">
              我是您的私人智能助理 智宝AI ，请问现在能帮您做什么？
              <br />
              如果需要获得专业的助手，可以点击 发现 找寻合适您的助手应用。
            </div>
            <div className="help">
              <h3>助手推荐</h3>
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

              <div className="msg" onClick={() => {onSend('智宝AI 是什么？')}}>
                智宝AI 是什么？
              </div>
              <div className="msg" onClick={() => {onSend('我能用 智宝AI 做什么？')}}>
                我能用 智宝AI 做什么？
              </div>
            </div>
          </div>}

        <div className="send">
          <div className="top">
            {/* <el-icon><Microphone /></el-icon> <el-icon><Picture /></el-icon> */}
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
              class='input_md'
            />
            <div className="send_but" onClick={() => { onSend() }}>
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
