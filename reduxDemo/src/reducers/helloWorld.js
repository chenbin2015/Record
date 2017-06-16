import { CHANGE_TEXT } from '../actionsType'
export default (state={}, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return Object.assign({}, state, { config:{text:action.payload}  })
    default:
      return state
  }
}
