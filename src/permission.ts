import router from '@/router/index'
import { useStore } from '@/store/index.ts'
router.beforeEach(async (to, from, next) => {
    const store = useStore()
    // 微信环境
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
        // 获取到code情况下
        if(to.query.code) {
            if(true) {
                // 有token
                store.GetChats()
                return next()
            }else {
                // 没有token或者过期的情况下
            }
        } else {
            // store.GetChats()
            // return next()
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10cede6667d6d736&redirect_uri=https%3A%2F%2Fjetbra.top%2F%23%2Fmp%2Fhome/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
    }
    store.GetChats()
    next()
})
