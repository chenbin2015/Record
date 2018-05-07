import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import('../components/HelloWorld')
const About = () => import('../components/About')
const AboutCompany = () => import('../components/AboutCompany')

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
