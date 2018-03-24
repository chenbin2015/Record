import { combineReducers } from 'redux'
import helloWorld from './helloWorld'

const todoApp = combineReducers({
  helloChan:helloWorld
})

export default todoApp;