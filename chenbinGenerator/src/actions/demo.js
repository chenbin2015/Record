import { CHANGE_TEXT } from '../actionsType'

export function changeText(text) {
	console.log('text:', text)
  return {
    type: CHANGE_TEXT,
    payload: text
  }
}