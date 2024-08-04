import { defineComponent, ref, onMounted } from "vue";
import { ElMessage } from 'element-plus';
import Markdown from 'vue3-markdown-it';
import 'github-markdown-css/github-markdown.css';

const Chat = defineComponent({
  props: {},
  setup() {
    const resultText = ref(''); // 用于保存识别结果
    const isListening = ref(false); // 用于指示是否正在监听
    let recognition;

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

    return () => (
      <div class='chat'>
        <div>
          <button onClick={startListening} disabled={isListening.value}>开始录音</button>
          <button onClick={stopListening} disabled={!isListening.value}>停止录音</button>
        </div>
        <div class="markdown-body">
            {resultText.value}
          <Markdown>{resultText.value}</Markdown>
        </div>
      </div>
    );
  },
});

export default Chat;
