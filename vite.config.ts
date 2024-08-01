import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx'
import removeConsole from 'vite-plugin-remove-console';
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    removeConsole(),
    viteCompression({ // gzip静态资源压缩配置
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    vueI18n({
      include: path.resolve(__dirname, './src/language/**')
    })
  ],
  server: {
    host: "192.168.1.70",
    open: true,
    port: 3000,
    hmr: { overlay: false },
    https: false,
    // proxy: { // 配置跨域
    //   '/api': {
    //     target: '', // 服务地址
    //     changeOrigin: true,
    //   }
    // }
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  build : {
    minify : 'terser' ,
    terserOptions : {
        compress : {
            drop_console : true ,
            drop_debugger : true ,
        } ,
    } , 
    rollupOptions: {
      output: {
        // 静态资源打包做处理
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
} ,
})