import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import logger from 'redux-logger'

//没有开启服务端，所以使用hash
// import createHistory from 'history/createHashHistory'
import { createBrowserHistory } from 'history'

import { Route } from 'react-router'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux'
import reducers from './reducers'
import Home from './containers/Home'
import About from './containers/About'
import App from './containers/Demo'
const history = createBrowserHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    store: reducers,
    router: routerReducer
  }),
  applyMiddleware(thunk)
)
window.store = store

const rootEl = document.getElementById('root')
const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </ConnectedRouter>
    </Provider>,
    rootEl
  )
render()
