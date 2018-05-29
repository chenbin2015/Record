import {
  StyleSheet
} from 'react-native'
export default StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  bottomToast: {
    justifyContent: "flex-end"
  },
  bottomTextWrap: {
    marginBottom: 150
  },
  textWrap: {
    paddingRight: 25,
    paddingLeft: 25,
    height: 36,
    backgroundColor: 'rgba(61,69,77,0.85)',
    borderRadius: 3
  },
  icon: {
    width: 36,
    height: 36,
    marginTop: 12,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  text: {
    color: 'rgba(250, 250, 250, 1)',
    fontSize: 14,
    lineHeight: 34,
    textAlign: 'center'
  },
  iconWrap: {
    width: 90,
    height: 90,
    backgroundColor: 'rgba(61,69,77,0.85)',
    borderRadius: 8
  }
})