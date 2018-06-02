import React, { Component } from 'react'
import { Modal, Text, View, Button, TouchableOpacity, Animated } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

export default class Alert extends Component {
  state = {
    visible: false,
    dialogWidth: new Animated.Value(0),
    scale: new Animated.Value(0.3)
  }

  componentDidMount() {
    this.setState({
      visible: this.props.visible
    })
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.state
    if (visible != nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      }, this.setAnimate)
    }
  }

  setAnimate = () => {
    const { visible } = this.state
    let op = 0
    if (visible) {
      op = 1
    }
    Animated.parallel(['dialogWidth', 'scale'].map(item => {
      return Animated.spring(this.state[item], {
        toValue: op,
        duration: 300,
        bounciness: 10
      })
    })).start()
  }
  
  handleConfirm = (item = {}) => {
    item.onClick && item.onClick()
    this.setState({
      visible: false
    }, this.setAnimate)
  }

  renderButton() {
    let buttons = []
    const { buttonList, maxButtonTextLength } = this.props
    console.log('buttonList.length:', buttonList.length)
    if (buttonList && buttonList.length > 0) {
      const len = buttonList.length
      buttonList.forEach((item, index) => {
        buttons.push(
          <TouchableOpacity 
            style={len > 2 ? styles.buttonWrapMore : styles.buttonWrap} 
            activeOpacity={0.5} 
            key={`btnTextBox${index}`}
            onPress={() => { this.handleConfirm(item) }}
          >
            <Text numberOfLines={1} style={[styles.buttonStyle, {color: item.color || '#fa871e'}]}>{item.text.substring(0, maxButtonTextLength) || '按钮' + index}</Text>
          </TouchableOpacity>
        )
        if (len <= 2 && index < buttonList.length - 1) {
          buttons.push(<View style={styles.buttonSplitLine} key={`split${index}`}></View>)
        } else if (len > 2) {
          buttons.push(<View style={styles.splitLine} key={`splitTwo${index}`}></View>)
        }
      })
    }
    return buttons
  }

  renderMessage() {
    const { message, title } = this.props
    if (message) {
      return <Text style={[styles.message, title == '' ? styles.noTitleMessage : '']}>{message}</Text>
    }
    return null
  }

  renderTitle() {
    const { title, message } = this.props
    const tempStyle = title ? styles.title : (message ? styles.emptyTitle : styles.title)
    const tempTitle = title || (message ? '' : '友情提醒')
    return <Text numberOfLines={1} style={tempStyle}>{tempTitle}</Text>
  }

  render() {
    const { title, message, buttonList } = this.props
    const { visible, dialogWidth, scale } = this.state
    if (visible) {
      return (
        <Animated.View style={[styles.container, {opacity: dialogWidth}]}>
          <Animated.View style={[styles.dialog, {transform: [{scale: scale}]}]}>
            { this.renderTitle() }
            { this.renderMessage() }
            <View style={styles.splitLine}>
            </View>
            <View style={buttonList.length > 2 ? styles.buttonListMore : styles.buttonList}>
              { this.renderButton() }
            </View>
          </Animated.View>
        </Animated.View>
      )
    }
    return null
  }
}

Alert.propTypes = {
  buttonList: PropTypes.array.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  visible: PropTypes.bool,
  maxTextLength: PropTypes.number
}

Alert.defaultProps = {
  buttonList: [{
    'text': '确定',
    'color': '#fa871e',
    'onClick': () => {

    }
  },
  {
    'text': '取消',
    'color': '#f00',
    'onClick': () => {

    }
  }],
  title: '',
  message: '',
  visible: false,
  maxButtonTextLength: 4
}