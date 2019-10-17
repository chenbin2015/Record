import Vue from 'vue'
import VueIconFont from 'vue-icon-font'
import App from './App.vue'

Vue.use(VueIconFont)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
