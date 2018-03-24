import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers  } from 'redux'
//没有开启服务端，所以使用hash
import createHistory from 'history/createHashHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import Home from './containers/Home'
import About from './containers/About'
import App from './containers/Demo'
const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
    combineReducers({
        reducers,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)

const rootEl = document.getElementById('root')
const render = () => ReactDOM.render( 
	<Provider store = { store } >
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </div>
    </ConnectedRouter>
    </Provider>,
    rootEl
)
render()