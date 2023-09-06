// src/i18n/index.ts
import {ref} from 'vue'
import { createI18n } from 'vue-i18n'
import type { App } from 'vue';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale  from 'element-plus/lib/locale/lang/en'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

let EleLocale:unknown = {}

let locale = 'zh-CN'
const lan = navigator.language
if (lan.toLowerCase().indexOf('zh') !== -1) {
  locale = 'zh-cn'
  EleLocale = zhLocale
} else {
  locale = 'en'
  EleLocale = enLocale
}

sessionStorage.setItem('lang', locale)

const i18n = createI18n({
  locale, 
  silentTranslationWarn: true,
  legacy: false,
  fallbackLocale: 'en',
  messages
})

export const setI18n = (app: App) => {
    app.use(i18n);
};

export {i18n , EleLocale}