import router from '@/router/index'
import { useStore } from '@/store/index.ts'
import { getToken } from '@/api/mixin'
const authorize = () => {
    const baseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10cede6667d6d736&';
    const redirectUrl = 'https://jetbra.top/'; // 假设这是你的回调URL
    const state = '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    // 对redirectUrl进行URL编码
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);

    // 构建完整的授权URL
    const authUrl = `${baseUrl}redirect_uri=${encodedRedirectUrl}${state}`;

    // 在企业微信中打开授权页面
    console.log(authUrl)
    window.location.href = authUrl;
}
// https://jetbra.top?code=ReferralCode
router.beforeEach(async (to, from, next) => {
    const store = useStore()
    console.log(to.query.referral)

    return next()
    if(to.query.referral) {
        localStorage.setItem('referral', to.query.referral)
    }
    // 微信环境
    if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
        // 获取到code情况下
        const href = window.location.href;
        const token = localStorage.getItem('token')
        if (href.includes("?code")) {
            const code = href.split('?code=')[1].split('&state')[0]
            const referer_code = localStorage.getItem('referral') || ''
            // if(token) {
            //     // 有token
            //     store.GetChats()
            //     return next()
            // }else {
            // 没有token或者过期的情况下
            getToken({ code, referer_code }).then(res => {
                localStorage.setItem('token', res.token)
                localStorage.setItem('user', JSON.stringify(res.user))
                var _url = window.location.protocol + '//' + window.location.host + '/'
                window.history.pushState({}, 0, _url)
                // store.GetChats(code)
                location.reload()
                return next()
            })
            // }
        }
        else if (token) {
            store.GetChats()
            return next()
        }
        else {
            // store.GetChats()
            // return next()
            authorize()
            // location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10cede6667d6d736&redirect_uri=https%3A%2F%2Fjetbra.top%2F%23%2Fmp%2Fhome/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
        
    }
    // store.GetChats()
    // next()
})


// eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJqZXRicmEudG9wIiwic3ViIjoiNDUiLCJhdWQiOlsiamV0YnJhLnRvcCJdLCJleHAiOjE3MDE0MTY2NDgsIm5iZiI6MTcwMTMzMDI0OCwiaWF0IjoxNzAxMzMwMjQ4LCJqdGkiOiJqcEZidHc2YWdnc0RMVmNZajljSGRZIn0.vVPEOM3y7UXBERCqK5SVdSNLbHoEoNhAR3nq33lJp1If17BGQnmw9wB8PITXeIK1mqRAZGWDuZp1SfW5-MNtAQ