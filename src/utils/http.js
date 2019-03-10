import axios from 'axios'

// import router from '../router'


// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
  // 加载
  if (localStorage.eleToken) {
    config.headers.Authorization = 'Bearer ' + localStorage.eleToken
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截  401 token过期处理
axios.interceptors.response.use(response => {
  return response
}, error => {

  console.log(error.response.data)
  const {
    status
  } = error.response
  if (status === 401) {
    // 清除token
    // localStorage.removeItem('eleToken')

    // 页面跳转
    // router.push('/weixin')
  }

  return Promise.reject(error)
})

export default axios