import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    height: 30,
    width: '100%'
  },
  tabList: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  currentTab: {
    color: 'rgb(187, 153, 97)'
  },
  line: {
    position: 'absolute',
    top: 29,
    height: 1,
    backgroundColor: 'rgb(187, 153, 97)'
  }
})