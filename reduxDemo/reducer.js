export default (state ={text:'hello world'}, action) => {
  switch (action.type) {
    case 'CHANGE_TEXT':
    	console.log(state)
    	state.text=action.payload
      return state
    default:
      return state
  }
}
