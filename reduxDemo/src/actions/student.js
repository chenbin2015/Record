import { SET_NAME } from '../actionsType/student'

export function setName(name) {
  return {
    type: SET_NAME,
    payload: name
  }
}
