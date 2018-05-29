import React, { Component } from 'react'
import { View, Text, Image, Animated } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'
import images from './images'

export default class Toast extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    visible: false,
    scale: new Animated.Value(0)
  }
  timeOutObj = null

  componentWillReceiveProps(nextProps) {
    const { duration } = this.props
    const { visible, onClose } = nextProps
    clearTimeout(this.timeOutObj)
    let op = 0
    if (visible) {
      op = 1
    }
    Animated.parallel(['scale'].map(item => {
      return Animated.spring(this.state[item], {
        toValue: op,
        duration: 300,
        bounciness: 10
      })
    })).start()
    this.setState({
      visible: true
    }, () => {
      this.timeOutObj = setTimeout(() => {
        this.setState({
          visible: false,
          scale: new Animated.Value(0)
        }, onClose)
      }, duration)
    })
  }

  setToastStyle = () => {
    const { icon, position } = this.props
    let toastStyle = [styles.toast]
    if (icon == 'none' && position == 'bottom') {
      toastStyle.push(styles.bottomToast)
    }
    return toastStyle
  }

  setWrapStyle = () => {
    const { icon, position } = this.props
    const { scale } = this.state
    let wrapStyle = [{transform: [{scale: scale}]}]
    switch (icon) {
      case 'none':
        wrapStyle.push(styles.textWrap)
        position == 'bottom' && wrapStyle.push(styles.bottomTextWrap)
        break
      case 'success':
        wrapStyle.push(styles.iconWrap)
        break
      case 'warning':
        wrapStyle.push(styles.iconWrap)
        break
      case 'error':
        wrapStyle.push(styles.iconWrap)
        break
    }
    return wrapStyle
  }

  renderIcon() {
    const { icon } = this.props
    let imgUrl = ''
    switch (icon) {
      case 'none':
        break
      case 'success':
        imgUrl = images.iconSucess
        break
      case 'warning':
        imgUrl = images.iconWarn
        break
      case 'error':
        imgUrl = images.iconError
        break
    }
    if (icon != 'none') {
      return (
        <Image style={styles.icon} source={imgUrl} />
      )
    }
    return null
  }

  render() {
    const { text, duration, position, icon } = this.props
    const { scale, visible } = this.state
    if (visible) {
      return (
        <View style={this.setToastStyle()}>
          <Animated.View style={this.setWrapStyle()}>
            { this.renderIcon() }
            <Text style={styles.text}>{icon == 'none' ? text.substring(0, 14) : text.substring(0, 5)}
            </Text>
          </Animated.View>
        </View>
      )
    }
    return null
  }
}

Toast.propTypes = {
  text: PropTypes.string,
  onClose: PropTypes.func,
  duration: PropTypes.number,
  visible: PropTypes.bool,
  position: PropTypes.string,
  icon: PropTypes.string
}

Toast.defaultProps = {
  text: 'This is a normal message',
  onClose: () => {},
  duration: 2000,
  visible: false,
  position: 'center', // bottom, center
  icon: 'none' // none, success, warning, error
}
