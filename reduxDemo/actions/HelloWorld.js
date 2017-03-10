import { CHANGE_TEXT } from '../actionsType'

export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    payload: text
  }
}

export function changeTextTest(text) {
  return {
    type: CHANGE_TEXT,
    payload: text
  }
}
