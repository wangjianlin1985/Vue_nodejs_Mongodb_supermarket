import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element.js'
import './assets/global.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 错误页面css
import './assets/css/button.css'
import './assets/css/style.css'

// 全局配置axios
import axios from 'axios'
// axios.defaults.baseURL = 'http://127.0.0.1:3000/api/'
axios.interceptors.request.use(config => {
  NProgress.start()
  const token = window.sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

// 全局配置过滤器，格式化时间
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
