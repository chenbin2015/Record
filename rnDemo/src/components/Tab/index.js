import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity, findNodeHandle, UIManager, LayoutAnimation
} from 'react-native'
import Dimensions from 'Dimensions'
import styles from './styles'

 /*
  des: 通用型tab组件
  author: chenbin
 */
export default class Tab extends Component {
  state = {
    lineWidth: 0, // 当前选中的指示横线
    lineLeft: 0, // 横线距左的位置
    currentIndex: this.props.currentIndex, // 当前的tab index
    anima: { // 动画相关
      duration: 300, // 持续时间
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: 'easeOut'
      }
    },
    screenWidth: Dimensions.get('window').width
  }

  // 页面加载时，初始化当前的tab
  componentDidMount() {
    setTimeout(() => {
      this.handleTabPress(this.state.currentIndex)
    }, 100)
  }
  
  // 支持动态去设置选中的tab
  componentWillReceiveProps(nextProps) {
    const { currentIndex } = nextProps
    if(currentIndex != this.state.currentIndex) {
      this.setState({
        currentIndex
      }, () => {
        this.handleTabPress(currentIndex)
      })
    }
  }

  setLine = (index, pageX, width) => {
    const { callback } = this.props
    LayoutAnimation.configureNext(this.state.anima, () => {
        this.setState({
          lineLeft: pageX,
          lineWidth: width
        })
      })
      this.setState({
        lineLeft: pageX,
        lineWidth: width,
        currentIndex: index
      })
      callback && callback(index)
  }
  
  /*
    des: 点击tab之后，计算选中的tab
    @ref: 当前点击的tab
    @callback: 计算完之后的回调，用来设置指示横线的宽度和位置
  */
  getViewSize = (ref, callback) => {
    const handle = findNodeHandle(ref)
    handle && UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      callback && callback(pageX, width)
    })
  }

  /*
    des: 当点击某一个tab时，设置指示横线并且执行回调
    @index: 当前点击的tab的索引
  */
  handleTabPress = (index) => {
    const { callback, isAverage, dataList } = this.props 
    const { screenWidth } = this.state
    if (isAverage) {
      const width = screenWidth / dataList.length
      const pageX = index * width
      this.setLine(index, pageX, width)
    } else {
      this.getViewSize(this.refs['tab' + index], (pageX, width) => {
        this.setLine(index, pageX, width)
      })
    }
  }

  render() {
    const { dataList, index, height, backgroundColor } = this.props
    const { currentIndex } = this.state
    return (
      <View style={[styles.tab, {height: height, backgroundColor}]}>
        <View style={styles.tabList}>
          {
            dataList.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => { this.handleTabPress(index) }} 
                  key={index} 
                  style={styles.itemWrap}
                >
                  <Text ref={`tab${index}`} style={currentIndex == index ? styles.currentTab : styles.item}>{item.text}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View 
          style={[styles.line, {left: this.state.lineLeft, width: this.state.lineWidth, top: height - 2}]} 
        ></View>
      </View>
    )
  }
}

Tab.propTypes = {
  dataList: PropTypes.array, // tab数组
  currentIndex: PropTypes.number, // 当前选中的索引
  callback: PropTypes.func, // 点击之后的回调
  isAverage: PropTypes.bool, // 是否等分
  height: PropTypes.number, // tab的高度
  backgroundColor: PropTypes.string // tab的背景
}

Tab.defaultProps = {
  dataList: [{
    text: '运满满'
  }],
  currentIndex: 1,
  callback: () => {},
  isAverage: true,
  height: 40,
  backgroundColor: '#fff'
}
