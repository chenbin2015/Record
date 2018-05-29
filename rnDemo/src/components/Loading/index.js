import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Modal,
  Text
} from 'react-native'
import styles from './styles'

export default class Loading extends Component {
  render() {
    const { size, color, visible } = this.props
    console.log('visible:', visible)
    if (visible) {
      return (
        <Modal transparent={true} >
          <View style={styles.loadingView}>
            <ActivityIndicator size={size} color={color} />
          </View>
        </Modal>
      )
    } 
    return null
  }
}

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  visible: PropTypes.bool
}

Loading.defaultProps = {
  size: 'large',
  color: '#f00',
  visible: false
}
