import router from '@/router/index'
import { useStore } from '@/store/index.ts'
router.beforeEach(async (to, from, next) => {
    const store = useStore()
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx49f38ab81d27df08&redirect_uri=http://192.168.1.187:3000/&response_type=code&scope=SCOPE&state=STATE'
    }
    store.GetChats()
    next()
})
