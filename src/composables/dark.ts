import { useDark, useToggle } from "@vueuse/core";
import { watch } from 'vue'
export const isDark = useDark();
export const toggleDark = useToggle(isDark);
// 监听 isDark 变化，动态更新 html 的 data-theme 属性
watch(isDark, (newVal) => {
    document.documentElement.setAttribute('data-theme', newVal ? 'dark' : 'light')
}, { immediate: true })