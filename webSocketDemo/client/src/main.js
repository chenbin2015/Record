import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Index from './index.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [{ path: '/list', component: Index }]
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
