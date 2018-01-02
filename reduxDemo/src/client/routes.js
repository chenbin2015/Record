import React from 'react'
import { Router,Route, IndexRoute } from 'react-router'
import About from '../containers/About'
import App from '../containers/App'
import Concact from '../containers/Concact'
import Index from '../containers/Index'
// route 规则：
// - `/list` 显示 `List` 组件
// - `/item/:id` 显示 `Item` 组件
const routes = (
  <Route path="/" component={App} >
  	<Route path="/index" component={Index}/>
    <Route path="a" component={About} />
    <Route path="c" component={Concact} />
  </Route>
);

export default routes;