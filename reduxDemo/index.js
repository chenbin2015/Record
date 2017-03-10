import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

import App from './containers/App'

const store = createStore(reducers)
const rootEl = document.getElementById('root')
const render = () => ReactDOM.render(
  <Provider store={store}>
  	<App></App>
  </Provider>,
  rootEl
)

render()
