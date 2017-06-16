import { CHANGE_TEXT } from '../actionsType'

export function changeText(text) {
  return dispatch => {
    setTimeout(() => {
      return dispatch({
        type: CHANGE_TEXT,
        payload: 'I come from client side:' + text
      })
    }, 300)
  }
}

export function changeTextTest(text) {
  return {
    type: CHANGE_TEXT,
    payload: text
  }
}
