import router from '@/router/index'
import { useStore } from '@/store/index.ts'
import { getToken } from '@/api/mixin'
const authorize = () => {
    const baseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10cede6667d6d736&';
    const redirectUrl = 'https://zhibaoai.top/mp'; // 假设这是你的回调URL
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
    // authorize()
    // getToken({ code: '031T1v00017DIS1xqM30017xEb3T1v0V', refererCode:'' }).then(res => {
    //     localStorage.setItem('token', res.token)
    //     localStorage.setItem('user', JSON.stringify(res.user))
    //     var _url = window.location.protocol + '//' + window.location.host + '/'
    //     window.history.pushState({}, 0, _url)
    //     // store.GetChats(code)
    //     return next()
    // })
    return next()
    return
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


// "token": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGliYW9haS50b3AiLCJzdWIiOiIyIiwiYXVkIjpbInpoaWJhb2FpLnRvcCJdLCJleHAiOjE3MjQ2NDU3NDAsIm5iZiI6MTcyNDU1OTM0MCwiaWF0IjoxNzI0NTU5MzQwLCJqdGkiOiJuYWY2R0tnYmhVd05ORXpwUWNFNXZ2In0.Ic0uMGfFL92B1E04qfPfpHFBH4KA-zQXsiQdCIysafMA2OV0eebTCFitA_D_Q6KBFka_SafsMrQjizPpy3tKBQ",
//   "user": {
//     "name": "五五开",
//     "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83ep2ssciag6HMpY8fAQPlPicjlDPdXhS8yibibDq0RcOhAGRdEzOL4CvicIvaHQC8ib3uyKtZdtQPXALKWyQ/132",
//     "chatTimes": 100,
//     "refererID": 0,
//     "refererCode": "VH8CFU"
//   }