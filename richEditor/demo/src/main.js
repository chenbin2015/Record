import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueIconFont from 'vue-icon-font'
import vueAudioNative from 'vue-audio-native'
import axios from 'axios'
import List from './List.vue'
import App from './App.vue'
import Form from './Form.vue'
import './plugins/element.js'
import store from './store' // vuex

Vue.use(VueIconFont)
Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.use(vueAudioNative)
Vue.config.productionTip = false
axios.defaults.baseURL = '//192.168.100.81:3000'
axios.interceptors.request.use(request => {
  console.log('请求开始')
  showFullScreenLoading()
  return request
})
axios.interceptors.response.use(response => {
  tryHideFullScreenLoading()
  console.log('请求结束:', response)
  return response
  //特殊错误处理，状态为10时为登录超时
})
let needLoadingRequestCount = 0

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
let loading = null
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

const router = new VueRouter({
  routes: [
    { path: '/list', component: List },
    { path: '/form', component: Form }
  ]
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
