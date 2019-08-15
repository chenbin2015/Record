import Immutable from 'seamless-immutable'
import { CHANGE_TEXT } from '../actionsType'
export default (state = { text: 'default value' }, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return Immutable.setIn(state, ['text'], action.payload)
    default:
      return state
  }
}