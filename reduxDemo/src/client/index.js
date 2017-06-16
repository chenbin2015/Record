import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, browserHistory } from 'react-router'
import { createBrowserHistory } from 'history'
import reducers from '../reducers'

import configureStore from '../store/configureStore'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

const rootEl = document.getElementById('app')
const render = () => ReactDOM.render(
  <Provider store={store}>
  	<Router   history={browserHistory}>
  	{ routes }
    </Router>
  </Provider>,
  rootEl
)


render()

