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
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component:  () => import ('@/pages/mobile/home'),
    meta: { title: '首页', key: '/cms/home' }
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