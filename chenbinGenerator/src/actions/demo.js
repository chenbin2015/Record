import { CHANGE_TEXT } from '../actionsType'

export  function changeText(text) {
  return  dispatch => {
      setTimeout(() => {
      dispatch({
        type: CHANGE_TEXT,
        payload: text
      })
    }, 1000)
  }
}