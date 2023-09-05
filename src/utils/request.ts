import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API + '/api/v1', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 111115000, // request timeout
})
// request interceptor
service.interceptors.request.use(
  (config: any) => {
    console.log(config)
    // config.url == '/file/uploadFile' && (config.headers['Content-Type'] = 'multipart/form-data')
    // do something before request is sent

    // config.headers['currUser'] = 'zhaojunjie'
    //  中英文
    // config.headers['Accept-Language'] = 'zh-CN'
    
    // config.headers['Access-Control-Allow-Origin'] = '*'
    // config.headers['Access-Control-Allow-Credentials'] = true
    config.headers['Content-Type'] = 'application/json'
    config.headers['X-Requested-With'] =  'XMLHttpRequest'
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // SSO
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log(response)
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    return response.data
    // if (res.code !== 0 && res.code !== 1) {
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 403) {
    //     // to re-login
    //     // store.dispatch('user/resetToken').then(() => {
    //     //   location.reload()
    //     // })
    //   }
    //   ElMessage.error(res.msg || '登录过期')
    //   return Promise.reject(new Error(res.msg || 'Error'))
    // } else {
    //   return response.data
    // }
  },
  error => {
    // error.response.status !== 403 && error.response.data.msg && ElMessage.error(error.response? (error.response.data.msg || error.response.statusText ) : '服务器断开连接，cancel')
    // if (error.response.headers.redirect === 'REDIRECT') {
    //   window.location.href = error.response.headers.contentpath
    // } else {
    //   // alert('error')
    // }
    console.log(error.response.status)
    if(error.response.status === 403) {
      localStorage.removeItem('token')
      location.reload()
    }
    return Promise.reject(error)
  }
)

export default service
