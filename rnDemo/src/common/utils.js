import {Dimensions} from 'react-native'
function fetchData(url, params, callback) {
  
}

function pxToDp(uiElementPx) {
  const deviceWidthDp = Dimensions.get('window').width
  console.log('deviceWidthDp:', deviceWidthDp)
  // UI 默认给图是 640
  const uiWidthPx = 640
  return uiElementPx * deviceWidthDp / uiWidthPx
}
export {
  fetchData,
  pxToDp
}