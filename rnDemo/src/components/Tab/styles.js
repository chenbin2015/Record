import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    height: 30,
    width: '100%',
    marginBottom: 1,
    borderStyle: 'solid',
    borderBottomWidth: .3,
    borderBottomColor: 'rgba(52, 52, 52 ,.5)'
  },
  tabList: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  itemWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentTab: {
    color: '#fa871e'
  },
  line: {
    position: 'absolute',
    top: 29,
    height: 2,
    backgroundColor: '#fa871e'
  }
})