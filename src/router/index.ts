//文件router/index.js
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
//CMS
// const Cms = () => import('@/pages/home/home.vue')

// const Demo = () => import('../pages/demo')
/**
 * 创建路由对象
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/market',
    name: 'market',
    component:  () => import ('@/pages/market/index'),
    meta: { title: '发现', key: '/cms/market' }
  },
  {
    path: '/me',
    name: 'me',
    component:  () => import ('@/pages/me/index'),
    meta: { title: '我', key: '/cms/me' }
  },
  {
    path: '/chat',
    name: 'message',
    component:  () => import ('@/pages/chat/index'),
    meta: { title: '聊天列表', key: '/cms/chat' }
  },
  {
    path: '/',
    name: 'home',
    component:  () => import ('@/pages/mobile/home'),
    meta: { title: '消息', key: '/cms/home' }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  }
]

/**
 * 初始化路由 配置
 */

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

/**
 * 导出路由
 */
export default router