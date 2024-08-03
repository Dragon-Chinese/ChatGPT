import { defineComponent, reactive, ref } from "vue";
import { useStore } from '@/store/index';
import './index.scss';
import ChatIcon from '@/assets/svg/chat.svg?component'; 
import SearchIcon from '@/assets/svg/serach.svg?component'; 
import MeIcon from '@/assets/svg/me.svg?component'; 

const Footer_md = defineComponent({
  props: {},
  setup() {
    const store = useStore();
    const avtive = ref('/')
    const footerList = reactive({
      data: [
        {
          name: '会话',
          icon: ChatIcon,
          active: '',
          link: '/'
        },
        {
          name: '发现',
          icon: SearchIcon,
          active: '',
          link: '/search'
        },
        {
          name: '我的',
          icon: MeIcon,
          active: '',
          link: '/me'
        }
      ]
    });

    const JumpLink = (url: string) => {
      avtive.value = url
    }

    return () => (
      <div class="footer-md">
        <ul>
          {
            footerList.data.map(element => (
              <li key={element.name} class={element.link === avtive.value ? 'active' : ''} onClick={() => {JumpLink(element.link)}}>
                {element.icon ? <element.icon /> : null}
                <span>{element.name}</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  },
});

export default Footer_md;
