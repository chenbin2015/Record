import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import About from '../components/About'
import AboutCompany from '../components/AboutCompany'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/about/:id?',
    name: 'about',
    component: About,
    children: [{
      path: '/about/company/:id?',
      name: 'about/company',
      component: AboutCompany
    }]
  }]
})
