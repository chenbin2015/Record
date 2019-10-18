import Vue from 'vue'
import Vuex from 'vuex'
import meeting from './modules/meeting'

Vue.use(Vuex)
const options = {
  modules: {
    meeting
  }
}
export default new Vuex.Store(options)
