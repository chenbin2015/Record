import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import  reducers from './reducer'
import HelloWorld from './components/helloWorld'

const store = createStore(reducers,{text:'hello world'})
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <HelloWorld></HelloWorld>,
  rootEl
)

render()
