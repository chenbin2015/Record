import {
  StyleSheet,
  PixelRatio
} from 'react-native'

import {
  pxToDp
} from '../../common/utils'

const ratio = 750 / 640
const toPT = px => {
  return px * ratio
}
export default StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 999,
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(52,52,52,0.5)'
  },
  dialog: {
    alignItems: "center",
    width: toPT(270),
    height: 'auto',
    borderRadius: toPT(8),
    backgroundColor: 'white',
    transform: [{scaleX: 0.2}, {scaleY: 0.2}]
  },
  title: {
    marginTop: toPT(24),
    marginBottom: toPT(16),
    fontSize: toPT(16),
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  emptyTitle: {
    marginBottom: toPT(16)
  },
  message: {
    paddingRight: toPT(20),
    paddingLeft: toPT(20),
    marginBottom: toPT(24),
    fontSize: toPT(13),
    color: '#666',
    lineHeight: toPT(20),
    textAlign: 'center'
  },
  // 不设title时，内容居左
  noTitleMessage: {
    textAlign: 'left'
  },
  splitLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(120,120,120,.1)',
    overflow: 'hidden'
  },
  buttonList: {
    height: toPT(44),
    overflow: 'hidden',
    marginTop: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  // 按钮超过两个
  buttonListMore: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
  },
  buttonWrap: {
    flex: 1,
    height: toPT(40),
    backgroundColor: 'transparent'
  },
  buttonWrapMore: {
    height: toPT(40),
    backgroundColor: 'transparent'
  },
  buttonStyle: {
    fontSize: toPT(16),
    lineHeight: toPT(40),
    textAlign: 'center'
  },
  buttonSplitLine: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(100,100,100,.1)'
  }
})