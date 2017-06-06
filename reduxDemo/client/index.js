import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../reducers'

import configureStore from '../store/configureStore'
import App from '../containers/App'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

const rootEl = document.getElementById('app')
const render = () => ReactDOM.render(
  <Provider store={store}>
  	<App></App>
  </Provider>,
  rootEl
)


render()

