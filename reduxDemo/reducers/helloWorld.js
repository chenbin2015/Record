import { CHANGE_TEXT } from '../actionsType'
export default (state = { text: 'hello world',name:'default name',config:{name:'张三',sex:'男',text:'我猜猜'} }, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return Object.assign({}, state, { config:{text:action.payload}  })
    default:
      return state
  }
}
