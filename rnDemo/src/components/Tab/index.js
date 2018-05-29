import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity, findNodeHandle, UIManager, LayoutAnimation
} from 'react-native'
import styles from './styles'

export default class Tab extends Component {
  state = {
    lineWidth: 0,
    lineLeft: 0,
    currentIndex: this.props.currentIndex,
    anima: {
      duration: 300, // 持续时间
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: 'easeOut'
      }
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.handleTabPress(this.state.currentIndex)
    }, 100)
  }

  getViewSize = (ref, callback) => {
    const handle = findNodeHandle(ref)
    handle && UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      callback && callback(pageX, width)
    })
  }

  handleTabPress = (index) => {
    const { callback } = this.props 
    this.getViewSize(this.refs['tab' + index], (pageX, width) => {
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
    })
  }

  render() {
    const { dataList, index } = this.props
    const { currentIndex } = this.state
    return (
      <View style={styles.tab}>
        <View style={styles.tabList}>
          {
            dataList.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => { this.handleTabPress(index) }} 
                  key={index} 
                >
                  <Text ref={`tab${index}`} style={currentIndex == index ? styles.currentTab : ''}>{item.text}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View 
          style={[styles.line, {left: this.state.lineLeft, width: this.state.lineWidth}]} 
        ></View>
      </View>
    )
  }
}

Tab.propTypes = {
  dataList: PropTypes.array,
  index: PropTypes.number,
  callback: PropTypes.func
}

Tab.defaultProps = {
  dataList: [{
    text: '运满满'
  }],
  currentIndex: 1,
  callback: () => {}
}
