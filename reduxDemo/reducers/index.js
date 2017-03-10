import { combineReducers } from 'redux'
import helloWorld from './helloWorld'
import student from './student'

const todoApp = combineReducers({
  helloChan:helloWorld,
  student
})

export default todoApp;