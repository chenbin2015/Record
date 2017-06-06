import { CHANGE_TEXT } from '../actionsType'

export function changeText(text) {
  return dispatch => {
    setTimeout(() => {
      return dispatch({
        type: CHANGE_TEXT,
        payload: '我是客户端返回的值:' + text
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
