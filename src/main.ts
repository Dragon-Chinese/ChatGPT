import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App'
import router from './router'
// import sliderBar from '@shareit/it-sliderBar/packages'
import { i18n, EleLocale, setI18n } from './i18n'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElTableNext from 'el-table-next';
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/permission'
import { resolve } from 'path'
import * as func  from '@/utils/utils'
import '@/utils/rem'
import mitt from 'mitt'
import { createPinia } from 'pinia' //引入pinia
import 'highlight.js/styles/monokai.css'

const app = createApp(App)
app.config.globalProperties.$mitt = mitt()
// 处理所有ICON
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$func = func
//i18n 兼容ele
app.use(ElementPlus, {
  locale: EleLocale,
})
app.use(createPinia())
app.use(Vant)
app.use(ElTableNext)
// 设置i18n
setI18n(app)
app.use(router)
// app.component('sliderBar', sliderBar)
app.mount('#app')
